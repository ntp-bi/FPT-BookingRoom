import api from "./apiConfig";

export async function getAllHistory() {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get("/admin/BookingHistory/Search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error("Error fetching history");
    }
}

export async function deleteHistory(historyId) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.delete(`/admin/BookingHistory/Delete/${historyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Có lỗi ${error.message}`);
    }
}

export async function getHistoryById(historyId) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/admin/BookingHistory/Detail/${historyId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data;
    } catch (error) {
        throw new Error(`Error fetching history ${error.message}`);
    }
}

export async function searchHistories(name) {
    try {
        const token = localStorage.getItem("token");

        const result = await api.get(`/admin/BookingHistory/Search?key=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data.data || [];
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return []; 
        } else {
            console.error(`Error searching histories: ${error.message}`);
            return [];
        }
    }
}


