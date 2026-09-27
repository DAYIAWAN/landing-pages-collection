(() => {
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.card'));
  const search = document.querySelector('#search');
  const results = document.querySelector('#results');
  const empty = document.querySelector('.empty');
  let filter = 'all';

  function update() {
    const query = search.value.trim().toLocaleLowerCase();
    let shown = 0;
    for (const card of cards) {
      const matchesGroup = filter === 'all' || card.dataset.kind === filter;
      const matchesQuery = card.dataset.search.includes(query);
      card.hidden = !matchesGroup || !matchesQuery;
      if (!card.hidden) shown++;
    }
    results.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}`;
    empty.hidden = shown !== 0;
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      filter = button.dataset.filter;
      for (const item of buttons) {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      }
      update();
    });
  }
  search.addEventListener('input', update);
})();
