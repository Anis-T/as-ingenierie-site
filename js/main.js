const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}



const grosOeuvreButtons = document.querySelectorAll('.pro-path-btn[data-target]');
const grosOeuvrePanels = document.querySelectorAll('.execution-panel');
const grosOeuvreSection = document.querySelector('[data-execution-toggle]');

if (grosOeuvreButtons.length && grosOeuvrePanels.length && grosOeuvreSection) {
  grosOeuvreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;

      grosOeuvreButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      grosOeuvrePanels.forEach(panel => {
        const isTarget = panel.id === targetId;
        panel.hidden = !isTarget;
        panel.classList.toggle('active', isTarget);
      });

      grosOeuvreSection.classList.add('has-active-panel');
      grosOeuvreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

const referenceButtons = document.querySelectorAll('.reference-switch-card');
const referenceFeatured = document.querySelector('[data-reference-featured]');

if (referenceButtons.length && referenceFeatured) {
  const featuredImage = referenceFeatured.querySelector('[data-reference-image]');
  const featuredTitle = referenceFeatured.querySelector('[data-reference-title]');
  const featuredDescription = referenceFeatured.querySelector('[data-reference-description]');
  const featuredProgramme = referenceFeatured.querySelector('[data-reference-programme]');
  const featuredMission = referenceFeatured.querySelector('[data-reference-mission]');
  const featuredContexte = referenceFeatured.querySelector('[data-reference-contexte]');

  referenceButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (featuredImage) {
        featuredImage.src = button.dataset.referenceImage;
        featuredImage.alt = button.dataset.referenceAlt;
      }
      if (featuredTitle) featuredTitle.textContent = button.dataset.referenceTitle;
      if (featuredDescription) featuredDescription.textContent = button.dataset.referenceDescription;
      if (featuredProgramme) featuredProgramme.textContent = button.dataset.referenceProgramme;
      if (featuredMission) featuredMission.textContent = button.dataset.referenceMission;
      if (featuredContexte) featuredContexte.textContent = button.dataset.referenceContexte;

      referenceButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      const isMobile = window.matchMedia('(max-width: 700px)').matches;
      if (isMobile) {
        const header = document.querySelector('.site-header');
        const headerOffset = header ? header.offsetHeight + 18 : 18;
        const targetTop = referenceFeatured.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}
