import api from "./apiConfig";

export async function addAccount(userName, password, userId, roleId, roleName) {
    try {
        const token = localStorage.getItem("token");
        const accountData = {
            userName,
            password,
            userId,
            roleId,
            roleName,
        };
        console.log("Sending Account Data:", accountData); // Add this line

        const response = await api.post(
            "/account/add",
            accountData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding account:", error);
        throw new Error("Có lỗi xảy ra khi thêm tài khoản!");
    }
}

export async function getAllAccount() {
    try {
        const token = localStorage.getItem("token");
        const result = await api.get("/account/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data.data;
    } catch (error) {
        throw new Error("Error fetching Account");
    }
}

export async function deleteAccount(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.delete(`/account/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function updateAccount(account) {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(
            `/account/update/${account.id}`,
            {
                id: parseInt(account.id),
                userName: account.userName,
                password: account.password,
                fullName: account.fullName,
                userId: parseInt(account.userId),
                roleId: parseInt(account.roleId),
                roleName: account.roleName,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getAccountById(id) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/account/details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching account ${error.message}`);
    }
}

export async function getAllRole() {
    try {
        const token = localStorage.getItem("token");
        const result = await api.get("/role/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error("Error fetching role");
    }
}

export async function searchAccount(name) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`account/search?searchValue=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return []; 
        }
        throw new Error(`Error searching histories: ${error.message}`);
    }
}
