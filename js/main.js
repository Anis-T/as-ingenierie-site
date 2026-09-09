/* ==========================================================================
   AS Ingénierie — scripts d'interface
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  function headerOffset() {
    var header = document.querySelector('.site-header');
    return (header ? header.getBoundingClientRect().height : 0) + 20;
  }

  function scrollToElement(el, force) {
    if (!el) return;
    var offset = headerOffset();
    var rect = el.getBoundingClientRect();
    var needsScroll = force || rect.top < offset || rect.bottom > window.innerHeight;
    if (!needsScroll) return;
    window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: scrollBehavior });
  }

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('nav-open', open);
    };

    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      setMenu(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && nav.classList.contains('open')) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     Page Professionnels — parcours gros œuvre
     ------------------------------------------------------------------ */
  var grosOeuvreButtons = document.querySelectorAll('.pro-path-btn[data-target]');
  var grosOeuvrePanels = document.querySelectorAll('.execution-panel');
  var grosOeuvreSection = document.querySelector('[data-execution-toggle]');

  if (grosOeuvreButtons.length && grosOeuvrePanels.length && grosOeuvreSection) {
    grosOeuvreButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var targetId = button.dataset.target;

        grosOeuvreButtons.forEach(function (item) {
          var isActive = item === button;
          item.classList.toggle('active', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });

        grosOeuvrePanels.forEach(function (panel) {
          var isTarget = panel.id === targetId;
          panel.hidden = !isTarget;
          panel.classList.toggle('active', isTarget);
        });

        grosOeuvreSection.classList.add('has-active-panel');
        requestAnimationFrame(function () {
          scrollToElement(grosOeuvreSection, true);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Page Présentation — références : détail dépliable sous la carte
     ------------------------------------------------------------------ */
  var grid = document.querySelector('[data-reference-grid]');
  var detail = document.getElementById('reference-detail');

  if (grid && detail) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.reference-switch-card'));
    var activeCard = null;

    var field = function (name) { return detail.querySelector('[data-reference-' + name + ']'); };
    var mainImage = field('image');
    var galleryBox = field('gallery');
    var adresseRow = detail.querySelector('[data-reference-adresse-row]');
    var closeBtn = detail.querySelector('.reference-detail-close');

    var setText = function (name, value) {
      var el = field(name);
      if (el) el.textContent = value || '';
    };

    /* Dernière carte de la ligne où se trouve la carte cliquée */
    var lastCardOfRow = function (card) {
      var top = card.offsetTop;
      var last = card;
      cards.forEach(function (item) {
        if (Math.abs(item.offsetTop - top) < 4 && item.offsetLeft > last.offsetLeft) last = item;
      });
      return last;
    };

    var buildGallery = function (card) {
      if (!galleryBox) return;
      galleryBox.innerHTML = '';
      var raw = card.dataset.referenceGallery || '';
      var images = raw.split('|').map(function (src) { return src.trim(); }).filter(Boolean);
      var all = [card.dataset.referenceImage].concat(images);

      if (all.length < 2) {
        galleryBox.hidden = true;
        return;
      }

      all.forEach(function (src, index) {
        var thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'reference-thumb' + (index === 0 ? ' active' : '');
        thumb.setAttribute('aria-label', 'Voir la photo ' + (index + 1) + ' du chantier');
        var img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        thumb.appendChild(img);
        thumb.addEventListener('click', function () {
          if (mainImage) mainImage.src = src;
          galleryBox.querySelectorAll('.reference-thumb').forEach(function (item) {
            item.classList.toggle('active', item === thumb);
          });
        });
        galleryBox.appendChild(thumb);
      });
      galleryBox.hidden = false;
    };

    var closeDetail = function () {
      detail.hidden = true;
      detail.classList.remove('is-open');
      cards.forEach(function (item) {
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');
      });
      activeCard = null;
    };

    var openDetail = function (card) {
      /* On masque le panneau avant de mesurer pour ne pas fausser la grille */
      detail.hidden = true;
      detail.classList.remove('is-open');

      var anchor = lastCardOfRow(card);
      if (anchor.nextElementSibling !== detail) {
        anchor.insertAdjacentElement('afterend', detail);
      }

      if (mainImage) {
        mainImage.src = card.dataset.referenceImage || '';
        mainImage.alt = card.dataset.referenceAlt || '';
      }
      setText('location', card.dataset.referenceLocation);
      setText('title', card.dataset.referenceTitle);
      setText('description', card.dataset.referenceDescription);
      setText('programme', card.dataset.referenceProgramme);
      setText('mission', card.dataset.referenceMission);
      setText('contexte', card.dataset.referenceContexte);

      var adresse = card.dataset.referenceAdresse;
      setText('adresse', adresse);
      if (adresseRow) adresseRow.hidden = !adresse;

      buildGallery(card);

      cards.forEach(function (item) {
        var isActive = item === card;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-expanded', String(isActive));
      });

      activeCard = card;
      detail.hidden = false;
      requestAnimationFrame(function () {
        detail.classList.add('is-open');
        scrollToElement(detail, false);
      });
    };

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (activeCard === card) {
          closeDetail();
          return;
        }
        openDetail(card);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        var previous = activeCard;
        closeDetail();
        if (previous) {
          previous.focus({ preventScroll: true });
          scrollToElement(previous, false);
        }
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !detail.hidden) {
        var previous = activeCard;
        closeDetail();
        if (previous) previous.focus({ preventScroll: true });
      }
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      if (!activeCard) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var card = activeCard;
        detail.hidden = true;
        var anchor = lastCardOfRow(card);
        if (anchor.nextElementSibling !== detail) {
          anchor.insertAdjacentElement('afterend', detail);
        }
        detail.hidden = false;
      }, 150);
    });
  }
})();
