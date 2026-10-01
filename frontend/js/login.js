import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    if (localStorage.getItem('token')) {
        window.location.href = 'dashboard.html';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showError('Por favor ingresa email y contraseña');
            return;
        }

        try {
            const btn = loginForm.querySelector('.btn-login');
            btn.disabled = true;
            btn.textContent = 'Cargando...';

            const response = await api.login(email, password);
            
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            window.location.href = 'dashboard.html';

        } catch (error) {
            showError(error.message);
        } finally {
            const btn = loginForm.querySelector('.btn-login');
            btn.disabled = false;
            btn.textContent = 'Login';
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
});
