(() => {
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const $ = (selector, scope = document) => scope.querySelector(selector);

  window.addEventListener('load', () => {
    window.setTimeout(() => $('.boot')?.classList.add('is-hidden'), 260);
  });

  // Mobile navigation
  const menuButton = $('.menu-button');
  const mobileMenu = $('#mobileMenu');
  const setMenu = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    mobileMenu.hidden = !open;
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('#mobileMenu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  // Demo year
  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  // Hero telemetry, purely decorative demo values
  let liveTick = 0;
  window.setInterval(() => {
    liveTick += 1;
    const throughput = $('[data-live-throughput]');
    const load = $('[data-live-load]');
    if (throughput) throughput.textContent = String(147 + (liveTick % 3));
    if (load) load.textContent = String(71 + (liveTick % 2));
  }, 2400);

  // Equipment inspector
  const equipment = {
    press: {
      tag: 'M01 / PRESS CELL', protocol: 'PROFINET', title: 'Прессовая ячейка',
      text: 'Контроль цикла, усилия и теплового режима. Сигналы объединены в контекст операции, а не отображаются как разрозненные теги.',
      metrics: ['6.4 s', '82 kN', '61 °C', 'Monitor trend']
    },
    vision: {
      tag: 'M02 / VISION GATE', protocol: 'OPC UA', title: 'Контроль геометрии',
      text: 'Результат инспекции связывается с партией, рецептом и состоянием предыдущей операции — так инженер видит не только reject, но и его окружение.',
      metrics: ['42 ms', '0.7 %', 'Stable', 'Trace batch']
    },
    robot: {
      tag: 'M03 / ROBOT CELL', protocol: 'ETHERNET/IP', title: 'Роботизированная ячейка',
      text: 'Наблюдение за осями, циклом и нагрузкой. В демонстрации ось A3 находится в зоне наблюдения: событие ещё не аварийное, но уже требует контекста.',
      metrics: ['5.8 s', 'A3 +14 %', 'Watch', 'Inspect pattern']
    },
    pack: {
      tag: 'M04 / PACK STATION', protocol: 'MODBUS TCP', title: 'Упаковочная станция',
      text: 'Состояние упаковки, счётчик, сменный ритм и простои сведены в одну модель, чтобы локальная остановка не терялась в общей статистике.',
      metrics: ['151 u/h', '3.1 %', 'Nominal', 'Keep running']
    }
  };
  $$('.node').forEach((button) => {
    button.addEventListener('click', () => {
      const data = equipment[button.dataset.node];
      if (!data) return;
      $$('.node').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      $('#nodeTag').textContent = data.tag;
      $('#nodeProtocol').textContent = data.protocol;
      $('#nodeTitle').textContent = data.title;
      $('#nodeText').textContent = data.text;
      $('#nodeMetric1').textContent = data.metrics[0];
      $('#nodeMetric2').textContent = data.metrics[1];
      $('#nodeMetric3').textContent = data.metrics[2];
      $('#nodeAction').textContent = data.metrics[3];
    });
  });

  // Load simulator
  const loadRange = $('#loadRange');
  const updateLoad = () => {
    if (!loadRange) return;
    const value = Number(loadRange.value);
    $('#loadOutput').textContent = `${value}%`;
    $('#gaugeFill').style.width = `${value}%`;
    const throughput = Math.round(92 + value * 0.78);
    const energy = (1.35 + value * 0.0064).toFixed(1);
    const risk = value >= 90 ? 'HIGH' : value >= 80 ? 'WATCH' : 'LOW';
    $('#throughputValue').textContent = `${throughput} u/h`;
    $('#energyValue').textContent = `${energy} kWh`;
    $('#riskValue').textContent = risk;
    $('#gaugeFill').style.background = value >= 90 ? '#d95b42' : value >= 80 ? '#f0c93d' : '#79927d';
  };
  loadRange?.addEventListener('input', updateLoad);
  updateLoad();

  // Fault sequence
  const faultData = [
    ['AXIS A3 / VIBRATION', 'Сигнал вышел из собственного базового диапазона.', 'Система фиксирует не абсолютный порог, а устойчивое отклонение от привычного профиля именно этой оси.'],
    ['PATTERN / CORRELATION', 'Отклонение повторяется в одинаковой фазе цикла.', 'Сигнал сопоставляется с положением оси и операцией. Это отделяет случайный шум от устойчивого производственного паттерна.'],
    ['CONTEXT / PROCESS', 'Причина проверяется относительно режима и продукта.', 'Перед эскалацией учитывается текущий рецепт, нагрузка, смена и история последних циклов.'],
    ['ACTION / HUMAN-IN-LOOP', 'Инженер получает объяснимый следующий шаг.', 'Вместо автоматического «вердикта» система формирует контекст: что изменилось, где и почему это стоит проверить.']
  ];
  $$('.fault-step').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.fault);
      const data = faultData[index];
      if (!data) return;
      $$('.fault-step').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      $('#faultKicker').textContent = data[0];
      $('#faultDetailTitle').textContent = data[1];
      $('#faultDetailText').textContent = data[2];
    });
  });

  // Architecture layers
  const layerData = {
    apps: ['L04 / APPLICATION', 'Рабочие сценарии вместо ещё одного экрана.', 'Верхний слой собирает данные в конкретные действия: контроль смены, техническое обслуживание, анализ потерь, качество и инженерные расследования.'],
    data: ['L03 / CONTEXT', 'У сигнала появляется объект, время и смысл.', 'Модель связывает теги с оборудованием, состояниями, партиями и операциями. Именно этот слой превращает историю значений в инженерную картину.'],
    edge: ['L02 / EDGE', 'Локальная логика остаётся рядом с оборудованием.', 'Нормализация, буферизация и часть правил могут выполняться на площадке, не делая облачный канал единственной точкой работоспособности.'],
    field: ['L01 / FIELD', 'Начало системы — реальное оборудование.', 'PLC, приводы, датчики, машины и существующие протоколы рассматриваются как исходная среда, а не как абстракция, которую нужно заменить ради нового интерфейса.']
  };
  $$('.stack-layer').forEach((button) => {
    button.addEventListener('click', () => {
      const data = layerData[button.dataset.layer];
      if (!data) return;
      $$('.stack-layer').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      $('#layerCode').textContent = data[0];
      $('#layerTitle').textContent = data[1];
      $('#layerText').textContent = data[2];
    });
  });

  // Scope builder
  const scope = {
    site: 'Сборочная линия',
    goal: 'Прозрачность состояний',
    infra: 'Существующие PLC / brownfield'
  };
  const refreshScope = () => {
    const text = `${scope.site} → ${scope.goal.toLowerCase()} → ${scope.infra.toLowerCase()}.`;
    $('#scopeText').textContent = text;
    $('#dialogScope').textContent = text;
  };
  $$('.choice').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.group;
      if (!group) return;
      $$(`.choice[data-group="${group}"]`).forEach((item) => item.classList.toggle('is-active', item === button));
      scope[group] = button.dataset.value;
      refreshScope();
    });
  });
  refreshScope();

  // Brief dialog
  const dialog = $('#briefDialog');
  $$('.js-open-brief').forEach((button) => button.addEventListener('click', () => {
    refreshScope();
    dialog?.showModal();
  }));

  // Escape closes mobile navigation too
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
})();
