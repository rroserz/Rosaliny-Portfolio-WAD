document.addEventListener('DOMContentLoaded', () => {

  /* Scroll Progress Bar */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  });


  /* Mobile Drawer Navigation */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => { // menu Hamburger
      navLinks.classList.toggle('open');
    });

    // close the hamburger menu when clicking the hamburger menu
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    // click anywhere besides hamburger menu to close the hamburger menu
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
      };
    });
  }

  // Button to copy email address to clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const emailText = document.getElementById('emailText').textContent;
      navigator.clipboard.writeText(emailText).then(() => {
        copyBtn.textContent = 'Copied! ✓';
        copyBtn.style.color = '#10b981';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.color = 'inherit';
        }, 2000);
      });
    });
  }

  /* Light or Dark Theme */
  const themeBtn = document.getElementById('themeBtn');
  const currentTheme = localStorage.getItem('user-theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeBtn) themeBtn.textContent = 'Light Mode';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      localStorage.setItem('user-theme', isDark ? 'dark' : 'light');
    });
  }


  /* Dynamic Text Rotator */
  const roles = [
    'Multimedia Computing Student',
    'UI/UX Prototyper',
    'Java & C++ Programmer',
    'Application Developer',
    'Web Developer',
    'Front-End Developer'
  ];
  let roleIndex = 0;
  const roleElement = document.getElementById('typingRole');

  if (roleElement) {
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.textContent = roles[roleIndex];
    }, 2800);
  }


  /* Live Search) */
  const searchInput = document.getElementById('projectSearch');
  const projectCards = document.querySelectorAll('.project-card');
  const notFoundMsg = document.getElementById('notFoundMsg');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      let foundCount = 0;

      projectCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(keyword)) {
          card.style.display = 'flex';
          foundCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (notFoundMsg) {
        notFoundMsg.style.display = foundCount === 0 ? 'block' : 'none';
      }
    });
  }


  /* Category Filter) */
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* Read More Button*/
  const detailBtns = document.querySelectorAll('.btn-toggle-details');

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentCard = btn.closest('.project-card');
      const extraText = parentCard.querySelector('.extra-text');

      if (extraText) {
        extraText.classList.toggle('show');
        btn.textContent = extraText.classList.contains('show') ? 'Close Information' : 'More Information';
      }
    });
  });

 function updateModalImage() {
  if (currentImages.length > 0) {
    modalActiveImg.src = currentImages[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

    // Button nampak
    if (prevImgBtn && nextImgBtn) {
      if (currentImages.length > 1) {
        prevImgBtn.style.visibility = 'visible';
        nextImgBtn.style.visibility = 'visible';
      } else {
        prevImgBtn.style.visibility = 'hidden';
        nextImgBtn.style.visibility = 'hidden';
      }
    }
  }
}

  /* Form Validation */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError = document.getElementById('msgError');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      nameError.textContent = '';
      emailError.textContent = '';
      msgError.textContent = '';

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        msgError.textContent = 'Please write your message.';
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        msgError.textContent = 'Message must be at least 10 characters long.';
        isValid = false;
      }

      if (isValid && formStatus) {
        formStatus.textContent = 'Your message has been sent successfully!';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        contactForm.reset();
        document.getElementById('charCount').textContent = '0 / 200';

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 4000);
      }
    });
  }


  /* Character Counter */
  const charCount = document.getElementById('charCount');
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCount.textContent = `${length} / 200`;
    });
  }


  /* Back-to-top Button */
  const topBtn = document.getElementById('topBtn');
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    // Hide or show back-to-top button based on scroll position
    if (topBtn) {
      topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }

    // Highlight active navigation link based on current section
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});