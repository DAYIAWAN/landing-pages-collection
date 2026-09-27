(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const topbar = $('[data-topbar]');
  const syncTopbar = () => topbar?.classList.toggle('is-scrolled', window.scrollY > 24);
  syncTopbar();
  window.addEventListener('scroll', syncTopbar, { passive: true });

  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const closeMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };
  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });
  $$('#mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const peopleTabs = $$('[data-people]');
  const scripts = $$('[data-script]');
  const props = $$('[data-prop]');
  const setPeopleScene = (key) => {
    peopleTabs.forEach(tab => {
      const active = tab.dataset.people === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    scripts.forEach(script => script.classList.toggle('is-active', script.dataset.script === key));
    props.forEach(prop => prop.classList.toggle('is-active', prop.dataset.prop === key));
  };
  peopleTabs.forEach(tab => tab.addEventListener('click', () => setPeopleScene(tab.dataset.people)));

  const routeNodes = $$('[data-route]');
  routeNodes.forEach(node => node.addEventListener('click', () => {
    routeNodes.forEach(item => item.classList.toggle('is-active', item === node));
  }));

  const dialog = $('[data-program-dialog]');
  const openDialogButtons = $$('[data-open-program]');
  const closeDialogButton = $('[data-close-program]');
  const openDialog = () => {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('dialog-open');
  };
  const closeDialog = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
  };
  openDialogButtons.forEach(button => button.addEventListener('click', openDialog));
  closeDialogButton?.addEventListener('click', closeDialog);
  $$('[data-dialog-link]').forEach(link => link.addEventListener('click', closeDialog));
  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeDialog();
  });
  dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
    if (dialog?.open) closeDialog();
  });

  $$('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });
})();
