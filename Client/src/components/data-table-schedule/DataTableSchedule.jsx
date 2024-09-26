import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdateBookingRoom from "../modal-update-booking-room/ModalUpdateBookingRoom";

import "./data-table-schedule.scss";

const DataTableSchedule = () => {
    const [openCheckout, setOpenCheckout] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);

    const handleOpenCheckout = () => {
        setOpenCheckout(true);
    };

    const handleCloseCheckout = () => {
        setOpenCheckout(false);
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
            status: "Chờ xác nhận",
        },
        {
            id: 4,
            stt: 4,
            roomName: "Phòng 104",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Đã xác nhận",
        },
        {
            id: 5,
            stt: 5,
            roomName: "Phòng 105",
            bookingTime: "2024-09-24 11:00",
            returnTime: "2024-09-24 13:00",
            status: "Chờ xác nhận",
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
        { field: "stt", headerName: "STT", width: 50 },
        { field: "roomName", headerName: "Tên phòng", width: 300 },
        { field: "bookingTime", headerName: "Thời gian đặt", width: 200 },
        { field: "returnTime", headerName: "Thời gian trả", width: 200 },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 150,
            renderCell: (params) => (
                <span
                    className={`status-label ${
                        params.value === "Đã xác nhận"
                            ? "status--confirmed"
                            : "status--pending"
                    }`}
                >
                    {params.value}
                </span>
            ),
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 300,
            renderCell: (params) => (
                <div>
                    <Button
                        className="button--detail"
                        variant="contained"
                        onClick={() => handleDetail(params.row)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        className="button--edit"
                        variant="contained"
                        onClick={handleOpenUpdate}
                    >
                        Cập nhật
                    </Button>
                    <Button
                        className="button--checkout"
                        variant="contained"
                        onClick={handleOpenCheckout}
                    >
                        Trả phòng
                    </Button>
                </div>
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
                className="data-table-schedule"
            />

            {/* Modal for Updating Booking Room */}
            <ModalUpdateBookingRoom
                open={openUpdate}
                handleOpen={handleOpenUpdate}
                handleClose={handleCloseUpdate}
            />

            {/* Dialog for Checkout */}
            <Dialog
                open={openCheckout}
                onClose={handleCloseCheckout}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn trả phòng này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseCheckout}>
                        Không
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCloseCheckout}
                        autoFocus
                    >
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DataTableSchedule;
