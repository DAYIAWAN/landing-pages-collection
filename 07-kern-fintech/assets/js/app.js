(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const menuToggle = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Открыть меню');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
      mobileMenu.hidden = isOpen;
      document.body.classList.toggle('menu-open', !isOpen);
    });

    $$('a', mobileMenu).forEach((link) => link.addEventListener('click', closeMenu));
  }

  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const modes = {
    payments: {
      kicker: 'PAYMENTS DESK',
      title: 'Платёж как управляемый процесс, а не отдельная кнопка.',
      text: 'Создание, policy-check, согласование, исполнение и сверка складываются в один маршрут с понятным статусом.',
      list: ['Единая очередь операций', 'Политики до исполнения', 'Контекст решения внутри платежа'],
      visual: `
        <div class="payment-sheet">
          <div class="sheet-head"><span>PAYMENT #0428</span><b>₽ 684 000</b></div>
          <div class="sheet-row"><span>Получатель</span><b>Nordic Components</b></div>
          <div class="sheet-row"><span>Политика</span><b class="blue-text">CFO approval</b></div>
          <div class="sheet-row"><span>Статус</span><b>2 / 3 согласований</b></div>
          <div class="sheet-track"><i style="--w:66%"></i></div>
          <div class="sheet-foot"><span>Finance ✓</span><span>CFO · review</span><span>Ops · queued</span></div>
        </div>`
    },
    treasury: {
      kicker: 'TREASURY ROOM',
      title: 'Ликвидность видна по структуре, а не по списку счетов.',
      text: 'Сводите operating, reserve и settlement-позиции в одну картину, чтобы видеть концентрацию денег и контекст движения.',
      list: ['Консолидированный cash-view', 'Разделение доступных и резервных средств', 'Фокус на движении между сущностями'],
      visual: `
        <div class="payment-sheet">
          <div class="sheet-head"><span>LIQUIDITY MAP</span><b>₽ 24.8M</b></div>
          <div class="sheet-row"><span>Operating</span><b>₽ 12.4M</b></div>
          <div class="sheet-track"><i style="--w:78%"></i></div>
          <div class="sheet-row"><span>Reserve</span><b>₽ 7.1M</b></div>
          <div class="sheet-track"><i style="--w:46%"></i></div>
          <div class="sheet-row"><span>Settlement</span><b>₽ 5.3M</b></div>
          <div class="sheet-track"><i style="--w:34%"></i></div>
        </div>`
    },
    exceptions: {
      kicker: 'EXCEPTION CONTROL',
      title: 'Команда работает с отклонениями, а не пересматривает всё подряд.',
      text: 'Новый контрагент, необычная сумма или нарушение политики автоматически уходят в отдельную очередь с контекстом события.',
      list: ['Приоритетная очередь рисков', 'Причина сигнала внутри карточки', 'Audit trail по каждому решению'],
      visual: `
        <div class="payment-sheet">
          <div class="sheet-head"><span>EXCEPTION #R-31</span><b style="color:#d02a2a">HIGH</b></div>
          <div class="sheet-row"><span>Сигнал</span><b>Сумма выше профиля</b></div>
          <div class="sheet-row"><span>Контрагент</span><b>Existing vendor</b></div>
          <div class="sheet-row"><span>Deviation</span><b>4.8× median</b></div>
          <div class="sheet-track"><i style="--w:84%;background:#d02a2a"></i></div>
          <div class="sheet-foot"><span>Rule matched</span><span>CFO review</span><span>Audit logged</span></div>
        </div>`
    }
  };

  const modeKicker = $('[data-mode-kicker]');
  const modeTitle = $('[data-mode-title]');
  const modeText = $('[data-mode-text]');
  const modeList = $('[data-mode-list]');
  const modeVisual = $('[data-mode-visual]');

  $$('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      const state = modes[button.dataset.mode];
      if (!state) return;

      $$('[data-mode]').forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
      });

      if (modeKicker) modeKicker.textContent = state.kicker;
      if (modeTitle) modeTitle.textContent = state.title;
      if (modeText) modeText.textContent = state.text;
      if (modeList) modeList.innerHTML = state.list.map((item) => `<li>${item}</li>`).join('');
      if (modeVisual) modeVisual.innerHTML = state.visual;
    });
  });

  const paymentsRange = $('[data-payments-range]');
  const entitiesRange = $('[data-entities-range]');
  const approvalsRange = $('[data-approvals-range]');
  const paymentsValue = $('[data-payments-value]');
  const entitiesValue = $('[data-entities-value]');
  const approvalsValue = $('[data-approvals-value]');
  const complexityScore = $('[data-complexity-score]');
  const contextBar = $('[data-context-bar]');
  const approvalBar = $('[data-approval-bar]');
  const exceptionBar = $('[data-exception-bar]');
  const contextValue = $('[data-context-value]');
  const approvalValue = $('[data-approval-value]');
  const exceptionValue = $('[data-exception-value]');

  const describe = (value, low, high, labels) => {
    if (value < low) return labels[0];
    if (value < high) return labels[1];
    return labels[2];
  };

  const renderSimulator = () => {
    if (!paymentsRange || !entitiesRange || !approvalsRange) return;

    const payments = Number(paymentsRange.value);
    const entities = Number(entitiesRange.value);
    const approvals = Number(approvalsRange.value);

    if (paymentsValue) paymentsValue.textContent = String(payments);
    if (entitiesValue) entitiesValue.textContent = String(entities);
    if (approvalsValue) approvalsValue.textContent = String(approvals);

    const paymentFactor = Math.min(1, payments / 2000);
    const entityFactor = Math.min(1, entities / 12);
    const approvalFactor = Math.min(1, approvals / 5);
    const score = Math.round((paymentFactor * 42 + entityFactor * 31 + approvalFactor * 27) * 100) / 100;
    const normalized = Math.round(score);

    const contexts = Math.round(Math.min(100, 18 + entityFactor * 52 + paymentFactor * 30));
    const approvalsLoad = Math.round(Math.min(100, 15 + approvalFactor * 62 + paymentFactor * 23));
    const exceptions = Math.round(Math.min(100, 12 + entityFactor * 28 + approvalFactor * 18 + paymentFactor * 42));

    if (complexityScore) complexityScore.textContent = String(normalized);
    if (contextBar) contextBar.style.setProperty('--w', `${contexts}%`);
    if (approvalBar) approvalBar.style.setProperty('--w', `${approvalsLoad}%`);
    if (exceptionBar) exceptionBar.style.setProperty('--w', `${exceptions}%`);
    if (contextValue) contextValue.textContent = describe(contexts, 40, 72, ['low', 'medium', 'high']);
    if (approvalValue) approvalValue.textContent = describe(approvalsLoad, 40, 72, ['light', 'moderate', 'heavy']);
    if (exceptionValue) exceptionValue.textContent = describe(exceptions, 40, 72, ['low', 'visible', 'dense']);
  };

  [paymentsRange, entitiesRange, approvalsRange].forEach((input) => input?.addEventListener('input', renderSimulator));
  renderSimulator();

  const scopeData = {
    Approvals: ['Approval control map', 'Маршруты согласования, лимиты, роли и исключения для выбранного типа платежей.'],
    Liquidity: ['Liquidity visibility map', 'Счета, доступные остатки, резервы и движение между юрлицами в одном рабочем представлении.'],
    Risk: ['Risk control map', 'Сигналы, policy-flags, новая сторона платежа и нестандартные операции как отдельный workflow.'],
    'Multi-entity': ['Multi-entity finance map', 'Консолидированный обзор нескольких юрлиц с ролями, политиками и разделением финансовых контуров.']
  };

  const scopeTitle = $('[data-scope-title]');
  const scopeText = $('[data-scope-text]');
  $$('[data-scope]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-scope]').forEach((item) => item.classList.toggle('active', item === button));
      const selected = scopeData[button.dataset.scope];
      if (!selected) return;
      if (scopeTitle) scopeTitle.textContent = selected[0];
      if (scopeText) scopeText.textContent = selected[1];
    });
  });

  $$('[data-contour]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.contour;
      const scope = target === 'Control' ? 'Approvals' : target === 'Operations' ? 'Liquidity' : 'Multi-entity';
      $$('[data-scope]').find((item) => item.dataset.scope === scope)?.click();
      $('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const dialog = $('[data-brief-dialog]');
  const stage = $('[data-brief-stage]');
  const progress = $('[data-brief-progress]');
  const prev = $('[data-brief-prev]');
  const next = $('[data-brief-next]');
  let step = 0;
  let lastFocused = null;

  const briefSteps = [
    {
      index: '01 / 04',
      title: 'Start with visibility.',
      text: 'Сначала нужен не новый процесс, а общая картина: счета, юрлица, роли и активные маршруты согласования.',
      visual: [['Accounts', '7', 'connected views'], ['Entities', '4', 'separate policies'], ['Roles', '12', 'finance participants']]
    },
    {
      index: '02 / 04',
      title: 'Turn policy into logic.',
      text: 'Лимиты, полномочия и исключения переводятся из регламента в исполняемые правила, которые применяются к операции до её исполнения.',
      visual: [['Limit', '> 500K', 'CFO approval'], ['Vendor', 'New', 'verification'], ['Currency', 'FX', 'treasury review']]
    },
    {
      index: '03 / 04',
      title: 'Route only what matters.',
      text: 'Обычные операции проходят по штатному пути, а нетипичные сценарии автоматически собираются в отдельную очередь контроля.',
      visual: [['Normal', '82%', 'standard route'], ['Review', '14%', 'manual context'], ['High', '4%', 'priority queue']]
    },
    {
      index: '04 / 04',
      title: 'Keep every decision visible.',
      text: 'Создание, policy-match, согласование, изменение маршрута и итоговый статус остаются в едином audit trail.',
      visual: [['Created', '09:36', 'finance'], ['Approved', '09:38', 'lead'], ['Review', '09:41', 'CFO']]
    }
  ];

  const renderBrief = () => {
    if (!stage || !progress || !prev || !next) return;
    const current = briefSteps[step];
    stage.innerHTML = `
      <span class="dialog-index">${current.index}</span>
      <h2 id="briefTitle">${current.title}</h2>
      <p>${current.text}</p>
      <div class="brief-visual">${current.visual.map(([label, value, note]) => `<div><span>${label}</span><b>${value}</b><small>${note}</small></div>`).join('')}</div>`;
    progress.style.width = `${((step + 1) / briefSteps.length) * 100}%`;
    prev.disabled = step === 0;
    next.textContent = step === briefSteps.length - 1 ? 'Закрыть' : 'Далее';
  };

  const openBrief = (trigger) => {
    if (!dialog) return;
    lastFocused = trigger || document.activeElement;
    step = 0;
    renderBrief();
    closeMenu();
    if (typeof dialog.showModal === 'function') dialog.showModal();
  };

  const closeBrief = () => {
    if (!dialog) return;
    dialog.close();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  $$('[data-open-brief]').forEach((button) => button.addEventListener('click', () => openBrief(button)));
  $('[data-close-brief]')?.addEventListener('click', closeBrief);
  prev?.addEventListener('click', () => {
    if (step > 0) {
      step -= 1;
      renderBrief();
    }
  });
  next?.addEventListener('click', () => {
    if (step < briefSteps.length - 1) {
      step += 1;
      renderBrief();
    } else {
      closeBrief();
    }
  });
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeBrief();
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay;
          if (delay) entry.target.style.setProperty('--delay', `${delay}ms`);
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    $$('.reveal').forEach((node) => observer.observe(node));
  } else {
    $$('.reveal').forEach((node) => node.classList.add('is-visible'));
  }
})();
