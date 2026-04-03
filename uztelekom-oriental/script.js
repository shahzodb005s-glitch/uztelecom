document.addEventListener('DOMContentLoaded', () => {
    // 1. Плавный скролл для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Переключатель тарифов (Месяц/Год)
    const pricingToggle = document.querySelector('.switch input');
    const prices = document.querySelectorAll('.price-value');
    const priceData = {
        monthly: ['200 000', '360 000', '460 000'],
        yearly: ['160 000', '288 000', '368 000'] // Скидка 20%
    };

    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            prices.forEach((price, index) => {
                const targetPrice = pricingToggle.checked ? priceData.yearly[index] : priceData.monthly[index];
                
                // Простая анимация смены цифр
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = targetPrice;
                    price.style.opacity = '1';
                }, 200);
            });
        });
    }

    // 3. Аккордеоны (FAQ)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Закрываем все остальные (эффект "только один открыт")
            accordionItems.forEach(i => i.classList.remove('active'));
            
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // 4. Валидация формы
    const mainForm = document.querySelector('.form');
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = mainForm.querySelector('input[type="email"]').value;
            const phone = mainForm.querySelector('input[type="tel"]').value;
            const checkbox = mainForm.querySelector('input[type="checkbox"]').checked;

            if (!checkbox) {
                alert("Iltimos, oferta shartlariga rozilik bildiring.");
                return;
            }

            // Имитация отправки
            const btn = mainForm.querySelector('.form__button');
            const originalText = btn.textContent;
            btn.textContent = "Yuborilmoqda...";
            btn.disabled = true;

            setTimeout(() => {
                alert("Rahmat! Arizangiz muvaffaqiyatli yuborildi.");
                btn.textContent = originalText;
                btn.disabled = false;
                mainForm.reset();
            }, 1500);
        });
    }
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});