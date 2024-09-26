import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import "./data-table-history.scss";

const DataTableHistory = () => {
    const STATUS_HISTORY = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Hoàn thành",
        4: "Đã hủy",
        5: "Từ chối",
    };

    const getStatusHistory = (status) => {
        switch (status) {
            case STATUS_HISTORY[1]:
                return "status--pending";
            case STATUS_HISTORY[2]:
                return "status--confirmed";
            case STATUS_HISTORY[3]:
                return "status--completed";
            case STATUS_HISTORY[4]:
                return "status--canceled";
            case STATUS_HISTORY[5]:
                return "status--rejected";
            default:
                return "";
        }
    };

    const rows = [
        {
            id: 1,
            stt: 1,
            roomName: "Phòng 101",
            bookingTime: "2024-09-24 10:00",
            returnTime: "2024-09-24 12:00",
            status: "Chờ xác nhận",
        },
        {
            id: 2,
            stt: 2,
            roomName: "Phòng 102",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Đã xác nhận",
        },
        {
            id: 3,
            stt: 3,
            roomName: "Phòng 103",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Hoàn thành",
        },
        {
            id: 4,
            stt: 4,
            roomName: "Phòng 104",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Đã hủy",
        },
        {
            id: 5,
            stt: 5,
            roomName: "Phòng 105",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Từ chối",
        },
        {
            id: 6,
            stt: 6,
            roomName: "Phòng 106",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Đã xác nhận",
        },
    ];

    const columns = [
        { field: "stt", headerName: "STT", width: 100 },
        { field: "roomName", headerName: "Tên phòng", width: 400 },
        { field: "bookingTime", headerName: "Thời gian đặt", width: 250 },
        { field: "returnTime", headerName: "Thời gian trả", width: 250 },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 200,
            renderCell: (params) => (
                <span
                    className={`status-label ${getStatusHistory(params.value)}`}
                >
                    {params.value}
                </span>
            ),
        },
    ];

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                className="data-table-history"
            />
        </Box>
    );
};

export default DataTableHistory;
