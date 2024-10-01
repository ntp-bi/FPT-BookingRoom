import api from "./apiConfig";

export const getAllHistory = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("teacher/BookingHistory", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const searchHistory = async (key) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("teacher/BookingHistory/Search", {
            params: {
                key,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};
