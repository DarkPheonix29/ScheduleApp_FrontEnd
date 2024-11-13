import axios from 'axios';

const API_URL = '/api/events';

export const fetchEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the events!", error);
        return [];
    }
};

export const checkAvailability = async (instructorId, start, end) => {
    try {
        const response = await axios.get(`${API_URL}/check-availability`, {
            params: { instructorId, start, end }
        });
        return response.data; // Boolean indicating availability
    } catch (error) {
        console.error("Error checking availability:", error);
        return false;
    }
};

export const bookLesson = async (eventId, studentId) => {
    try {
        const response = await axios.post(`${API_URL}/book/${eventId}`, { studentId });
        return response.data;
    } catch (error) {
        console.error("Error booking lesson:", error);
        return null;
    }
};
