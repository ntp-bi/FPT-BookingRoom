import api from "./apiConfig";

export const getAllRoom = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("room/both/getallroom", {
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
