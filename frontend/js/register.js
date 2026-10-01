import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!name || !email || !password) {
            showError('Por favor completa todos los campos');
            return;
        }

        try {
            const btn = registerForm.querySelector('.btn-login');
            btn.disabled = true;
            btn.textContent = 'Registrando...';

            await api.register(name, email, password);
            
            alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
            window.location.href = 'index.html';

        } catch (error) {
            showError(error.message);
        } finally {
            const btn = registerForm.querySelector('.btn-login');
            btn.disabled = false;
            btn.textContent = 'Registrarse';
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
