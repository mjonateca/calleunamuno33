(() => {
  const cards = [...document.querySelectorAll('.photo-gallery [data-photo]')];
  if (!cards.length) return;
  const controls = [...document.querySelectorAll('[data-filter]')];
  const more = document.querySelector('.photo-more');
  const status = document.querySelector('.photo-status');
  let filter = 'all', expanded = false;
  function applyFilter() {
    const matching = cards.filter(c => filter === 'all' || c.dataset.category === filter);
    cards.forEach(c => { c.hidden = !matching.includes(c) || (!expanded && matching.indexOf(c) >= 9); });
    const visible = matching.filter(c => !c.hidden).length;
    status.textContent = `${visible} de ${matching.length} fotografías`;
    more.hidden = matching.length <= 9;
    more.textContent = expanded ? 'Mostrar menos ↑' : `Ver las ${matching.length} fotografías ↓`;
    controls.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
  }
  controls.forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; expanded = false; applyFilter(); }));
  more.addEventListener('click', () => {
    expanded = !expanded;
    applyFilter();
    if (!expanded) document.querySelector('.photo-controls').scrollIntoView({block:'start'});
  });
  applyFilter();

  const items = cards.map(c => ({ id:c.dataset.photo, src:c.getAttribute('href'), alt:c.querySelector('img').alt }));
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-dialog';
  dialog.setAttribute('aria-label', 'Fotografías de la propiedad');
  dialog.innerHTML = '<span class="viewer-count" aria-live="polite"></span><button class="viewer-close" type="button" aria-label="Cerrar galería">×</button><button class="viewer-prev" type="button" aria-label="Fotografía anterior">‹</button><img alt=""><p class="viewer-caption" aria-live="polite"></p><button class="viewer-next" type="button" aria-label="Fotografía siguiente">›</button>';
  document.body.append(dialog);
  const image = dialog.querySelector('img'), caption = dialog.querySelector('.viewer-caption'), count = dialog.querySelector('.viewer-count');
  let index = 0, opener, touchX;
  let activeItems = items;
  function show(next) {
    index = (next + activeItems.length) % activeItems.length;
    const item = activeItems[index];
    image.src = item.src; image.alt = item.alt;
    caption.textContent = item.alt;
    count.textContent = `${index + 1} / ${activeItems.length}`;
  }
  function close() { dialog.close(); }
  document.querySelectorAll('[data-photo]').forEach(el => {
    function open(e) {
      e.preventDefault(); opener = el;
      activeItems = items.filter(p => !el.closest('.photo-gallery') || filter === 'all' || cards.find(c => c.dataset.photo === p.id).dataset.category === filter);
      show(activeItems.findIndex(p => p.id === el.dataset.photo));
      dialog.showModal(); document.body.classList.add('viewer-open');
      dialog.querySelector('.viewer-close').focus();
    }
    el.addEventListener('click', open);
    if (el.tagName !== 'A') el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(e); });
  });
  dialog.querySelector('.viewer-close').addEventListener('click',close);
  dialog.querySelector('.viewer-prev').addEventListener('click',() => show(index - 1));
  dialog.querySelector('.viewer-next').addEventListener('click',() => show(index + 1));
  dialog.addEventListener('keydown',e => { if(e.key === 'ArrowRight'){e.preventDefault();show(index+1);} if(e.key === 'ArrowLeft'){e.preventDefault();show(index-1);} });
  dialog.addEventListener('close',() => {document.body.classList.remove('viewer-open');opener?.focus({preventScroll:true});});
  dialog.addEventListener('click',e => {if(e.target === dialog)close();});
  image.addEventListener('touchstart',e => {touchX=e.changedTouches[0].clientX;},{passive:true});
  image.addEventListener('touchend',e => {const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>45)show(index+(delta<0?1:-1));},{passive:true});
})();
