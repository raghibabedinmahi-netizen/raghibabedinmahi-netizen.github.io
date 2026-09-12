'use strict';

// Small helper used throughout the site.
const elementToggleFunc = (elem) => {
  if (elem) elem.classList.toggle('active');
};

// ---------------- Sidebar ----------------
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

// ---------------- Testimonials modal ----------------
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = () => {
  modalContainer?.classList.toggle('active');
  overlay?.classList.toggle('active');
};

testimonialsItem.forEach((item) => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    const title = item.querySelector('[data-testimonials-title]');
    const text = item.querySelector('[data-testimonials-text]');

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
    if (text && modalText) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
});

modalCloseBtn?.addEventListener('click', testimonialsModalFunc);
overlay?.addEventListener('click', testimonialsModalFunc);

// ---------------- Portfolio filters ----------------
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const category = item.dataset.category;
    item.classList.toggle('active', selectedValue === 'all' || selectedValue === category);
  });
};

select?.addEventListener('click', () => elementToggleFunc(select));

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selectedValue = item.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];

filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedValue = btn.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);

    lastClickedBtn?.classList.remove('active');
    btn.classList.add('active');
    lastClickedBtn = btn;
  });
});

// ---------------- Contact form validation ----------------
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formBtn) {
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      formBtn.toggleAttribute('disabled', !form.checkValidity());
    });
  });
}

// ---------------- Page navigation ----------------
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.innerText.trim().toLowerCase();

    pages.forEach((page) => {
      page.classList.toggle('active', page.dataset.page === target);
    });

    navigationLinks.forEach((nav) => {
      nav.classList.toggle('active', nav === link);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ---------------- Ambient mouse glow ----------------
const glowTargets = document.querySelectorAll('.sidebar, article');

glowTargets.forEach((target) => {
  target.addEventListener('pointermove', (event) => {
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    target.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

// ---------------- Intro / splash screen ----------------
window.addEventListener('load', () => {
  const introScreen = document.getElementById('introScreen');

  if (!introScreen) return;

  // Gives the C logo enough time to be seen before the portfolio appears.
  setTimeout(() => {
    introScreen.classList.add('hide');
  }, 2200);

  setTimeout(() => {
    introScreen.remove();
  }, 3100);
});
