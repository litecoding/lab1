document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        password: document.getElementById('password')
    };
    const errorElements = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError')
    };

    /**
     * Перевірка чи поле не порожнє (після trim)
     */
    function isEmpty(value) {
        return !value || value.trim().length === 0;
    }

    /**
     * Перевірка формату електронної пошти
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Показує помилку для поля
     */
    function showError(fieldName, message) {
        fields[fieldName].classList.add('error');
        errorElements[fieldName].textContent = message;
    }

    /**
     * Приховує помилку для поля
     */
    function clearError(fieldName) {
        fields[fieldName].classList.remove('error');
        errorElements[fieldName].textContent = '';
    }

    /**
     * Валідація всіх полів форми
     * @returns {boolean} true якщо всі поля валідні
     */
    function validateForm() {
        let isValid = true;

        // Ім'я
        if (isEmpty(fields.firstName.value)) {
            showError('firstName', 'Введіть ваше ім\'я');
            isValid = false;
        } else {
            clearError('firstName');
        }

        // Прізвище
        if (isEmpty(fields.lastName.value)) {
            showError('lastName', 'Введіть ваше прізвище');
            isValid = false;
        } else {
            clearError('lastName');
        }

        // Електронна пошта
        const emailValue = fields.email.value.trim();
        if (isEmpty(emailValue)) {
            showError('email', 'Введіть електронну пошту');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError('email', 'Введіть коректну адресу електронної пошти');
            isValid = false;
        } else {
            clearError('email');
        }

        // Пароль
        if (isEmpty(fields.password.value)) {
            showError('password', 'Введіть пароль');
            isValid = false;
        } else {
            clearError('password');
        }

        return isValid;
    }

    /**
     * Очищення помилок при введенні
     */
    Object.keys(fields).forEach(function (fieldName) {
        fields[fieldName].addEventListener('input', function () {
            clearError(fieldName);
        });
    });

    /**
     * Обробка відправки форми
     */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            alert('Форму успішно відправлено! Реєстрація завершена.');
            form.reset();
            Object.keys(fields).forEach(function (fieldName) {
                clearError(fieldName);
            });
        }
    });
});
