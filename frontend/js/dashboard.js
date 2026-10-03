import { api } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token')) {
        window.location.href = 'index.html';
        return;
    }

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
            logoutBtn.textContent = 'Cerrar Sesion';
        }
    });

    const itemForm = document.getElementById('itemForm');
    const itemsTableBody = document.getElementById('itemsTableBody');

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const itemName = document.getElementById('itemName').value.trim();
        const itemType = document.getElementById('itemType').value.trim();
        const itemStatus = document.getElementById('itemStatus').value;
        const itemAvailable = document.getElementById('itemAvailable').checked;

        if (itemName && itemType) {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = itemName;
            
            const typeCell = document.createElement('td');
            typeCell.textContent = itemType;
            
            const statusCell = document.createElement('td');
            statusCell.textContent = itemStatus;
            
            const availableCell = document.createElement('td');
            availableCell.textContent = itemAvailable ? 'Sí' : 'No';
            
            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(statusCell);
            row.appendChild(availableCell);
            
            itemsTableBody.appendChild(row);

            itemForm.reset();
        }
    });
});
