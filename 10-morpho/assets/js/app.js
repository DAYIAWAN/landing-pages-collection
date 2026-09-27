(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const menuToggle = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  if (menuToggle && nav) {
    const setMenu = (open) => {
      menuToggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', nav).forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  const systems = {
    cardio: {
      code: '01 / CARDIO',
      title: 'Сердечно-сосудистый контекст',
      copy: 'Интерфейс собирает жалобы, бытовой контекст, доступные измерения и историю наблюдений в один читаемый маршрут — без автоматических диагнозов.',
      facts: [['Фокус', 'динамика, а не единичная цифра'], ['Читает', 'врач + пациент'], ['Результат', 'структурированный вопрос']]
    },
    metabolic: {
      code: '02 / METABOLIC',
      title: 'Метаболический контекст',
      copy: 'Показатели рассматриваются рядом с режимом, привычками и предыдущими наблюдениями. Интерфейс помогает увидеть связи, но оставляет медицинскую интерпретацию специалисту.',
      facts: [['Фокус', 'связи между событиями'], ['Читает', 'динамика + история'], ['Результат', 'вопросы для визита']]
    },
    sleep: {
      code: '03 / SLEEP',
      title: 'Сон как часть общей картины',
      copy: 'Самочувствие, режим и субъективные наблюдения можно видеть в одной временной шкале, не превращая consumer-метрики в медицинские выводы.',
      facts: [['Фокус', 'ритм и самочувствие'], ['Читает', 'человек + специалист'], ['Результат', 'контекст наблюдения']]
    },
    stress: {
      code: '04 / LOAD',
      title: 'Нагрузка и восстановление',
      copy: 'Физическая, рабочая и эмоциональная нагрузка отображается как контекст для разговора о самочувствии — без попытки свести человека к одному индексу.',
      facts: [['Фокус', 'нагрузка / восстановление'], ['Читает', 'контекст недели'], ['Результат', 'понятный маршрут']]
    }
  };

  const systemButtons = $$('[data-system]');
  systemButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const data = systems[button.dataset.system];
      if (!data) return;
      systemButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      $('[data-system-code]').textContent = data.code;
      $('[data-system-title]').textContent = data.title;
      $('[data-system-copy]').textContent = data.copy;
      const facts = $('[data-system-facts]');
      facts.innerHTML = data.facts.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
    });
  });

  const traceData = {
    intake: ['INTAKE / 001', 'Человек формулирует не диагноз, а задачу.', 'Первый экран помогает описать самочувствие, ограничения, цели и обстоятельства понятным языком. Никаких «предсказаний» до врачебного рассмотрения.', ['контекст дня', 'самочувствие', 'цель обращения', 'история']],
    signals: ['SIGNALS / 014', 'Измерения получают происхождение и время.', 'Домашние устройства, лабораторные данные или ручные наблюдения не смешиваются в одну цифру: видно источник, дату и границы применимости.', ['источник', 'время', 'качество', 'изменение']],
    review: ['REVIEW / 020', 'Врач видит, что изменилось — и почему это заметно.', 'Интерфейс выделяет расхождения и контекст, но не принимает медицинское решение вместо специалиста.', ['динамика', 'расхождение', 'контекст', 'human review']],
    plan: ['PLAN / 031', 'Следующий шаг становится явным.', 'Решение фиксируется понятным языком: что делать, что наблюдать и когда возвращаться к вопросу.', ['действие', 'наблюдение', 'границы', 'владелец']],
    follow: ['FOLLOW-UP / 054', 'История не обнуляется после визита.', 'Повторное наблюдение начинается не с пустого экрана, а с предыдущего решения и изменений после него.', ['прошлый план', 'изменения', 'переносимость', 'следующий обзор']]
  };

  const traceButtons = $$('[data-trace]');
  traceButtons.forEach((button) => button.addEventListener('click', () => {
    const item = traceData[button.dataset.trace];
    if (!item) return;
    traceButtons.forEach((node) => {
      const active = node === button;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-selected', String(active));
    });
    $('[data-trace-code]').textContent = item[0];
    $('[data-trace-title]').textContent = item[1];
    $('[data-trace-copy]').textContent = item[2];
    $('[data-trace-signals]').innerHTML = item[3].map((signal) => `<span>${signal}</span>`).join('');
  }));

  const layerData = {
    history: ['L1 / HISTORY', 'Предыдущие обращения, известные ограничения и важные наблюдения остаются в видимом контексте, а не исчезают между визитами.', ['события', 'наблюдения', 'назначения', 'заметки пациента']],
    signals: ['L2 / SIGNALS', 'Новые сигналы отделены от истории и имеют понятное происхождение: когда, где и каким способом они появились.', ['измерения', 'самоотчёт', 'лаборатория', 'устройство']],
    context: ['L3 / CONTEXT', 'Режим, сон, нагрузка и изменения в повседневности не подменяют медицинские данные, но помогают читать их в реальной жизни.', ['режим', 'нагрузка', 'питание', 'изменения']],
    plan: ['L4 / PLAN', 'Финальный слой хранит не абстрактный score, а подтверждённый человеком следующий шаг, сроки наблюдения и границы ответственности.', ['следующий шаг', 'контроль', 'срок', 'ответственный']]
  };
  const layerButtons = $$('[data-layer]');
  layerButtons.forEach((button) => button.addEventListener('click', () => {
    const item = layerData[button.dataset.layer];
    layerButtons.forEach((node) => {
      const active = node === button;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-pressed', String(active));
    });
    $('[data-layer-code]').textContent = item[0];
    $('[data-layer-copy]').textContent = item[1];
    $('[data-layer-points]').innerHTML = item[2].map((point) => `<span>${point}</span>`).join('');
  }));

  const accessSample = $('[data-access-sample]');
  $$('[data-access]').forEach((button) => button.addEventListener('click', () => {
    const active = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(active));
    const key = button.dataset.access;
    if (key === 'contrast') accessSample.classList.toggle('is-high', active);
    if (key === 'type') accessSample.classList.toggle('is-large', active);
    if (key === 'motion') accessSample.classList.toggle('is-reduced', active);
  }));

  const scenarios = {
    prevent: ['01 / PREVENT', ['контекст', 'базовый обзор', 'врачебная интерпретация', 'следующий ориентир'], 'Задача — увидеть отправную точку и договориться, что действительно стоит отслеживать дальше. Без обещаний «найти всё».'],
    monitor: ['02 / MONITOR', ['прошлый план', 'новые сигналы', 'сравнение динамики', 'коррекция маршрута'], 'Главный объект интерфейса — изменение во времени. Пользователь и врач видят, что поменялось после предыдущего решения.'],
    recovery: ['03 / RECOVERY', ['нагрузка', 'самочувствие', 'переносимость', 'следующий шаг'], 'Маршрут помогает обсуждать возвращение к привычной активности через наблюдаемую переносимость, а не через абстрактный «процент восстановления».']
  };
  const scenarioButtons = $$('[data-scenario]');
  scenarioButtons.forEach((button) => button.addEventListener('click', () => {
    const item = scenarios[button.dataset.scenario];
    scenarioButtons.forEach((node) => {
      const active = node === button;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-selected', String(active));
    });
    $('[data-scenario-code]').textContent = item[0];
    $('[data-scenario-path]').innerHTML = item[1].map((part, index) => `${index ? '<i></i>' : ''}<span>${part}</span>`).join('');
    $('[data-scenario-copy]').textContent = item[2];
  }));

  const planner = () => {
    const goal = $('input[name="goal"]:checked')?.value || '';
    const format = $('input[name="format"]:checked')?.value || '';
    const pace = $('input[name="pace"]:checked')?.value || '';
    $('[data-plan-summary]').textContent = `${goal} · ${format} · ${pace}`;
    const map = {'Понять исходную точку':'01','Отследить динамику':'02','Поддержать восстановление':'03'};
    $('[data-plan-code]').textContent = `M-${map[goal] || '01'}`;
    return [goal, format, pace];
  };
  $$('[data-planner] input').forEach((input) => input.addEventListener('change', planner));
  planner();

  const pass = $('[data-pass]');
  $('[data-open-pass]')?.addEventListener('click', () => {
    const route = planner();
    $('[data-pass-route]').innerHTML = route.map((item, index) => `<div><span>0${index + 1}</span> ${item}</div>`).join('');
    if (typeof pass.showModal === 'function') pass.showModal(); else pass.setAttribute('open', '');
  });
  $$('[data-close-pass]').forEach((button) => button.addEventListener('click', () => pass.close?.()));
  pass?.addEventListener('click', (event) => {
    if (event.target === pass) pass.close?.();
  });

  const sections = $$('[data-section]');
  const railDots = $$('[data-rail]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        railDots.forEach((dot) => dot.classList.toggle('is-active', dot.dataset.rail === entry.target.id));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
})();
