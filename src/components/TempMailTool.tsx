import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    copyEmail?: () => Promise<void>;
    generateNewEmail?: (force?: boolean) => Promise<void>;
    fullReset?: () => void;
    refreshInbox?: (manual?: boolean) => Promise<void>;
    openMessage?: (id: string) => Promise<void>;
    openMessageFromEl?: (el: HTMLElement) => void;
    closeModal?: () => void;
    restoreEmail?: (email: string) => void;
    deleteHistory?: (email: string) => void;
    clearHistory?: () => void;
    currentEmail?: string;
  }
}

export const TempMailTool: React.FC = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const API = 'https://mail123.fr/api/v1';
    const CIRCUMFERENCE = 389.6;
    const LIFETIME = 5 * 60 * 1000;
    const POLL_MS = 5000;

    const memoryStore: Record<string, string> = {};
    let storageAvailable = false;
    (function () {
      try {
        const k = '__t__';
        localStorage.setItem(k, '1');
        localStorage.removeItem(k);
        storageAvailable = true;
      } catch (e) {
        storageAvailable = false;
      }
    })();

    function storeGet(key: string): string | null {
      if (storageAvailable) {
        try {
          return localStorage.getItem(key);
        } catch (e) {}
      }
      return memoryStore[key] ?? null;
    }
    function storeSet(key: string, value: string | number): void {
      if (storageAvailable) {
        try {
          localStorage.setItem(key, String(value));
          return;
        } catch (e) {}
      }
      memoryStore[key] = String(value);
    }
    function storeClear(): void {
      if (storageAvailable) {
        try {
          localStorage.clear();
        } catch (e) {}
      }
      for (const k in memoryStore) delete memoryStore[k];
    }

    let currentEmail = '';
    let timerId: any = null;
    let pollId: any = null;
    let expireAt = 0;
    let creating = false;

    const $ = (id: string) => document.getElementById(id);
    const esc = (s: any) =>
      String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    function setStatus(msg: string, isError = false) {
      const el = $('statusMsg');
      if (!el) return;
      el.textContent = msg || '';
      el.className = 'status' + (isError ? ' error' : '');
    }

    function saveState(email: string) {
      currentEmail = email;
      window.currentEmail = email;
      storeSet('sm_email', email);
      const emailInput = $('emailAddr') as HTMLInputElement | null;
      if (emailInput) emailInput.value = email;

      let hist = getHistory().filter((x: any) => x.email !== email);
      hist.unshift({
        email,
        time: new Date().toLocaleString('ar-EG', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      storeSet('sm_h', JSON.stringify(hist.slice(0, 20)));
      renderHistory();
    }

    function getHistory(): any[] {
      try {
        const raw = storeGet('sm_h');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }

    async function createMailbox(retries = 3): Promise<string> {
      for (let i = 1; i <= retries; i++) {
        try {
          const res = await fetch(`${API}/mailbox/new`, {
            method: 'GET',
            headers: { Accept: 'application/json' },
          });
          if (res.status === 429) {
            await new Promise((r) => setTimeout(r, 1500 * i));
            continue;
          }
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const data = await res.json();
          if (!data.success || !data.address) throw new Error('invalid response');
          return data.address;
        } catch (err) {
          if (i >= retries) throw err;
          await new Promise((r) => setTimeout(r, 1000 * i));
        }
      }
      throw new Error('max_retries');
    }

    async function generateNewEmail(force = false) {
      if (creating) return;
      if (!force && currentEmail && expireAt > Date.now()) return;

      creating = true;
      setStatus('جاري إنشاء عنوان جديد...');
      const emailInput = $('emailAddr') as HTMLInputElement | null;
      const copyBtn = $('copyBtn') as HTMLButtonElement | null;
      if (emailInput) emailInput.value = 'جاري التوليد...';
      if (copyBtn) copyBtn.disabled = true;

      try {
        const address = await createMailbox(3);
        saveState(address);
        expireAt = Date.now() + LIFETIME;
        storeSet('sm_e', String(expireAt));
        startTimer();
        renderEmpty();
        refreshInbox(true);
        setStatus('جاهز للاستخدام');
      } catch (err) {
        console.error(err);
        setStatus('تعذر الاتصال — إعادة المحاولة...', true);
        if (emailInput) emailInput.value = 'فشل التوليد';
        setTimeout(() => {
          creating = false;
          generateNewEmail(true);
        }, 3000);
        return;
      } finally {
        creating = false;
        if (copyBtn) copyBtn.disabled = false;
      }
    }

    function startTimer() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }

      function tick() {
        const remaining = Math.max(0, Math.round((expireAt - Date.now()) / 1000));
        const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
        const secs = String(remaining % 60).padStart(2, '0');
        const digitsEl = $('timerDigits');
        const arcEl = $('timerArc');
        if (digitsEl) digitsEl.textContent = `${mins}:${secs}`;
        if (arcEl) arcEl.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - remaining / 300));

        if (remaining <= 0) {
          clearInterval(timerId);
          timerId = null;
          generateNewEmail(true);
        }
      }
      tick();
      timerId = setInterval(tick, 1000);
    }

    async function refreshInbox(manual = false) {
      if (!currentEmail) return;
      const icon = $('refreshIcon');
      if (manual && icon) icon.classList.add('fa-spin');

      try {
        const res = await fetch(`${API}/mailbox/${encodeURIComponent(currentEmail)}/messages`, {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const messages = data.messages || [];

        if (messages.length === 0) renderEmpty();
        else renderMessages(messages);

        if (manual) setStatus(`تم التحديث • ${messages.length} رسالة`);
      } catch (err) {
        if (manual) setStatus('تعذر التحديث', true);
      } finally {
        if (icon) {
          setTimeout(() => icon.classList.remove('fa-spin'), 500);
        }
      }
    }

    function renderMessages(list: any[]) {
      const badge = $('msgCount');
      if (badge) {
        badge.textContent = String(list.length);
        badge.classList.add('show');
      }

      const emailsEl = $('emails');
      if (!emailsEl) return;

      emailsEl.innerHTML = list
        .map((m) => {
          const fromRaw = m.from || 'Unknown';
          const fromName = fromRaw.replace(/<[^>]+>/, '').trim() || fromRaw;
          const initial = (fromName[0] || '?').toUpperCase();
          let time = '';
          try {
            time = m.date ? new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          } catch (e) {}
          const otpHint = m.otp_code ? ` 🔐 ${m.otp_code}` : '';
          return `
          <div class="mail-row" data-msgid="${esc(m.id)}" onclick="window.openMessageFromEl(this)">
              <div class="avatar">${esc(initial)}</div>
              <div class="mail-info">
                  <div class="mail-top">
                      <span class="mail-time">${esc(time)}</span>
                      <span class="mail-from">${esc(fromName)}</span>
                  </div>
                  <div class="mail-subject">${esc(m.subject || '(بدون موضوع)')}${otpHint}</div>
              </div>
          </div>`;
        })
        .join('');
    }

    function openMessageFromEl(el: HTMLElement) {
      const id = el.getAttribute('data-msgid');
      if (id) openMessage(id);
    }

    function renderEmpty() {
      const emailsEl = $('emails');
      if (emailsEl) {
        emailsEl.innerHTML = `
          <div class="empty">
              <i class="fas fa-satellite-dish"></i>
              <p>في انتظار الرسائل</p>
          </div>`;
      }
      const badge = $('msgCount');
      if (badge) badge.classList.remove('show');
    }

    async function openMessage(id: string) {
      if (!currentEmail || !id) {
        alert('لا توجد رسالة محددة');
        return;
      }

      try {
        const url = `${API}/mailbox/${encodeURIComponent(currentEmail)}/messages/${encodeURIComponent(id)}`;
        const res = await fetch(url, { headers: { Accept: 'application/json' } });

        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }

        const data = await res.json();
        const msg = data.message || data;

        const modalFrom = $('modalFrom');
        const modalSub = $('modalSubject');
        const modalBody = $('modalBody');
        const modal = $('modal');

        if (modalFrom) modalFrom.textContent = 'من: ' + (msg.from || '—');
        if (modalSub) modalSub.textContent = msg.subject || '(بدون موضوع)';

        const parts: string[] = [];

        if (msg.otp_code) {
          parts.push(`<div class="otp-badge">رمز التحقق: ${esc(msg.otp_code)}</div>`);
        }

        if (msg.html && String(msg.html).trim()) {
          parts.push('<iframe id="mailFrame" sandbox="allow-same-origin" title="محتوى الرسالة"></iframe>');
          if (modalBody) modalBody.innerHTML = parts.join('');

          const frame = document.getElementById('mailFrame') as HTMLIFrameElement | null;
          const cleaned = String(msg.html)
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/\son\w+\s*=\s*(['"])[\s\S]*?\1/gi, '');

          try {
            if (frame) {
              const doc = frame.contentDocument || frame.contentWindow?.document;
              if (doc) {
                doc.open();
                doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <base target="_blank" rel="noopener">
                    <style>
                        html,body{margin:0;padding:12px;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#334155;background:#fff;word-break:break-word;line-height:1.5}
                        img,table{max-width:100%!important;height:auto!important}
                        a{color:#2563eb}
                    </style>
                </head><body></body></html>`);
                doc.close();
                doc.body.innerHTML = cleaned;

                setTimeout(() => {
                  try {
                    const h = Math.min(Math.max((doc.body.scrollHeight || 280) + 16, 200), 480);
                    frame.style.height = h + 'px';
                  } catch (e) {}
                }, 120);
              }
            }
          } catch (iframeErr) {
            console.warn('iframe write failed', iframeErr);
            if (modalBody) {
              modalBody.innerHTML =
                parts.slice(0, -1).join('') +
                `<div style="white-space:pre-wrap;text-align:right">${esc(msg.text || stripHtml(msg.html) || 'لا يوجد محتوى نصي')}</div>`;
            }
          }
        } else if (msg.text && String(msg.text).trim()) {
          parts.push(`<pre style="white-space:pre-wrap;font-family:inherit;margin:0;text-align:right">${esc(msg.text)}</pre>`);
          if (modalBody) modalBody.innerHTML = parts.join('');
        } else {
          parts.push('<p style="text-align:center;color:#94a3b8">لا يوجد محتوى للعرض</p>');
          if (modalBody) modalBody.innerHTML = parts.join('');
        }

        if (modal) modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      } catch (e) {
        console.error('openMessage error:', e);
        alert('تعذر تحميل الرسالة. حاول مرة أخرى.');
      }
    }

    function stripHtml(html: string) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return tmp.textContent || tmp.innerText || '';
    }

    function closeModal() {
      const modal = $('modal');
      const modalBody = $('modalBody');
      if (modal) modal.classList.remove('open');
      if (modalBody) modalBody.innerHTML = '';
      document.body.style.overflow = '';
    }

    const modalEl = document.getElementById('modal');
    if (modalEl) {
      modalEl.addEventListener('click', function (e) {
        if (e.target === this) closeModal();
      });
    }

    function renderHistory() {
      const hist = getHistory();
      const clearBtn = $('clearBtn');
      if (clearBtn) clearBtn.classList.toggle('show', hist.length > 0);

      const historyList = $('historyList');
      if (!historyList) return;

      historyList.innerHTML = hist
        .map((item) => {
          const isActive = item.email === currentEmail;
          return `
          <div class="history-item ${isActive ? 'active' : ''}">
              <div class="history-actions">
                  ${
                    isActive
                      ? '<span class="active-label">نشط</span>'
                      : `<button class="btn-restore" onclick="window.restoreEmail('${esc(item.email)}')">استعادة</button>`
                  }
                  <button class="btn-del" onclick="window.deleteHistory('${esc(item.email)}')"><i class="fas fa-trash-alt"></i></button>
              </div>
              <div class="info">
                  <div class="email">${esc(item.email)}</div>
                  <div class="time"><i class="far fa-clock"></i> ${esc(item.time)}</div>
              </div>
          </div>`;
        })
        .join('');
    }

    function deleteHistory(email: string) {
      const hist = getHistory().filter((x) => x.email !== email);
      storeSet('sm_h', JSON.stringify(hist));
      renderHistory();
    }

    function restoreEmail(email: string) {
      currentEmail = email;
      window.currentEmail = email;
      storeSet('sm_email', email);
      const emailInput = $('emailAddr') as HTMLInputElement | null;
      if (emailInput) emailInput.value = email;
      expireAt = Date.now() + LIFETIME;
      storeSet('sm_e', String(expireAt));
      startTimer();
      renderEmpty();
      refreshInbox(true);
      renderHistory();
      setStatus('تم استعادة العنوان');
    }

    function clearHistory() {
      if (confirm('مسح سجل الاستعادة؟')) {
        storeSet('sm_h', '[]');
        renderHistory();
      }
    }

    async function copyEmail() {
      const emailInput = $('emailAddr') as HTMLInputElement | null;
      const email = emailInput ? emailInput.value : '';
      if (!email || email.includes('جاري') || email.includes('فشل')) return;

      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      const btn = $('copyBtn');
      const text = $('copyText');
      if (text) text.textContent = 'تم النسخ!';
      if (btn) btn.classList.add('copied');
      setTimeout(() => {
        if (text) text.textContent = 'نسخ العنوان';
        if (btn) btn.classList.remove('copied');
      }, 2000);
    }

    function fullReset() {
      if (confirm('إعادة ضبط كاملة؟ سيتم حذف كل شيء.')) {
        storeClear();
        location.reload();
      }
    }

    // Attach to global window
    window.copyEmail = copyEmail;
    window.generateNewEmail = generateNewEmail;
    window.fullReset = fullReset;
    window.refreshInbox = refreshInbox;
    window.openMessage = openMessage;
    window.openMessageFromEl = openMessageFromEl;
    window.closeModal = closeModal;
    window.restoreEmail = restoreEmail;
    window.deleteHistory = deleteHistory;
    window.clearHistory = clearHistory;

    // Boot tool
    const savedEmail = storeGet('sm_email');
    const savedExpire = parseInt(storeGet('sm_e') || '0', 10);

    if (savedEmail && savedExpire > Date.now()) {
      currentEmail = savedEmail;
      window.currentEmail = currentEmail;
      expireAt = savedExpire;
      const emailInput = $('emailAddr') as HTMLInputElement | null;
      if (emailInput) emailInput.value = currentEmail;
      startTimer();
      renderHistory();
      refreshInbox(true);
      setStatus('تم استعادة الجلسة');
    } else {
      generateNewEmail(true);
    }

    pollId = setInterval(() => refreshInbox(false), POLL_MS);

    return () => {
      if (timerId) clearInterval(timerId);
      if (pollId) clearInterval(pollId);
    };
  }, []);

  return (
    <div className="w-full">
      {/* ── Outer Tool Card Framing / Container ── */}
      <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-700/40 bg-slate-900/60 backdrop-blur-md">
        {/* Top Status Bar Decoration */}
        <div className="bg-slate-950/80 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-300">خادم البريد المؤقت متصل وجاهز</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-900/50 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-700/50 font-mono text-[11px]">
              API v1 Active
            </span>
            <span className="hidden sm:inline-block text-slate-500">تشفير 256-bit SSL</span>
          </div>
        </div>

        {/* ── The Tool Markup (EXACT IDs & CLASSES PRESERVED) ── */}
        <div id="temp-mail-tool-root" className="w-full">
          <header className="hero">
            <h1>
              Shadow <span>Mail</span>
            </h1>
            <p>Instant &amp; Private Inbox</p>

            <div className="card">
              <div className="timer-wrap">
                <svg viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="62" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                  <circle
                    id="timerArc"
                    cx="70"
                    cy="70"
                    r="62"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="389.6"
                    strokeDashoffset="0"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div id="timerDigits">05:00</div>
              </div>

              <div className="email-box">
                <input type="text" id="emailAddr" readOnly defaultValue="جاري التوليد..." />
              </div>

              <button className="btn btn-copy" id="copyBtn" onClick={() => window.copyEmail?.()}>
                <i className="fas fa-copy"></i>
                <span id="copyText">نسخ العنوان</span>
              </button>

              <div className="btn-row">
                <button className="btn btn-secondary" onClick={() => window.generateNewEmail?.(true)}>
                  <i className="fas fa-plus"></i> جديد
                </button>
                <button className="btn btn-danger" onClick={() => window.fullReset?.()}>
                  <i className="fas fa-trash-alt"></i> إعادة
                </button>
              </div>

              <p className="status" id="statusMsg"></p>
            </div>
          </header>

          <div className="tool-main-container">
            <div className="guide">
              <h3>
                <i className="fas fa-lightbulb"></i> دليل سريع
              </h3>
              <p>
                1. انسخ العنوان أعلاه واستخدمه في أي موقع.
                <br />
                2. الرسائل تظهر تلقائياً أدناه كل بضع ثوانٍ.
                <br />
                3. العنوان يتجدد كل 5 دقائق لحماية خصوصيتك.
              </p>
            </div>

            <section className="section">
              <div className="section-header">
                <h2>
                  <i className="fas fa-inbox blue"></i> صندوق الوارد
                  <span className="badge" id="msgCount">
                    0
                  </span>
                </h2>
                <button className="btn-refresh" onClick={() => window.refreshInbox?.(true)}>
                  <i className="fas fa-rotate-right" id="refreshIcon"></i> تحديث
                </button>
              </div>
              <div className="inbox" id="emails">
                <div className="empty">
                  <i className="fas fa-satellite-dish"></i>
                  <p>في انتظار الرسائل</p>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <h2>
                  <i className="fas fa-clock-rotate-left purple"></i> سجل الاستعادة
                </h2>
                <button className="btn-clear" id="clearBtn" onClick={() => window.clearHistory?.()}>
                  مسح الكل
                </button>
              </div>
              <div id="historyList"></div>
            </section>
          </div>
        </div>

        {/* Modal Window for message viewing */}
        <div id="modal">
          <div className="modal-box">
            <div className="modal-head">
              <div className="left">
                <div className="modal-subject" id="modalSubject">
                  الموضوع
                </div>
                <div className="modal-from" id="modalFrom"></div>
              </div>
              <button className="modal-close" onClick={() => window.closeModal?.()}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body" id="modalBody"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
