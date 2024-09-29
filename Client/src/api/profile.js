import api from "./apiConfig";

export const profile = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("users/details", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const updateProfile = async (id, user) => {
    try {
        const token = localStorage.getItem("token");

        const formData = new FormData();

        if (user.photo) {
            formData.append("file", user.photo);
        }
        formData.append("fullName", user.fullName);
        formData.append("birthDay", user.birthDay);
        formData.append("gender", user.gender);

        const response = await api.put(`users/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.log("Error: " + error);
    }
};
