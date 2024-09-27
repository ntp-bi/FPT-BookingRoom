import api from "./apiConfig";

const changePassword = async (credentials) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.post("account/changePassword", credentials, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.log("Error: " + error);
    }
};

export default changePassword;
