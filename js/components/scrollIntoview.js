document.addEventListener('click', (evt) => {
  if (false === evt.target.classList.contains('js-scroll-into-view')) {
    return;
  }

  const { target } = evt.target.dataset;
  const el = document.querySelector(target);
  if (!el) {
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
});
