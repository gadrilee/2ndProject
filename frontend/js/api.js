const BASE_URL = 'http://localhost:3000/api';

async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error en el login');
        }
        return data;
    } catch (error) {
        throw error;
    }
}

async function logout() {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

async function register(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error al registrarse');
        }
        return data;
    } catch (error) {
        throw error;
    }
}
async function recoverPassword(email) {
    try {
        const response = await fetch(`${BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error al recuperar la contraseña');
        }
        return data;
    } catch (error) {
        throw error;
    }
}


export const api = {
    login,
    logout,
    register,
    recoverPassword
    
};
