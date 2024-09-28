import api from "./apiConfig";

export const getAllRoomType = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("roomtypes/list", {
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
