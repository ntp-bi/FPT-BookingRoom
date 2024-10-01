import React, { useState, useEffect } from "react";
import {
    Box,
    Fade,
    Modal,
    Typography,
    Button,
    Backdrop,
    TextField,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import CloseIcon from "@mui/icons-material/Close";

import { toast } from "react-toastify";

import "./modal-update-booking-room.scss";

const ModalUpdateBookingRoom = ({ open, selectedRoom, handleClose }) => {
    const [roomName, setRoomName] = useState("");
    const [reserveTime, setReserveTime] = useState(dayjs());
    const [returnTime, setReturnTime] = useState(dayjs());

    useEffect(() => {
        if (selectedRoom) {
            setRoomName(selectedRoom.roomName);
            setReserveTime(dayjs(selectedRoom.bookingTime));
            setReturnTime(dayjs(selectedRoom.returnTime));
        }
    }, [selectedRoom]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (reserveTime && returnTime) {
                const dataUpdateBookingRoom = {
                    id: selectedRoom.id,
                    roomName,
                    reserveTime,
                    returnTime,
                };

                const response = await updateSchedule(dataUpdateBookingRoom);

                if (response) {
                    toast.success("Cập nhật thành công!");
                    handleClose();
                }
                return response;
            } else if (!reserveTime || !returnTime) {
                toast.warning("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
            }
        } catch (error) {
            toast.error("Cập nhật thất bại!");
            handleClose();
        }
    };

    const handleChangeRoomName = (e) => {
        setRoomName(e.target.value);
    };

    const handleChangeReserveTime = (newValue) => {
        const currentDay = dayjs();

        if (newValue && newValue.isBefore(currentDay)) {
            toast.error("Ngày đặt không thể là ngày trong quá khứ.");
            setReserveTime(dayjs(""));
            return;
        }
        setReserveTime(newValue);
    };

    const handleChangeReturnTime = (newValue) => {
        if (newValue.isBefore(reserveTime)) {
            toast.error("Ngày trả phải sau ngày đặt.");
            setReturnTime(dayjs(""));
            return;
        }
        setReturnTime(newValue);
    };

    return (
        <div className="modal-update-booking-room">
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className="modal-update-booking-room__content">
                        <div className="modal-update-booking-room__content__header">
                            <h4>Cập nhật thông tin đặt phòng</h4>
                            <CloseIcon
                                onClick={handleClose}
                                className="btn--close"
                            />
                        </div>
                        <Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TextField
                                    label="Tên phòng"
                                    value={roomName}
                                    onChange={handleChangeRoomName}
                                    variant="outlined"
                                    fullWidth
                                />
                                <DateTimePicker
                                    label="Ngày đặt phòng"
                                    value={reserveTime}
                                    onChange={handleChangeReserveTime}
                                    className="datetimepicker"
                                />
                                <DateTimePicker
                                    label="Ngày trả phòng"
                                    value={returnTime}
                                    onChange={handleChangeReturnTime}
                                    className="datetimepicker"
                                />
                            </LocalizationProvider>
                            <div className="modal-update-booking-room__content__btn">
                                <Button
                                    variant="contained"
                                    className="btn--back"
                                    onClick={handleClose}
                                >
                                    Huỷ
                                </Button>
                                <Button
                                    variant="contained"
                                    className="btn--book"
                                    onClick={handleSubmit}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalUpdateBookingRoom;
