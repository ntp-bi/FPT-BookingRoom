import api from "./apiConfig";

export const getAllRoom = async (page) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(`room/both/getallroom?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const getRoomById = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(`room/both/getroom/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};
