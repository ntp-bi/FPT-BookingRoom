import api from "./apiConfig";

export const getAllSchedule = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("detail/teacher/calendarbooking", {
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

export const searchSchedule = async (roomname) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get("detail/both/searchdetail", {
            params: {
                roomname,
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

export const updateSchedule = async (
    id,
    roomid,
    eventid,
    reservetime,
    endtime,
    returntime
) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(
            `detail/both/updatebookingroomwhenwaitingaccept`,
            {
                id,
                roomid,
                eventid,
                reservetime,
                endtime,
                returntime,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const cancelSchedule = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(
            `detail/teacher/cancelbookingroom/${id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200 || response.data.data === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error: " + error);
        return false;
    }
};

export const returnSchedule = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.put(
            `detail/teacher/returnroom/${id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200 || response.data.data === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error: " + error);
        return false;
    }
};
