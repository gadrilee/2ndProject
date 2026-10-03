import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        window.location.href = 'dashboard.html';
        return;
    }

    const recoverForm = document.getElementById('recoverForm');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('errorMessage');

    recoverForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();

        if (!email) {
            showError('Por favor ingresa tu correo');
            return;
        }

        try {
            const btn = recoverForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Enviando...';

            await api.recoverPassword(email);
            
            alert('Instrucciones enviadas a tu correo.');
            window.location.href = 'index.html';

        } catch (error) {
            showError(error.message);
        } finally {
            const btn = recoverForm.querySelector('button[type="submit"]');
            btn.disabled = false;
            btn.textContent = 'Recuperar';
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
