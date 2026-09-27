(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const body = document.body;
  const menu = $('[data-menu]');
  const menuButton = $('[data-menu-button]');
  const navLinks = $$('[data-nav-link]');

  const closeMenu = () => {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    body.classList.remove('is-menu-open');
  };
  const openMenu = () => {
    if (!menu || !menuButton) return;
    menu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    body.classList.add('is-menu-open');
  };
  menuButton?.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  const chapterOutput = $('[data-chapter-number]');
  const chapters = $$('.chapter[data-chapter]');
  if ('IntersectionObserver' in window && chapterOutput) {
    const chapterObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) chapterOutput.textContent = visible.target.dataset.chapter;
    }, { threshold: [0.3, 0.55, 0.75] });
    chapters.forEach(section => chapterObserver.observe(section));
  }

  const dayStage = $('[data-day-stage]');
  const dayTime = $('[data-day-time]');
  const dayTitle = $('[data-day-title]');
  const dayCopy = $('[data-day-copy]');
  $$('[data-day]').forEach(button => {
    button.addEventListener('click', () => {
      $$('[data-day]').forEach(b => b.classList.toggle('is-active', b === button));
      dayStage.dataset.time = button.dataset.day;
      dayTime.textContent = button.dataset.time;
      dayTitle.textContent = button.dataset.title;
      dayCopy.textContent = button.dataset.copy;
    });
  });

  const spaceTitle = $('[data-space-title]');
  const spaceCopy = $('[data-space-copy]');
  $$('[data-space]').forEach(button => {
    button.addEventListener('click', () => {
      $$('[data-space]').forEach(b => b.classList.toggle('is-active', b === button));
      spaceTitle.textContent = button.dataset.space;
      spaceCopy.textContent = button.dataset.spaceCopy;
    });
  });

  const state = { pace: 'slow', nights: '4', room: 'Ocean Studio' };
  const paceLabels = { slow: 'Тише', balanced: 'Баланс', outside: 'Больше наружу' };
  const resultTitle = $('[data-result-title]');
  const resultCopy = $('[data-result-copy]');
  const resultStrip = $('[data-result-strip]');
  const briefPace = $('[data-brief-pace]');
  const briefNights = $('[data-brief-nights]');
  const briefRoom = $('[data-brief-room]');

  function updateComposer() {
    const nights = Number(state.nights);
    const titleMap = {
      slow: `${nights} ${nights === 2 ? 'ночи' : nights === 4 ? 'ночи' : 'ночей'} без спешки`,
      balanced: `${nights} ${nights === 2 ? 'ночи' : nights === 4 ? 'ночи' : 'ночей'} в равновесии`,
      outside: `${nights} ${nights === 2 ? 'ночи' : nights === 4 ? 'ночи' : 'ночей'} ближе к берегу`
    };
    const copyMap = {
      slow: `${state.room} · медленное утро · один маршрут через день · два вечера без программы.`,
      balanced: `${state.room} · спокойное утро · короткий маршрут днём · вечер на террасе или у маяка.`,
      outside: `${state.room} · ранний выход · бухта, тропа и рынок · возвращение к синему часу.`
    };
    resultTitle.textContent = titleMap[state.pace];
    resultCopy.textContent = copyMap[state.pace];
    briefPace.textContent = paceLabels[state.pace];
    briefNights.textContent = `${state.nights} ${state.nights === '7' ? 'ночей' : 'ночи'}`;
    briefRoom.textContent = state.room;
    const bars = Array.from(resultStrip.children);
    bars.forEach((bar, index) => {
      const seed = state.pace === 'slow' ? [0,1,3,6] : state.pace === 'balanced' ? [0,2,4,6] : [0,1,2,4,5,7];
      bar.classList.toggle('is-on', seed.includes(index));
    });
  }

  $$('[data-choice-group]').forEach(group => {
    const key = group.dataset.choiceGroup;
    $$('button', group).forEach(button => {
      button.addEventListener('click', () => {
        $$('button', group).forEach(b => b.classList.toggle('is-active', b === button));
        state[key] = button.dataset.value;
        updateComposer();
      });
    });
  });
  updateComposer();

  const dialog = $('[data-brief-dialog]');
  const openers = $$('[data-open-brief]');
  const closers = $$('[data-close-brief]');
  let lastFocused = null;
  openers.forEach(button => button.addEventListener('click', () => {
    if (!dialog) return;
    lastFocused = button;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }));
  closers.forEach(button => button.addEventListener('click', () => {
    if (!dialog) return;
    dialog.close ? dialog.close() : dialog.removeAttribute('open');
  }));
  dialog?.addEventListener('close', () => lastFocused?.focus());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  $$('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
})();
