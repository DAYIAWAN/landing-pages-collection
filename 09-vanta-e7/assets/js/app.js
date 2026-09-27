(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const topbar = $('[data-topbar]');
  const menuBtn = $('[data-menu]');
  const nav = $('[data-nav]');
  const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('.nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded','false'); }));

  $$('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
    const el = $(btn.dataset.scroll); if (el) el.scrollIntoView({ behavior: 'smooth' });
  }));

  const soundBtn = $('[data-sound]');
  soundBtn.addEventListener('click', () => {
    const next = soundBtn.getAttribute('aria-pressed') !== 'true';
    soundBtn.setAttribute('aria-pressed', String(next));
    document.documentElement.style.setProperty('--acid', next ? '#ff4d00' : '#d8ff35');
  });

  const shapes = [
    ['Long arc','Единая дуга крыши собирает силуэт в одну непрерывную линию.'],
    ['Aero tunnel','Воздушный канал проходит через фронтальную зону и разгружает переднюю ось на скорости.'],
    ['Light blade','Световая графика подчёркивает ширину, не дробя поверхности дополнительным декором.']
  ];
  $$('[data-shape]').forEach(btn => btn.addEventListener('click', () => {
    $$('[data-shape]').forEach(x => x.classList.remove('is-active')); btn.classList.add('is-active');
    const item = shapes[Number(btn.dataset.shape)];
    $('[data-shape-title]').textContent = item[0]; $('[data-shape-text]').textContent = item[1];
  }));

  const modes = {
    tour:{power:'46%',torque:'45 / 55',regen:'Medium',ride:'+8 mm',name:'TOUR',copy:'Мягкий отклик, расширенная рекуперация и спокойная настройка шасси для длинного маршрута.',bars:[55,62,38]},
    pulse:{power:'71%',torque:'40 / 60',regen:'Low',ride:'0 mm',name:'PULSE',copy:'Более плотная педаль, задний акцент тяги и минимальное вмешательство рекуперации.',bars:[72,34,54]},
    track:{power:'93%',torque:'35 / 65',regen:'Track',ride:'−12 mm',name:'TRACK',copy:'Максимальная отдача, низкая посадка и перераспределение тяги для повторяемых быстрых кругов.',bars:[93,82,86]}
  };
  $$('[data-mode]').forEach(btn => btn.addEventListener('click', () => {
    $$('[data-mode]').forEach(x => x.setAttribute('aria-selected','false')); btn.setAttribute('aria-selected','true');
    const m = modes[btn.dataset.mode];
    $('[data-power]').textContent=m.power; $('[data-torque]').textContent=m.torque; $('[data-regen]').textContent=m.regen; $('[data-ride]').textContent=m.ride; $('[data-mode-name]').textContent=m.name; $('[data-mode-copy]').textContent=m.copy;
    ['torque','regen','ride'].forEach((k,i)=>$(`[data-bar="${k}"]`).style.width=`${m.bars[i]}%`);
    $('[data-ring]').style.background=`conic-gradient(var(--acid) 0 ${m.power},#1d1e20 ${m.power})`;
  }));

  const route = $('[data-route]'); const temp = $('[data-temp]');
  const updateRoute = () => {
    const km=Number(route.value), t=Number(temp.value); const tempPenalty = t < 0 ? Math.min(18,Math.abs(t)*.45) : t > 30 ? (t-30)*.35 : 0;
    const consumption = 17.4 + tempPenalty/10; const used=Math.min(92,(km/720)*78*(consumption/17.4)); const arrival=Math.max(8,Math.round(96-used));
    const stop = km < 360 ? 0 : Math.max(12,Math.round((km-320)/8 + tempPenalty*.35));
    $('[data-route-km]').textContent=`${km} km`; $('[data-arrival]').textContent=`${arrival}%`; $('[data-stop]').textContent=stop ? `${stop} min` : 'No stop';
  };
  route.addEventListener('input',updateRoute); temp.addEventListener('input',updateRoute); updateRoute();

  const state={finish:'Obsidian',tone:'#0f1112',character:'Grand Tour',wheel:'21" Aero'};
  const specs={
    'Grand Tour':['720 km','520 kW','3.4 s'],
    'Performance':['650 km','610 kW','2.9 s'],
    'Night Line':['700 km','540 kW','3.2 s']
  };
  const refreshConfig=()=>{
    $('[data-config-name]').textContent=`${state.finish} / ${state.character}`;
    $('[data-config-stage]').style.background=state.tone;
    $('[data-config-stage] .config-glow').style.background=state.finish==='Volt Acid'?'#d8ff35':state.finish==='Ion Silver'?'#aab2ba':'#3150ff';
    const s=specs[state.character]; $('[data-summary-range]').textContent=s[0]; $('[data-summary-power]').textContent=s[1]; $('[data-summary-accel]').textContent=s[2];
    $('[data-brief-finish]').textContent=state.finish; $('[data-brief-character]').textContent=state.character; $('[data-brief-wheel]').textContent=state.wheel;
  };
  $$('[data-finish]').forEach(btn=>btn.addEventListener('click',()=>{ $$('[data-finish]').forEach(x=>x.classList.remove('is-active')); btn.classList.add('is-active'); state.finish=btn.dataset.finish; state.tone=btn.dataset.tone; refreshConfig(); }));
  $$('[data-character]').forEach(btn=>btn.addEventListener('click',()=>{ $$('[data-character]').forEach(x=>x.classList.remove('is-active')); btn.classList.add('is-active'); state.character=btn.dataset.character; refreshConfig(); }));
  $$('[data-wheel]').forEach(btn=>btn.addEventListener('click',()=>{ $$('[data-wheel]').forEach(x=>x.classList.remove('is-active')); btn.classList.add('is-active'); state.wheel=btn.dataset.wheel; refreshConfig(); }));
  refreshConfig();

  const dialog=$('[data-dialog]');
  $$('[data-brief]').forEach(btn=>btn.addEventListener('click',()=>dialog.showModal()));
  $$('[data-dialog-close]').forEach(btn=>btn.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});

  $$('[data-year]').forEach(node=>node.textContent=String(new Date().getFullYear()));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) $$('.reveal').forEach(x=>x.classList.add('is-visible'));
  else {
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12});
    $$('.reveal').forEach(el=>io.observe(el));
  }
})();
