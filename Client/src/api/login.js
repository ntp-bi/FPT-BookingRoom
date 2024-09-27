import api from "../api/apiConfig";

const login = async (credentials) => {
    const response = await api.post("account/login", credentials, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    return response.data;
};

export default login;
