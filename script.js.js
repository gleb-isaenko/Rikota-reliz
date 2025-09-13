
const faders = document.querySelectorAll('.section, .media-row, .feature, .price-card, .doc, .bubble');
const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = 'translateY(0)';
    entry.target.style.transition = 'all 0.8s ease-out';
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.style.opacity = 0;
  fader.style.transform = 'translateY(20px)';
  appearOnScroll.observe(fader);
});

const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if(navToggle && mainNav) {
  navToggle.addEventListener('change', () => {
    mainNav.style.transform = navToggle.checked ? 'translateY(0)' : 'translateY(-120%)';
  });
}

const buttons = document.querySelectorAll('.btn, .btn--ghost');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.transition = '0.3s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});


const faqItems = document.querySelectorAll('details');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    item.style.transition = 'background 0.3s ease';
  });
});


const badges = document.querySelectorAll('.badge');
badges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.1)';
    badge.style.transition = '0.3s ease';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'scale(1)';
  });
});

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200; 

    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});

const floatingBtn = document.querySelector('.floating-contact');
if(floatingBtn){
  floatingBtn.addEventListener('mouseenter', () => {
    floatingBtn.style.transform = 'scale(1.1)';
    floatingBtn.style.transition = '0.3s ease';
  });
  floatingBtn.addEventListener('mouseleave', () => {
    floatingBtn.style.transform = 'scale(1)';
  });
  // Пульсація кнопки
  setInterval(() => {
    floatingBtn.style.transform = 'scale(1.05)';
    setTimeout(() => floatingBtn.style.transform = 'scale(1)', 800);
  }, 3000);
}

const openRegister = document.getElementById('open-register');
const registerModal = document.getElementById('register-modal');
const closeRegister = document.getElementById('close-register');

openRegister.addEventListener('click', () => {
  registerModal.style.display = 'block';
  setTimeout(() => registerModal.classList.add('show'), 10);
});

closeRegister.addEventListener('click', () => {
  registerModal.classList.remove('show');
  setTimeout(() => registerModal.style.display = 'none', 300);
});

window.addEventListener('click', (e) => {
  if (e.target == registerModal) {
    registerModal.classList.remove('show');
    setTimeout(() => registerModal.style.display = 'none', 300);
  }
});


const registerForm = document.getElementById('register-form');
const errorBox = document.getElementById('error-box');
const successBox = document.getElementById('success-box');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorBox.textContent = '';
  successBox.textContent = '';

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    errorBox.textContent = 'Всі поля обовʼязкові!';
    return;
  }

  if (!email.includes('@')) {
    errorBox.textContent = 'Введіть правильний email!';
    return;
  }

  if (password.length < 6) {
    errorBox.textContent = 'Пароль повинен бути не менше 6 символів!';
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if(users.find(u => u.email === email)){
    errorBox.textContent = 'Користувач з таким email вже існує!';
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  successBox.textContent = 'Реєстрація пройшла успішно!';

  registerForm.reset();
  setTimeout(() => {
    registerModal.classList.remove('show');
    setTimeout(() => registerModal.style.display = 'none', 300);
    successBox.textContent = '';
  }, 2000);
});
