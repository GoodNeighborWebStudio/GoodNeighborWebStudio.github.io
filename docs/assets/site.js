const projectType = document.querySelector('#project-type');
for (const link of document.querySelectorAll('[data-project]')) {
  link.addEventListener('click', () => {
    projectType.value = link.dataset.project;
  });
}
