(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const assetSrc = (source) => /^https?:\/\//i.test(source) ? source : `assets/img/${source}`;

  const collections = {
    strings: {
      kicker: 'Струнные / оркестровая группа',
      title: 'От скрипки до арфы',
      copy: 'Галерея выстроена как реальная струнная группа: каждый кадр показывает конкретный инструмент, а финальная карточка переводит выбор в мастерскую.',
      tags: ['Скрипка', 'Альт', 'Виолончель', 'Контрабас', 'Арфа', 'Мастерская'],
      cards: [
        ['hero-violin.webp', 'Скрипка', 'VIOLIN'],
        ['gallery-viola.webp', 'Альт', 'VIOLA'],
        ['cello.webp', 'Виолончель', 'CELLO'],
        ['gallery-double-bass.webp', 'Контрабас', 'DOUBLE BASS'],
        ['https://t4.ftcdn.net/jpg/11/91/72/19/240_F_1191721924_GS1SNzq38oCGpxGFr1FXnITTGQ1QFVUF.jpg', 'Арфа', 'HARP'],
        ['https://t4.ftcdn.net/jpg/06/42/06/85/240_F_642068536_kYDTHnL9nFOD6J5SM9xHpWDT5LvtzNWg.jpg', 'Мастерская', 'LUTHIER']
      ]
    },
    winds: {
      kicker: 'Духовые / деревянные и медные',
      title: 'Дыхание оркестра',
      copy: 'Сначала деревянная группа, затем медная — каждая карточка посвящена одному узнаваемому оркестровому инструменту.',
      tags: ['Флейта', 'Гобой', 'Кларнет', 'Фагот', 'Труба', 'Валторна', 'Тромбон', 'Туба', 'Секция'],
      cards: [
        ['gallery-flute.webp', 'Флейта', 'FLUTE'],
        ['https://t3.ftcdn.net/jpg/01/71/76/00/240_F_171760098_8CSDqFn9k8e2JQ7JWaS7VfibdoVUSgiR.jpg', 'Гобой', 'OBOE', 'contain'],
        ['gallery-clarinet.webp', 'Кларнет', 'CLARINET'],
        ['https://t4.ftcdn.net/jpg/04/94/74/27/240_F_494742729_T7p3NvqBt4bLpyftRJNdhtbJknUbDTWc.jpg', 'Фагот', 'BASSOON', 'contain'],
        ['gallery-trumpet.webp', 'Труба', 'TRUMPET'],
        ['gallery-french-horn.webp', 'Валторна', 'FRENCH HORN'],
        ['https://t3.ftcdn.net/jpg/04/63/91/78/240_F_463917829_msa44eIFjqMpaUo9ORIz4mBqziCftEsN.jpg', 'Тромбон', 'TROMBONE', 'contain'],
        ['https://t4.ftcdn.net/jpg/03/16/31/75/240_F_316317516_Vj8xjdtA61pDq6ZYMNi8bY63ZBwEF93b.jpg', 'Туба', 'TUBA', 'contain'],
        ['https://t4.ftcdn.net/jpg/05/77/60/97/240_F_577609772_uKlB26PLDUO4JrycpKHgh7qO1qY171Uu.jpg', 'Духовая секция', 'SECTION']
      ]
    },
    percussion: {
      kicker: 'Ударные / оркестровая перкуссия',
      title: 'Ритм, атака, тембр',
      copy: 'От литавр и барабанов к тарелкам и клавишной перкуссии: основные оркестровые семейства показаны последовательно и предметно.',
      tags: ['Литавры', 'Малый барабан', 'Большой барабан', 'Тарелки', 'Ксилофон', 'Маримба', 'Вибрафон', 'Секция'],
      cards: [
        ['https://t4.ftcdn.net/jpg/02/74/93/25/240_F_274932509_T3onTMvJrwdz1CxoaSA29r6GpyRDw8nF.jpg', 'Литавры', 'TIMPANI'],
        ['https://t4.ftcdn.net/jpg/04/97/97/01/240_F_497970113_HOFHCLNPSWbDWUtq3g5PhofcJbMizx9c.jpg', 'Малый барабан', 'SNARE DRUM', 'contain'],
        ['https://t4.ftcdn.net/jpg/05/85/70/43/240_F_585704360_6MmylBg9YoUrGqMuoxCtjabGbyMRp03s.jpg', 'Большой барабан', 'BASS DRUM', 'contain'],
        ['gallery-cymbals.webp', 'Тарелки', 'CYMBALS'],
        ['https://t3.ftcdn.net/jpg/02/29/50/76/240_F_229507624_YTXgbD7Ml7P1ITZywEUD7I4YNDKlDF7b.jpg', 'Ксилофон', 'XYLOPHONE', 'contain'],
        ['https://t4.ftcdn.net/jpg/07/15/97/59/240_F_715975954_C8d26YpiY8t6PPQMxmUtGd0XMH3tr3mY.jpg', 'Маримба', 'MARIMBA', 'contain'],
        ['https://t4.ftcdn.net/jpg/03/15/68/95/240_F_315689566_KjDwOE3V0s2tXVJddKnMsHZ5EzQ6i9St.jpg', 'Вибрафон', 'VIBRAPHONE', 'contain'],
        ['percussion-stilllife.png', 'Оркестровая перкуссия', 'SECTION']
      ]
    },
    keys: {
      kicker: 'Клавишные / от механики к сцене',
      title: 'Пианино, рояль, клавесин, орган',
      copy: 'Акустические, электронные и исторические клавишные — каждый инструмент показан отдельным кадром.',
      tags: ['Пианино', 'Рояль', 'Цифровое пианино', 'Клавесин', 'Орган'],
      cards: [
        ['https://t4.ftcdn.net/jpg/02/46/43/89/240_F_246438988_EgHJcBTZcdsL1ctkkT18i9SLTvwrX4Mb.jpg', 'Пианино', 'UPRIGHT'],
        ['grand-piano-gold.png', 'Рояль', 'GRAND PIANO'],
        ['https://t3.ftcdn.net/jpg/04/82/46/80/240_F_482468001_NLfdl8zeVIicRYSGOnQk1j3XWWJTrPdQ.jpg', 'Цифровое пианино', 'DIGITAL', 'contain'],
        ['https://t4.ftcdn.net/jpg/01/90/86/19/240_F_190861999_354hQfDRSEBHyCJ1Vf75Y8p5qb8cQiRK.jpg', 'Клавесин', 'HARPSICHORD'],
        ['https://t3.ftcdn.net/jpg/02/83/62/50/240_F_283625055_XBZpsrHJJDiCEz8slNcbNlqru8FOLVsj.jpg', 'Орган', 'ORGAN']
      ]
    },
    accessories: {
      kicker: 'Аксессуары / работа с инструментом',
      title: 'Смычок, опора, футляр, комплектующие',
      copy: 'Практические аксессуары музыканта — от смычка и посадки до защиты инструмента и ухода.',
      tags: ['Смычки', 'Подставки', 'Опоры', 'Футляры', 'Струны и уход'],
      cards: [
        ['https://t4.ftcdn.net/jpg/05/99/77/69/240_F_599776910_swZgs9Ar8h4qdZ603U9fkvtbQiAm0Kwr.jpg', 'Смычки', 'BOWS', 'contain'],
        ['bridge-detail.webp', 'Подставки', 'BRIDGE'],
        ['shoulder-rest.webp', 'Опоры', 'SHOULDER REST'],
        ['https://t4.ftcdn.net/jpg/02/80/91/75/240_F_280917557_0fGGvqGQRRlHSWxZxwRaBs3SLb8Th2dY.jpg', 'Футляры', 'CASES'],
        ['accessories-vintage.png', 'Струны и уход', 'CARE']
      ]
    },
    editions: {
      kicker: 'Издания / репертуар и архив',
      title: 'От рабочей партии до редкого издания',
      copy: 'Ноты, партитуры, рукописи, книги и архивная музыкальная литература собраны по понятной издательской логике.',
      tags: ['Ноты', 'Партитуры', 'Рукописи', 'Книги', 'Архив'],
      cards: [
        ['https://t4.ftcdn.net/jpg/03/76/36/55/240_F_376365580_NS0iSjhi2qQjKtomgijx4xQGHwKt5bQI.jpg', 'Ноты', 'SHEET MUSIC'],
        ['printed-score.webp', 'Партитуры', 'SCORE'],
        ['https://t3.ftcdn.net/jpg/01/64/76/54/240_F_164765400_oL4so5TdaqrawGnku5oJ5vOHT96M9tGo.jpg', 'Рукописи', 'MANUSCRIPT'],
        ['https://t3.ftcdn.net/jpg/03/77/58/70/240_F_377587022_YKMGT0aytSdrEU5044lxBIihPnhhArkY.jpg', 'Музыкальные книги', 'BOOKS'],
        ['music-library.png', 'Архив', 'ARCHIVE']
      ]
    }
  };

  const scenarioSets = {
    artist: {
      no: '01 / ARTIST',
      title: 'Выбор для исполнения',
      copy: 'Сопоставляем инструмент с техникой, репертуаром, задачей и привычным ощущением музыканта — от первого сравнения до финального решения.',
      mode: 'purchase',
      cards: [
        ['hero-violin.webp', 'Подбор'],
        ['strings-stilllife.png', 'Свой тембр'],
        ['grand-piano-gold.png', 'Сцена'],
        ['accessories-stilllife.png', 'Деталь']
      ]
    },
    collector: {
      no: '02 / COLLECTOR',
      title: 'Редкость и происхождение',
      copy: 'Для коллекционного выбора важны история, состояние, мастерская, документированное происхождение и характер конкретного экземпляра.',
      mode: 'exhibition',
      cards: [
        ['antique-violin-museum.png', 'История'],
        ['music-library.png', 'Архив'],
        ['vintage-score.webp', 'Издание'],
        ['rms-violin-detail.webp', 'Аутентичность']
      ]
    },
    institution: {
      no: '03 / INSTITUTION',
      title: 'Поставка для организации',
      copy: 'Собираем спецификацию, учитываем регламент закупки, сроки, сервис, установку и весь комплект вокруг инструмента.',
      mode: 'custom',
      cards: [
        ['orchestra-salon.png', 'Комплектация'],
        ['orchestral-stage-gold.png', 'Сцена'],
        ['percussion-stilllife.png', 'Оркестровая группа'],
        ['grand-piano-gold.png', 'Клавишные']
      ]
    },
    stage: {
      no: '04 / STAGE',
      title: 'Пространство как инструмент',
      copy: 'Акустика, реновация, мебель, оборудование и инструмент рассматриваются как единая система, а не как отдельные позиции.',
      mode: 'custom',
      cards: [
        ['orchestral-stage-gold.png', 'Пространство'],
        ['orchestra-salon.png', 'Зал'],
        ['grand-piano-gold.png', 'Инструмент'],
        ['percussion-stilllife.png', 'Ритм сцены']
      ]
    }
  };

  const detailSets = {
    craft: {
      title: 'Работа мастера',
      copy: 'Фактура дерева, геометрия подставки, посадка струн и следы ручной работы считываются раньше, чем появляется первая нота.',
      cards: [
        ['workshop.webp', 'Подбор у мастера'],
        ['bridge-detail.webp', 'Подставка'],
        ['pegs.webp', 'Колки'],
        ['rms-violin-detail.webp', 'Корпус'],
        ['antique-violin-museum.png', 'Патина']
      ]
    },
    accessory: {
      title: 'Точность аксессуаров',
      copy: 'Смычок, опора, футляр или комплектующие должны исчезнуть из внимания во время игры — именно поэтому выбор детали так важен.',
      cards: [
        ['accessories-stilllife.png', 'Комплект'],
        ['shoulder-rest.webp', 'Опора'],
        ['violin-case.webp', 'Футляр'],
        ['pegs.webp', 'Механика'],
        ['bridge-detail.webp', 'Баланс']
      ]
    },
    edition: {
      title: 'Бумага и репертуар',
      copy: 'Нотное издание — тоже объект: бумага, типографика, история владельца и репертуар формируют отдельный пласт музыкальной коллекции.',
      cards: [
        ['music-library.png', 'Библиотека'],
        ['vintage-score.webp', 'Антиквариат'],
        ['printed-score.webp', 'Партитура'],
        ['score-texture.webp', 'Фактура'],
        ['score.webp', 'Издание']
      ]
    },
    salon: {
      title: 'Пространство выбора',
      copy: 'Инструмент должен быть услышан в подходящей обстановке. Салон становится камерой сравнения — спокойной, точной и без лишнего давления.',
      cards: [
        ['orchestra-salon.png', 'Салон'],
        ['grand-piano-gold.png', 'Рояль'],
        ['strings-stilllife.png', 'Струнные'],
        ['winds-stilllife.png', 'Духовые'],
        ['orchestral-stage-gold.png', 'Сцена']
      ]
    }
  };

  const header = $('[data-header]');
  const menuButton = $('[data-menu-button]');
  const mobileMenu = $('[data-mobile-menu]');

  const setMenu = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileMenu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('a', mobileMenu).forEach((link) => link.addEventListener('click', () => setMenu(false)));

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 22);
  addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  requestAnimationFrame(() => document.body.classList.add('is-ready'));

  const revealItems = $$('[data-reveal]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Primary fan gallery.
  const fanStack = $('[data-fan-stack]');
  const fanKicker = $('[data-fan-kicker]');
  const fanTitle = $('[data-fan-title]');
  const fanCopy = $('[data-fan-copy]');
  const fanTags = $('[data-fan-tags]');
  const fanCounter = $('[data-fan-counter]');
  const fanIndex = $('[data-fan-index]');
  let currentCollection = 'strings';
  let currentFanCard = 0;

  const spread = [-18, -9, 0, 9, 18];
  const shift = [-92, -46, 0, 46, 92];
  const lift = [30, 8, -4, 8, 30];

  const updateFanActive = () => {
    const cards = $$('.fan-card', fanStack);
    const count = cards.length;
    const mobile = innerWidth < 680;
    const compact = innerWidth < 1100;
    const shiftStep = mobile ? 20 : compact ? 31 : 42;
    const angleStep = mobile ? 3.5 : compact ? 4.5 : 5.5;

    cards.forEach((card, index) => {
      let distance = index - currentFanCard;
      if (distance > count / 2) distance -= count;
      if (distance < -count / 2) distance += count;
      const slot = Math.max(-4, Math.min(4, distance));
      const active = index === currentFanCard;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
      card.style.setProperty('--rot', `${slot * angleStep}deg`);
      card.style.setProperty('--shift', `${slot * shiftStep}px`);
      card.style.setProperty('--lift', `${Math.abs(slot) * (mobile ? 7 : 12)}px`);
      card.style.setProperty('--z', String(12 - Math.abs(slot)));
      card.style.opacity = Math.abs(distance) > 4 ? '0' : '1';
      card.style.pointerEvents = Math.abs(distance) > 4 ? 'none' : '';
    });
    const data = collections[currentCollection];
    if (fanCounter) fanCounter.textContent = `${currentFanCard + 1} / ${data.cards.length}`;
    if (fanIndex) fanIndex.textContent = String(currentFanCard + 1).padStart(2, '0');
  };

  const renderFan = (key) => {
    const data = collections[key];
    if (!data || !fanStack) return;
    currentCollection = key;
    currentFanCard = 0;
    fanStack.innerHTML = '';
    data.cards.forEach(([image, label, meta, fit = 'cover'], index) => {
      const card = document.createElement('button');
      card.className = 'fan-card';
      card.type = 'button';
      card.style.setProperty('--rot', '0deg');
      card.style.setProperty('--shift', '0px');
      card.style.setProperty('--lift', '0px');
      card.style.setProperty('--z', String(index + 1));
      card.innerHTML = `<img src="${assetSrc(image)}" alt="${label}" loading="lazy" decoding="async" style="object-fit:${fit}"><span class="fan-card__label"><strong>${label}</strong><span>${meta}</span></span>`;
      card.addEventListener('click', () => {
        currentFanCard = index;
        updateFanActive();
      });
      fanStack.appendChild(card);
    });
    if (fanKicker) fanKicker.textContent = data.kicker;
    if (fanTitle) fanTitle.textContent = data.title;
    if (fanCopy) fanCopy.textContent = data.copy;
    if (fanTags) fanTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
    updateFanActive();
  };

  $$('[data-collection-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-collection-filter]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      renderFan(button.dataset.collectionFilter);
    });
  });
  $('[data-fan-prev]')?.addEventListener('click', () => {
    const count = collections[currentCollection].cards.length;
    currentFanCard = (currentFanCard - 1 + count) % count;
    updateFanActive();
  });
  $('[data-fan-next]')?.addEventListener('click', () => {
    const count = collections[currentCollection].cards.length;
    currentFanCard = (currentFanCard + 1) % count;
    updateFanActive();
  });
  renderFan(currentCollection);
  addEventListener('resize', updateFanActive, { passive: true });

  // Scenario fan gallery.
  const scenarioFan = $('[data-scenario-fan]');
  const scenarioNo = $('[data-scenario-no]');
  const scenarioTitle = $('[data-scenario-title]');
  const scenarioCopy = $('[data-scenario-copy]');
  const scenarioAction = $('.scenario-action');
  let currentScenario = 'artist';
  let scenarioActive = 0;

  const updateScenarioActive = () => {
    $$('.scenario-card', scenarioFan).forEach((card, index) => card.classList.toggle('is-active', index === scenarioActive));
  };

  const renderScenario = (key) => {
    const data = scenarioSets[key];
    if (!data || !scenarioFan) return;
    currentScenario = key;
    scenarioActive = 0;
    scenarioFan.innerHTML = '';
    const localSpread = [-13, -4, 5, 14];
    const localShift = [-60, -20, 20, 60];
    const localLift = [24, 2, 2, 24];
    data.cards.forEach(([image, label], index) => {
      const card = document.createElement('button');
      card.className = 'scenario-card';
      card.type = 'button';
      card.style.setProperty('--rot', `${localSpread[index]}deg`);
      card.style.setProperty('--shift', `${localShift[index]}px`);
      card.style.setProperty('--lift', `${localLift[index]}px`);
      card.style.setProperty('--z', String(index + 1));
      card.innerHTML = `<img src="${assetSrc(image)}" alt="${label}" loading="lazy"><strong>${label}</strong>`;
      card.addEventListener('click', () => {
        scenarioActive = index;
        updateScenarioActive();
      });
      scenarioFan.appendChild(card);
    });
    if (scenarioNo) scenarioNo.textContent = data.no;
    if (scenarioTitle) scenarioTitle.textContent = data.title;
    if (scenarioCopy) scenarioCopy.textContent = data.copy;
    if (scenarioAction) scenarioAction.dataset.mode = data.mode;
    updateScenarioActive();
  };

  $$('[data-scenario-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-scenario-filter]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      renderScenario(button.dataset.scenarioFilter);
    });
  });
  renderScenario(currentScenario);

  // Detail fan gallery.
  const detailFan = $('[data-detail-fan]');
  const detailNo = $('[data-detail-no]');
  const detailTitle = $('[data-detail-title]');
  const detailCopy = $('[data-detail-copy]');
  let currentDetail = 'craft';
  let detailActive = 0;

  const updateDetailActive = () => {
    $$('.detail-card', detailFan).forEach((card, index) => card.classList.toggle('is-active', index === detailActive));
    if (detailNo) detailNo.textContent = String(detailActive + 1).padStart(2, '0');
  };

  const renderDetail = (key) => {
    const data = detailSets[key];
    if (!data || !detailFan) return;
    currentDetail = key;
    detailActive = 0;
    detailFan.innerHTML = '';
    data.cards.forEach(([image, label], index) => {
      const card = document.createElement('button');
      card.className = 'detail-card';
      card.type = 'button';
      card.style.setProperty('--rot', `${spread[index]}deg`);
      card.style.setProperty('--shift', `${shift[index]}px`);
      card.style.setProperty('--lift', `${lift[index]}px`);
      card.style.setProperty('--z', String(index + 1));
      card.innerHTML = `<img src="${assetSrc(image)}" alt="${label}" loading="lazy">`;
      card.addEventListener('click', () => {
        detailActive = index;
        updateDetailActive();
      });
      detailFan.appendChild(card);
    });
    if (detailTitle) detailTitle.textContent = data.title;
    if (detailCopy) detailCopy.textContent = data.copy;
    updateDetailActive();
  };

  $$('[data-detail-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-detail-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
      renderDetail(button.dataset.detailFilter);
    });
  });
  $('[data-detail-prev]')?.addEventListener('click', () => {
    const count = detailSets[currentDetail].cards.length;
    detailActive = (detailActive - 1 + count) % count;
    updateDetailActive();
  });
  $('[data-detail-next]')?.addEventListener('click', () => {
    const count = detailSets[currentDetail].cards.length;
    detailActive = (detailActive + 1) % count;
    updateDetailActive();
  });
  renderDetail(currentDetail);

  // Selection dialog and mail request builder.
  const selectionDialog = $('[data-selection-dialog]');
  const requestForm = $('[data-request-form]');
  const requestPreview = $('[data-request-preview]');
  const mailLink = $('[data-mail-link]');
  const modeMap = {
    purchase: 'Покупка',
    rent: 'Аренда',
    exhibition: 'Экспонирование',
    custom: 'Индивидуальный заказ'
  };

  const updateRequest = () => {
    if (!requestForm || !requestPreview || !mailLink) return;
    const mode = $('input[name="mode"]:checked', requestForm)?.value || 'Покупка';
    const category = $('input[name="category"]:checked', requestForm)?.value || 'Струнные';
    requestPreview.textContent = `${mode}: ${category}. Хотел(а) бы уточнить доступные варианты и условия персонального подбора.`;
    const subject = encodeURIComponent(`RMS — запрос: ${mode}, ${category}`);
    const body = encodeURIComponent(`Здравствуйте!\n\nМеня интересует: ${mode.toLowerCase()}.\nКатегория: ${category}.\n\nПодскажите, пожалуйста, какие варианты можно рассмотреть и как лучше организовать подбор?`);
    mailLink.href = `mailto:info@rms.art?subject=${subject}&body=${body}`;
  };

  const openSelection = (modeKey = '') => {
    if (!selectionDialog) return;
    setMenu(false);
    if (modeKey && requestForm && modeMap[modeKey]) {
      const radio = $$('input[name="mode"]', requestForm).find((input) => input.value === modeMap[modeKey]);
      if (radio) radio.checked = true;
    }
    updateRequest();
    if (typeof selectionDialog.showModal === 'function') {
      selectionDialog.showModal();
      document.body.classList.add('dialog-open');
    }
  };

  $$('[data-open-selection]').forEach((button) => button.addEventListener('click', () => openSelection(button.dataset.mode || '')));
  requestForm?.addEventListener('change', updateRequest);
  $('[data-selection-close]')?.addEventListener('click', () => selectionDialog?.close());
  selectionDialog?.addEventListener('click', (event) => {
    const rect = selectionDialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) selectionDialog.close();
  });
  selectionDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  updateRequest();

  // Clients dialog.
  const clientsDialog = $('[data-clients-dialog]');
  $('[data-clients-open]')?.addEventListener('click', () => {
    clientsDialog?.showModal();
    document.body.classList.add('dialog-open');
  });
  $('[data-clients-close]')?.addEventListener('click', () => clientsDialog?.close());
  clientsDialog?.addEventListener('click', (event) => {
    const rect = clientsDialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) clientsDialog.close();
  });
  clientsDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  $$('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
})();
