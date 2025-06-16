document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelectorAll('.nav-link');

    // Эффект прокрутки к секции при клике на ссылку
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - navbar.offsetHeight, // Учитываем высоту панели
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const responseMsg = document.getElementById('form-response');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.text())
        .then(msg => {
          responseMsg.textContent = msg;
          form.reset();
        })
        .catch(err => {
          responseMsg.textContent = 'Ошибка при отправке. Попробуйте позже.';
        });
    });
  }
});
