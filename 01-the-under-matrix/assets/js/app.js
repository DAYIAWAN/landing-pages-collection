(() => {
  'use strict';

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  const head = $('[data-head]');
  const updateHeader = () => head?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuButton = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');
  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    document.body.style.overflow = '';
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileMenu.hidden = open;
    document.body.style.overflow = open ? '' : 'hidden';
  });
  $$('a', mobileMenu || document).forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  const projectData = {
    distance: {
      index: '01 / 09',
      title: 'Исследования в области дистанционного образования',
      text: 'Исследовательское направление проектного отдела MOTOYAMA, связанное с методиками дистанционного обучения и развитием образовательных форматов.',
      href: 'https://online.motoyama.yoga/',
      link: 'Связанный онлайн-проект ↗'
    },
    it: {
      index: '02 / 09',
      title: 'Исследования в области инфо-технологий',
      text: 'Исследовательское направление MOTOYAMA в области информационных технологий и связанных с ними проектных решений.',
      href: '#projects',
      link: 'Смотреть проектную матрицу ↓'
    },
    perception: {
      index: '03 / 09',
      title: 'Исследования технологий восприятия',
      text: 'Отдельное исследовательское направление проектного отдела, посвящённое технологиям восприятия.',
      href: '#projects',
      link: 'Смотреть проектную матрицу ↓'
    },
    eco: {
      index: '04 / 09',
      title: 'Разработка и проектирование автономных ECO-систем',
      text: 'Прикладное направление MOTOYAMA, связанное с разработкой и проектированием автономных ECO-систем.',
      href: '#projects',
      link: 'Смотреть проектную матрицу ↓'
    },
    artifacts: {
      index: '05 / 09',
      title: 'Охрана культурных артефактов',
      text: 'Культурное проектное направление MOTOYAMA, направленное на сохранение и охрану культурных артефактов.',
      href: '#projects',
      link: 'Смотреть проектную матрицу ↓'
    },
    shop: {
      index: '06 / 09',
      title: 'Интернет-магазин «МОТОЯМА»',
      text: 'Специализированный гипермаркет: Йога, Аюрведа, единоборства, издательство, мастерская, товары для выживания и другие направления.',
      href: 'https://motoyama.shop/',
      link: 'Открыть MOTOYAMA.SHOP ↗'
    },
    integral: {
      index: '07 / 09',
      title: 'Интегральные направления различной конфессиональной принадлежности',
      text: 'Образовательные программы по интегральным направлениям: Буддизм, Гностицизм, Даосизм, Индуизм, Нагуализм, Суфизм, Славянство.',
      href: 'https://online.motoyama.yoga/',
      link: 'Открыть онлайн-программы ↗'
    },
    martial: {
      index: '08 / 09',
      title: 'Боевые искусства — направления различны',
      text: 'Практическое и образовательное направление MOTOYAMA, включающее различные школы и стили единоборств.',
      href: '#martial-index',
      link: 'Открыть полный индекс ↓'
    },
    yoga: {
      index: '09 / 09',
      title: 'Йога — курсы, семинары, тренинги преподавателей разных направлений',
      text: 'Главное практическое направление экосистемы MOTOYAMA: занятия, материалы, архив и образовательные программы.',
      href: 'https://motoyama.yoga/',
      link: 'Открыть MOTOYAMA.YOGA ↗'
    }
  };

  const inspector = $('[data-project-inspector]');
  $$('[data-project]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.project;
      const data = projectData[key];
      if (!data || !inspector) return;
      $$('[data-project]').forEach((item) => item.classList.toggle('is-active', item === button));
      $('.inspector-index', inspector).textContent = data.index;
      $('h3', inspector).textContent = data.title;
      const body = $$('p', inspector).find((item) => !item.classList.contains('inspector-label'));
      if (body) body.textContent = data.text;
      const link = $('a', inspector);
      link.href = data.href;
      link.textContent = data.link;
      if (data.href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener';
      } else {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
    });
  });

  const storeTabs = $$('[data-store-tab]');
  const storePanels = $$('[data-store-panel]');
  storeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.storeTab;
      storeTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      storePanels.forEach((panel) => {
        const active = panel.dataset.storePanel === key;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    });
  });

  const martialSearch = $('[data-martial-search]');
  const letterButtons = $$('[data-letter]');
  const martialGroups = $$('[data-letter-group]');
  const noResults = $('[data-no-results]');
  let activeLetter = 'all';

  const normalize = (value) => value.toLocaleLowerCase('ru-RU').replace(/ё/g, 'е').trim();
  const filterMartial = () => {
    const query = normalize(martialSearch?.value || '');
    let matches = 0;
    martialGroups.forEach((group) => {
      const letterMatch = activeLetter === 'all' || group.dataset.letterGroup === activeLetter;
      const rows = $$('p', group);
      let visibleRows = 0;
      rows.forEach((row) => {
        const searchMatch = !query || normalize(row.textContent).includes(query);
        row.hidden = !searchMatch;
        if (searchMatch) visibleRows += 1;
      });
      const groupVisible = letterMatch && visibleRows > 0;
      group.hidden = !groupVisible;
      if (groupVisible) matches += visibleRows;
    });
    if (noResults) noResults.hidden = matches !== 0;
  };
  martialSearch?.addEventListener('input', filterMartial);
  letterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeLetter = button.dataset.letter || 'all';
      letterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      filterMartial();
    });
  });

  const sectionTargets = ['top', 'navigator', 'store', 'online', 'projects', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const railDots = $$('.rail-dot');
  if ('IntersectionObserver' in window && railDots.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = sectionTargets.indexOf(visible.target);
      railDots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    }, { threshold: [0.15, 0.35, 0.6] });
    sectionTargets.forEach((section) => sectionObserver.observe(section));
  }

  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
