const filters = document.querySelector('.menu-filters');
const groups = [...document.querySelectorAll('[data-group]')];
const categoryButtons = [...filters.querySelectorAll('button')];

function showCategory(category) {
  for (const button of categoryButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.category === category));
  }
  for (const group of groups) {
    group.hidden = group.dataset.group !== category;
  }
}

filters.hidden = false;
showCategory(categoryButtons[0].dataset.category);
for (const button of categoryButtons) {
  button.addEventListener('click', () => showCategory(button.dataset.category));
}

const form = document.querySelector('.demo-form');
const result = document.querySelector('.demo-result');
form.hidden = false;

form.addEventListener('input', () => result.replaceChildren());
form.addEventListener('submit', event => {
  event.preventDefault();
  const values = new FormData(form);
  const heading = document.createElement('strong');
  heading.textContent = form.dataset.result;
  const summary = document.createElement('p');
  summary.textContent = Array.from(values.values()).join(' · ');
  result.replaceChildren(heading, summary);

  if (values.has('bake')) {
    const price = Number(form.elements.bake.selectedOptions[0].dataset.price);
    const total = price * Number(values.get('quantity'));
    const estimate = document.createElement('p');
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    estimate.textContent = `Estimated total ${currency.format(total)} before tax.`;
    result.append(estimate);
  }
});
