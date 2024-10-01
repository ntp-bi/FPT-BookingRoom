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

import { toast } from "react-toastify";
import { cancelSchedule, returnSchedule } from "../../api/schedule";

import "./data-table-schedule.scss";

const DataTableSchedule = ({ schedule }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [openCheckout, setOpenCheckout] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [roomToReturn, setRoomToReturn] = useState(null);

    const handleOpenUpdate = (room) => {
        setSelectedRoom(room);
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => setOpenUpdate(false);

    const handleOpenCheckout = (room) => {
        setRoomToReturn(room); 
        setOpenCheckout(true);
    };

    const handleCloseCheckout = () => {
        setOpenCheckout(false);
        setRoomToReturn(null);
    };

    const STATUS_SCHEDULE = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
    };

    const handleCancel = async (row) => {
        const confirmCancel = window.confirm(
            "Bạn có chắc chắn muốn hủy đặt phòng này không?"
        );

        if (confirmCancel) {
            const response = await cancelSchedule(row.id);

            if (response) {
                toast.success("Huỷ đặt phòng thành công!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("Huỷ đặt phòng thất bại!");
            }
        } else {
            toast.info("Huỷ đặt phòng đã bị hủy!");
        }
    };

    const handleReturn = async () => {
        if (roomToReturn) {
            const response = await returnSchedule(roomToReturn.id);

            if (response) {
                toast.success("Trả phòng thành công!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("Trả phòng thất bại!");
            }
        }
        handleCloseCheckout();
    };

    const rows =
        schedule?.length > 0
            ? schedule.map((item, index) => ({
                  stt: index + 1,
                  id: item.detailId,
                  roomName: item.roomName,
                  bookingTime: item.reserveTime,
                  returnTime: item.endTime,
                  status: STATUS_SCHEDULE[item.status],
              }))
            : [];

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
                        params.value === STATUS_SCHEDULE[2]
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
                        onClick={() => handleOpenUpdate(params.row)}
                    >
                        Cập nhật
                    </Button>
                    {params.row.status === STATUS_SCHEDULE[1] ? (
                        <Button
                            className="button--cancel"
                            variant="contained"
                            onClick={() => handleCancel(params.row)}
                        >
                            Huỷ
                        </Button>
                    ) : (
                        <Button
                            className="button--checkout"
                            variant="contained"
                            onClick={() => handleOpenCheckout(params.row)} 
                        >
                            Trả phòng
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.stt}
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
                selectedRoom={selectedRoom}
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
                <DialogActions className="dialog__btn">
                    <Button
                        variant="contained"
                        onClick={handleCloseCheckout}
                        className="dialog__btn__close"
                    >
                        Không
                    </Button>
                    <Button
                        className="dialog__btn__confirm"
                        variant="contained"
                        onClick={handleReturn} 
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
