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

export const bookingRoom = async (roomId, reservetime, endtime) => {
    try {
        const token = localStorage.getItem("token");

        const response = api.post(
            "detail/both/bookingroom",
            {},
            {
                params: {
                    roomId,
                    reservetime,
                    endtime,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};
