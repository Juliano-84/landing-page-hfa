// Toggle do menu mobile
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#navMenu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Fecha o menu ao clicar em um link (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Ano automático no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Efeito de "deslizar" (IntersectionObserver) — não aplica em #home e #contato
const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target); // anima apenas uma vez
      }
    });
  }, { threshold: 0.25 });

  reveals.forEach(el => io.observe(el));
} else {
  // Fallback
  reveals.forEach(el => el.classList.add('is-visible'));
}

// Inicializar Swiper para os clientes
const swiper = new Swiper('.swiper', {
  slidesPerView: 4,       // quantos logos aparecem ao mesmo tempo
  spaceBetween: 50,       // espaçamento entre eles
  loop: true,             // looping infinito
  autoplay: {
    delay: 3000,          // tempo entre slides (ms)
    disableOnInteraction: false,
  },
  pagination: {
    //el: '.swiper-pagination',
    //clickable: true,
    //comentei para deixar o carrossel mais limpo
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    900: { slidesPerView: 4 },
    600: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  }
});


// Validação simples do formulário + simulação de envio
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Limpa mensagens
    form.querySelectorAll('.form__error').forEach(el => (el.textContent = ''));

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const telefone = form.telefone.value.trim();
    const mensagem = form.mensagem.value.trim();

    let ok = true;

    if (!nome) {
      ok = false;
      form.querySelector('#nome + .form__error').textContent = 'Informe seu nome.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ok = false;
      form.querySelector('#email + .form__error').textContent = 'E-mail inválido.';
    }
    if (!mensagem) {
      ok = false;
      form.querySelector('#mensagem + .form__error').textContent = 'Escreva uma mensagem.';
    }

    if (!ok) return;

    // Aqui você integra com seu backend/serviço de e-mail (fetch/POST).
    // Por enquanto, apenas simula sucesso.
    alert('Obrigado! Sua mensagem foi enviada com sucesso.');
    form.reset();
  });
}


