import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');


    logoutBtn.addEventListener('click', async () => {
        try {
            logoutBtn.disabled = true;
            logoutBtn.textContent = 'Cerrando sesión...';

            await api.logout();
            
            localStorage.removeItem('token');
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error(error);
            alert('Error al cerrar sesión');
            logoutBtn.disabled = false;
            logoutBtn.textContent = 'Logout';
        }
    });
});
