/**
 * API Integration Layer
 * =====================
 * This file centralizes all fetch requests for easy backend integration (e.g., Django).
 * Components should import functions from here instead of calling fetch() directly.
 */

// Replace with your Django backend URL or keep relative for proxy
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Reusable fetch wrapper with error handling and JSON parsing
 */
const fetchWrapper = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        // Add Authorization token here if needed:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    const config = {
        method: options.method || 'GET',
        headers: { ...defaultHeaders, ...options.headers },
        ...options
    };

    if (config.body && typeof config.body !== 'string') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(`${baseURL}${endpoint}`, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${response.status}`);
        }
        // Return null or parse JSON depending on content type (e.g. 204 No Content)
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw error;
    }
};

// ==========================================
// API Endpoints
// ==========================================

// --- Cycle Endpoints ---
export const getCycleHistory = async (months = 6) => {
    return fetchWrapper(`/cycle/history/?months=${months}`);
};

export const getCurrentCycle = async () => {
    return fetchWrapper('/cycle/current/');
};

export const logCycleStart = async (data) => {
    return fetchWrapper('/cycle/start/', {
        method: 'POST',
        body: data,
    });
};

export const updateCycle = async (id, data) => {
    return fetchWrapper(`/cycle/${id}/`, {
        method: 'PUT',
        body: data,
    });
};

export const deleteCycle = async (id) => {
    return fetchWrapper(`/cycle/${id}/`, {
        method: 'DELETE',
    });
};

// --- Mood/Symptom Endpoints ---
export const logMood = async (data) => {
    return fetchWrapper('/logs/mood/', {
        method: 'POST',
        body: data,
    });
};

export const getDailyLogs = async (date) => {
    return fetchWrapper(`/logs/daily/?date=${date}`);
};
