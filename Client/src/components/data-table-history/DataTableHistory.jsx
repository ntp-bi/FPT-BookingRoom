import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import "./data-table-history.scss";

const DataTableHistory = ({ history }) => {
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

    const rows =
        history?.length > 0
            ? history.map((item, index) => ({
                  stt: index + 1,
                  id: item.id,
                  roomName: item.roomName,
                  bookingTime: item.reserveTime,
                  returnTime: item.endTime,
                  status: STATUS_HISTORY[item.status],
              }))
            : [];

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
