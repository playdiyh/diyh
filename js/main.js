import { getBurnerWallet, getBurnerAddress } from './wallet.js';
import { initBurnerWalletUi, syncBurnerWalletHeader } from './wallet-ui.js';
import { initMusicPlayerFromDom } from './game/music.js';
import { initOnlinePresence, setOnlineBadgeElement } from './presence.js';
import { initClientNavigation, updateNavActive } from './navigation.js';
import { normalizePath } from './routes.js';
import { abbreviateAddress } from './token-config.js';

initMusicPlayerFromDom();
initBurnerWalletUi();

const wallet = getBurnerWallet();
const address = getBurnerAddress();

initOnlinePresence({
  walletAddress: address,
  page: document.getElementById('onlineNow') ? 'landing' : 'site',
  badgeEl: document.getElementById('onlineNow'),
});

let landingHandlersBound = false;

function bindLandingHandlersOnce() {
  if (landingHandlersBound) return;
  landingHandlersBound = true;

  document.addEventListener('click', async (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const copyCaBtn = target.closest('#copyCa');
    if (copyCaBtn) {
      const contractAddressEl = document.getElementById('contractAddress');
      if (!contractAddressEl) return;

      const copyLabel = copyCaBtn.querySelector('.token-ca-copy-label');
      await navigator.clipboard.writeText(contractAddressEl.textContent.trim());
      copyCaBtn.classList.add('copied');
      if (copyLabel) copyLabel.textContent = 'Copied!';
      setTimeout(() => {
        copyCaBtn.classList.remove('copied');
        if (copyLabel) copyLabel.textContent = 'Copy CA';
      }, 1500);
      return;
    }

    const allocBtn = target.closest('.alloc-wallet-copy');
    if (allocBtn) {
      const full = allocBtn.dataset.copyAddress?.trim();
      if (!full) return;

      const label = allocBtn.querySelector('.alloc-wallet-copy-label');
      const addrEl = allocBtn.closest('.alloc-wallet')?.querySelector('.alloc-wallet-addr');
      const display = addrEl?.getAttribute('title')?.trim()
        ? abbreviateAddress(addrEl.getAttribute('title').trim())
        : abbreviateAddress(full);

      await navigator.clipboard.writeText(full);
      allocBtn.classList.add('copied');
      if (label) label.textContent = 'Copied!';
      if (addrEl) addrEl.textContent = 'Copied!';

      setTimeout(() => {
        allocBtn.classList.remove('copied');
        if (label) label.textContent = 'Copy';
        if (addrEl) addrEl.textContent = display;
      }, 1500);
      return;
    }

    const mobileMenuBtn = target.closest('#mobileMenuBtn');
    if (mobileMenuBtn) {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      const isOpen = nav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('is-open', isOpen);
      return;
    }

    const navLink = target.closest('.nav a');
    if (navLink) {
      const nav = document.querySelector('.nav');
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      nav?.classList.remove('open');
      mobileMenuBtn?.classList.remove('is-open');
    }
  });

  document.addEventListener(
    'toggle',
    (event) => {
      const entry = event.target;
      if (!(entry instanceof HTMLDetailsElement) || !entry.classList.contains('faq-entry') || !entry.open) {
        return;
      }

      document.querySelectorAll('.faq-entry').forEach((other) => {
        if (other !== entry) other.open = false;
      });
    },
    true,
  );
}

function initPageContent() {
  const path = normalizePath(window.location.pathname);

  updateNavActive(path);
  setOnlineBadgeElement(document.getElementById('onlineNow'));
  syncBurnerWalletHeader();
}

bindLandingHandlersOnce();

initClientNavigation({
  onPageSwap: initPageContent,
});

function initGridParallax() {
  const grid = document.querySelector('.bg-grid');
  if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 16;
    targetY = (e.clientY / window.innerHeight - 0.5) * 16;
  });

  function tick() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    grid.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(tick);
  }

  tick();
}

initPageContent();
initGridParallax();

export { wallet, address };
