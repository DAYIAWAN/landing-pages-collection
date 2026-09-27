(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = $('[data-header]');
  const menuButton = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.hidden = expanded;
      document.body.classList.toggle('menu-open', !expanded);
    });

    $$('a, button', mobileMenu).forEach((item) => {
      item.addEventListener('click', (event) => {
        if (!event.currentTarget.hasAttribute('data-open-dialog')) closeMenu();
      });
    });
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const platformTabs = $$('[data-platform-tab]');
  const platformPanels = $$('[data-platform-panel]');
  platformTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.platformTab;
      platformTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      platformPanels.forEach((panel) => {
        const active = panel.dataset.platformPanel === target;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
    });
  });

  const labData = {
    support: {
      request: 'Клиент сообщает, что не видит закрывающие документы по последнему заказу.',
      steps: [
        'Определить тип обращения',
        'Проверить договор и заказ',
        'Найти документы в хранилище',
        'Подготовить ответ на согласование'
      ],
      result: {
        1: 'Собрать контекст и предложить сотруднику проект ответа.',
        2: 'Передать подготовленный ответ сотруднику для проверки.',
        3: 'Отправить ответ автоматически, если политика и уверенность позволяют.'
      }
    },
    docs: {
      request: 'Нужно подготовить приложение к договору по данным из заявки и карточки клиента.',
      steps: [
        'Извлечь поля из заявки',
        'Сверить данные с CRM',
        'Собрать документ по шаблону',
        'Проверить обязательные поля'
      ],
      result: {
        1: 'Сформировать черновик и список полей, которые требуют внимания.',
        2: 'Подготовить документ и направить ответственному на согласование.',
        3: 'Создать документ и запустить маршрут согласования автоматически.'
      }
    },
    sales: {
      request: 'Новый лид оставил запрос на внедрение и прислал краткое описание инфраструктуры.',
      steps: [
        'Классифицировать запрос',
        'Собрать контекст компании',
        'Сопоставить с ICP',
        'Подготовить персональный follow-up'
      ],
      result: {
        1: 'Подготовить справку по лиду и черновик следующего сообщения.',
        2: 'Создать персональный follow-up и задачу менеджеру на подтверждение.',
        3: 'Обновить CRM и отправить follow-up в рамках разрешённой политики.'
      }
    }
  };

  let activeTask = 'support';
  const autonomy = $('[data-autonomy]');
  const requestNode = $('[data-lab-request]');
  const chainNode = $('[data-lab-chain]');
  const resultNode = $('[data-lab-result]');
  const modeNode = $('[data-lab-mode]');
  const riskNode = $('[data-risk]');

  const renderLab = () => {
    if (!autonomy || !requestNode || !chainNode || !resultNode || !modeNode || !riskNode) return;
    const level = Number(autonomy.value);
    const data = labData[activeTask];
    requestNode.textContent = data.request;
    chainNode.innerHTML = data.steps.map((step, index) => {
      const highlight = index === data.steps.length - 1 ? ' class="is-highlight"' : '';
      const times = ['0.7s', '1.2s', '0.9s', '2.4s'];
      return `<div${highlight}><b>0${index + 1}</b><span>${step}</span><em>${times[index]}</em></div>`;
    }).join('');
    resultNode.textContent = data.result[level];
    modeNode.textContent = level === 1 ? 'assist' : level === 2 ? 'guided' : 'autopilot';
    riskNode.textContent = level === 3 ? 'risk: medium' : 'risk: low';
    riskNode.classList.toggle('risk-badge--medium', level === 3);
  };

  $$('[data-task]').forEach((button) => {
    button.addEventListener('click', () => {
      activeTask = button.dataset.task;
      $$('[data-task]').forEach((item) => item.classList.toggle('is-active', item === button));
      renderLab();
    });
  });
  autonomy?.addEventListener('input', renderLab);
  renderLab();

  const billingButtons = $$('[data-billing]');
  const priceNodes = $$('[data-price]');
  billingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const annual = button.dataset.billing === 'annual';
      billingButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      priceNodes.forEach((node) => {
        const base = Number(node.dataset.price);
        const value = annual ? Math.round(base * 0.8 / 100) * 100 : base;
        node.textContent = `${value.toLocaleString('ru-RU')} ₽`;
      });
    });
  });

  const dialog = $('[data-dialog]');
  const processSelect = $('[data-pilot-process]');
  const controlSelect = $('[data-pilot-control]');
  const preview = $('[data-pilot-preview]');
  let lastFocus = null;

  const processMap = {
    support: ['Получить обращение', 'Собрать клиентский контекст', 'Подготовить решение'],
    docs: ['Получить исходные данные', 'Сверить обязательные поля', 'Собрать документ'],
    reports: ['Собрать показатели', 'Проверить аномалии', 'Сформировать сводку'],
    knowledge: ['Принять вопрос', 'Найти подтверждённые источники', 'Сформировать ответ со ссылками']
  };

  const controlMap = {
    review: 'Передать сотруднику на проверку',
    mixed: 'Выполнить безопасные шаги и запросить подтверждение критического',
    auto: 'Выполнить действие автоматически в рамках разрешённой политики'
  };

  const renderPilot = () => {
    if (!processSelect || !controlSelect || !preview) return;
    const base = processMap[processSelect.value];
    const final = controlMap[controlSelect.value];
    const subtitles = [
      'Фиксируется задача и исходный контекст.',
      'Используются только разрешённые источники.',
      'AI формирует следующий шаг и обоснование.',
      controlSelect.value === 'review' ? 'Действие ждёт подтверждения.' : 'Политика определяет допустимый уровень автономности.'
    ];
    const rows = [...base, final];
    preview.innerHTML = rows.map((title, index) => `<div><span>0${index + 1}</span><p><strong>${title}</strong><small>${subtitles[index]}</small></p></div>`).join('');
  };

  const openDialog = (trigger) => {
    if (!dialog) return;
    lastFocus = trigger || document.activeElement;
    closeMenu();
    renderPilot();
    dialog.showModal();
    document.body.classList.add('dialog-open');
  };

  const closeDialog = () => {
    if (!dialog) return;
    dialog.close();
    document.body.classList.remove('dialog-open');
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  };

  $$('[data-open-dialog]').forEach((button) => button.addEventListener('click', () => openDialog(button)));
  $('[data-close-dialog]')?.addEventListener('click', closeDialog);
  processSelect?.addEventListener('change', renderPilot);
  controlSelect?.addEventListener('change', renderPilot);
  $('[data-regenerate]')?.addEventListener('click', renderPilot);

  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  $$('details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      $$('details').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });
})();
