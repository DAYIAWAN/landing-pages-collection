(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const menuToggle = $('[data-menu-toggle]');
  const mobileMenu = $('[data-mobile-menu]');

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
      document.body.classList.toggle('menu-open', !open);
    });
    $$('a', mobileMenu).forEach((link) => link.addEventListener('click', closeMenu));
  }

  const scenes = {
    living: {
      image: 'assets/img/living-room.svg',
      alt: 'Абстрактная визуализация гостиной AXIS 48',
      caption: 'Living room / 07:40',
      number: '01',
      title: 'Living plane',
      text: 'Единая дневная плоскость объединяет кухню, столовую и гостиную, но меняет масштаб через уровень потолка и направление света.',
      specs: [['Сценарий', 'Morning / social'], ['Свет', 'East + reflected'], ['Порог', 'Low visual noise']]
    },
    terrace: {
      image: 'assets/img/terrace.svg',
      alt: 'Абстрактная визуализация террасы AXIS 48',
      caption: 'Terrace / 16:25',
      number: '02',
      title: 'Open edge',
      text: 'Терраса работает как полноценная наружная комната: глубокая тень, защищённая линия сидения и дальняя перспектива без ощущения открытой витрины.',
      specs: [['Сценарий', 'Afternoon / pause'], ['Свет', 'Filtered west'], ['Порог', 'Protected outdoor']]
    },
    courtyard: {
      image: 'assets/img/courtyard.svg',
      alt: 'Абстрактная визуализация вечернего двора AXIS 48',
      caption: 'Courtyard / 20:10',
      number: '03',
      title: 'Inner night',
      text: 'Закрытый двор — не декоративный сад, а второй адрес дома: тёплый вечерний свет, низкая посадка и маршрут без контакта с уличным потоком.',
      specs: [['Сценарий', 'Evening / return'], ['Свет', 'Low warm'], ['Порог', 'Shared private']]
    }
  };

  const sceneImage = $('[data-scene-image]');
  const sceneFigure = sceneImage?.closest('figure');
  const sceneMeta = $('[data-scene-meta]');

  const renderScene = (key) => {
    const scene = scenes[key];
    if (!scene || !sceneImage || !sceneMeta || !sceneFigure) return;
    sceneImage.style.opacity = '0';
    window.setTimeout(() => {
      sceneImage.src = scene.image;
      sceneImage.alt = scene.alt;
      sceneImage.style.opacity = '1';
    }, 120);
    $('figcaption', sceneFigure).textContent = scene.caption;
    $('.scene-number', sceneMeta).textContent = scene.number;
    $('h3', sceneMeta).textContent = scene.title;
    $('p', sceneMeta).textContent = scene.text;
    const specRows = $$('dl div', sceneMeta);
    scene.specs.forEach(([term, value], index) => {
      if (!specRows[index]) return;
      $('dt', specRows[index]).textContent = term;
      $('dd', specRows[index]).textContent = value;
    });
  };

  $$('.scene-tab').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.scene-tab').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      renderScene(button.dataset.scene);
    });
  });

  const floors = {
    6: { code: 'R/06', title: 'Sky house', text: 'Максимальная дистанция от улицы, расширенная терраса и отдельный сценарий вечерней гостиной.', stats: [['142–168', 'м² демонстрационная площадь'], ['3–4', 'приватные комнаты'], ['2', 'ориентации света'], ['01', 'терраса-галерея']] },
    5: { code: 'R/05', title: 'Panorama', text: 'Угловая дневная зона с двумя ориентациями и более длинной световой траекторией в течение дня.', stats: [['126–148', 'м² демонстрационная площадь'], ['3', 'приватные комнаты'], ['2', 'фасадные стороны'], ['20–28', 'м² террасы']] },
    4: { code: 'R/04', title: 'Gallery', text: 'Вытянутая композиция с длинной перспективой вдоль фасада и ясным разделением гостевой и приватной части.', stats: [['118–136', 'м² демонстрационная площадь'], ['3', 'приватные комнаты'], ['01', 'длинная галерея'], ['18–24', 'м² террасы']] },
    3: { code: 'R/03', title: 'Garden', text: 'Нижний жилой уровень связан с зелёным буфером и воспринимается скорее как городской дом, чем квартира.', stats: [['94–108', 'м² демонстрационная площадь'], ['2', 'приватные комнаты'], ['01', 'зелёный буфер'], ['12–18', 'м² террасы']] }
  };

  const stackData = $('[data-stack-data]');
  $$('.floor').forEach((button) => {
    button.addEventListener('click', () => {
      const data = floors[button.dataset.floor];
      if (!data || !stackData) return;
      $$('.floor').forEach((item) => item.classList.toggle('is-active', item === button));
      $('.stack-data-code', stackData).textContent = data.code;
      $('h3', stackData).textContent = data.title;
      $('p:not(.fineprint)', stackData).textContent = data.text;
      const cells = $$('.stack-data-grid div', stackData);
      data.stats.forEach(([value, label], index) => {
        if (!cells[index]) return;
        $('strong', cells[index]).textContent = value;
        $('span', cells[index]).textContent = label;
      });
    });
  });

  const lightRange = $('[data-light-range]');
  const privacyRange = $('[data-privacy-range]');
  const atmosphereStage = $('[data-atmosphere-stage]');
  const lightOutput = $('[data-light-output]');
  const privacyOutput = $('[data-privacy-output]');
  const atmosphereStatus = $('[data-atmosphere-status]');

  const updateAtmosphere = () => {
    if (!lightRange || !privacyRange || !atmosphereStage) return;
    const light = Number(lightRange.value);
    const privacy = Number(privacyRange.value);
    if (lightOutput) lightOutput.textContent = `${light}%`;
    if (privacyOutput) privacyOutput.textContent = `${privacy}%`;
    const brightness = 0.55 + (light / 100) * 0.65;
    const contrast = 0.9 + (privacy / 100) * 0.25;
    atmosphereStage.style.setProperty('--scene-brightness', brightness.toFixed(2));
    atmosphereStage.style.setProperty('--scene-contrast', contrast.toFixed(2));
    const lightLabel = light > 72 ? 'Bright' : light > 42 ? 'Balanced' : 'Low light';
    const privacyLabel = privacy > 72 ? 'deep private' : privacy > 38 ? 'semi-private' : 'open edge';
    if (atmosphereStatus) atmosphereStatus.textContent = `${lightLabel} / ${privacyLabel}`;
  };
  [lightRange, privacyRange].forEach((range) => range?.addEventListener('input', updateAtmosphere));
  updateAtmosphere();

  const systems = {
    air: { index: '01 / Air', title: 'Воздух без ощущения техники', text: 'Концепция предполагает скрытые зоны подачи воздуха, раздельное управление дневной и приватной частью и сервисные маршруты без вмешательства в жилые помещения.', items: ['раздельные климатические зоны;', 'контролируемое проветривание;', 'скрытый доступ к обслуживанию;', 'ночной тихий режим.'] },
    sound: { index: '02 / Sound', title: 'Акустика как часть планировки', text: 'Буферные помещения и последовательность дверей снижают прямой перенос бытового шума между социальной и приватной частью.', items: ['буферные холлы;', 'разнесённые инженерные зоны;', 'мягкие отражающие поверхности;', 'акустический контроль общих зон.'] },
    access: { index: '03 / Access', title: 'Доступ без визуального шума', text: 'Сценарии входа разделены на основной, сервисный и гостевой. Контроль доступа встроен в маршрут, а не добавлен поверх архитектуры.', items: ['раздельные маршруты;', 'гостевой временный доступ;', 'контроль общих пространств;', 'нейтральный интерфейс без лишних устройств.'] },
    service: { index: '04 / Service', title: 'Обслуживание вне жилого маршрута', text: 'Технические и хозяйственные процессы собраны в отдельных линиях, чтобы обслуживание не становилось частью повседневного сценария.', items: ['сервисные ниши;', 'доступ к инженерии из общих зон;', 'зоны хранения рядом с маршрутом;', 'разделение доставки и гостевого входа.'] }
  };

  const systemDetail = $('[data-system-detail]');
  $$('.orbit-node').forEach((button) => {
    button.addEventListener('click', () => {
      const data = systems[button.dataset.system];
      if (!data || !systemDetail) return;
      $$('.orbit-node').forEach((item) => item.classList.toggle('is-active', item === button));
      $('span', systemDetail).textContent = data.index;
      $('h3', systemDetail).textContent = data.title;
      $('p', systemDetail).textContent = data.text;
      const items = $$('li', systemDetail);
      data.items.forEach((text, index) => { if (items[index]) items[index].textContent = text; });
    });
  });

  const contextTexts = {
    '01': 'Культурный маршрут: галереи, камерные сцены и общественные пространства в пешей или короткой транспортной доступности.',
    '02': 'Повседневный рынок: продукты, небольшие сервисы и кофе — без необходимости превращать бытовые задачи в отдельную поездку.',
    '03': 'Зелёная линия: парк и прогулочный маршрут используются как ежедневная инфраструктура, а не как редкое направление выходного дня.',
    '04': 'Деловое ядро: условная модель короткого городского перемещения без привязки к реальному адресу или конкретному району.'
  };
  const contextDetail = $('[data-context-detail]');
  $$('[data-context]').forEach((button) => button.addEventListener('click', () => {
    if (contextDetail) contextDetail.textContent = contextTexts[button.dataset.context] || '';
  }));

  $$('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      $$('[data-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
      $$('[data-rooms]').forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.rooms !== filter;
      });
    });
  });

  const briefDialog = $('[data-brief-dialog]');
  $$('[data-open-brief]').forEach((button) => button.addEventListener('click', () => {
    closeMenu();
    if (briefDialog?.showModal) briefDialog.showModal();
  }));

  $('[data-build-brief]')?.addEventListener('click', () => {
    if (!briefDialog) return;
    const scenario = $('input[name="scenario"]:checked', briefDialog)?.value || '—';
    const priority = $('input[name="priority"]:checked', briefDialog)?.value || '—';
    const rooms = $('input[name="rooms"]:checked', briefDialog)?.value || '—';
    const result = $('[data-brief-result]', briefDialog);
    if (!result) return;
    result.hidden = false;
    result.innerHTML = `<strong>Demo brief</strong><br>Сценарий: ${scenario}<br>Приоритет: ${priority}<br>Приватные комнаты: ${rooms}<br><br>Это локальное резюме внутри страницы. Никакие данные не отправлены.`;
  });

  $$('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
  });
})();
