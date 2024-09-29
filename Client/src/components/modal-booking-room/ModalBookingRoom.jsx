import React, { useState } from "react";
import { Box, Fade, Modal, Typography, Button, Backdrop } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { toast } from "react-toastify";
import { bookingRoom } from "../../api/rooms";

import CloseIcon from "@mui/icons-material/Close";

import "./modal-booking-room.scss";

const ModalBookingRoom = ({ roomId, status }) => {
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());

    const handleOpen = () => {
        if (status === 1) {
            toast.error("Phòng hiện đang sửa chữa, vui lòng chọn phòng khác.");
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (startTime && endTime) {
                const dataBookingRoom = {
                    roomId: roomId,
                    reservetime: startTime.toISOString(),
                    endtime: endTime.toISOString(),
                };

                const response = await bookingRoom(dataBookingRoom);
                handleClose();
                toast.success("Phòng đã được đặt thành công! Chờ xác nhận.");
               
                return response;
            } else if (!startTime || !endTime) {
                toast.warning("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
            }
        } catch (error) {
            toast.error("Đặt phòng thất bại!");
        }
    };

    const handleChangeStartTime = (newValue) => {
        const currentDay = dayjs();

        if (newValue && newValue.isBefore(currentDay)) {
            toast.error("Ngày đặt không thể là ngày trong quá khứ.");
            setStartTime(dayjs(""));
            return;
        }
        setStartTime(newValue);
    };

    const handleChangeEndTime = (newValue) => {
        if (newValue < startTime && newValue.isBefore(startTime)) {
            toast.error("Ngày trả phải sau ngày đặt.");
            setEndTime(dayjs(""));
            return;
        }
        setEndTime(newValue);
    };

    return (
        <div className="modal-booking-room">
            <Button
                variant="contained"
                className="btn btn--book"
                onClick={handleOpen}
            >
                Đặt phòng
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                    <Box className="modal-booking-room__content">
                        <div className="modal-booking-room__content__header">
                            <h4>Đặt phòng</h4>
                            <CloseIcon
                                onClick={handleClose}
                                className="btn--close"
                            />
                        </div>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    "DateTimePicker",
                                    "DateTimePicker",
                                ]}
                            >
                                <div className="modal-booking-room__datetimepickers">
                                    <DateTimePicker
                                        label="Ngày đặt phòng"
                                        value={startTime}
                                        onChange={handleChangeStartTime}
                                        className="datetimepicker"
                                    />

                                    <DateTimePicker
                                        label="Ngày trả phòng"
                                        value={endTime}
                                        onChange={handleChangeEndTime}
                                        className="datetimepicker"
                                    />
                                </div>
                            </DemoContainer>
                            <div className="modal-booking-room__content__btn">
                                <Button
                                    variant="contained"
                                    className="btn--back"
                                    onClick={handleClose}
                                >
                                    <span>Huỷ</span>
                                </Button>
                                <Button
                                    variant="contained"
                                    className="btn--book"
                                    onClick={handleSubmit}
                                >
                                    <span>Đặt phòng</span>
                                </Button>
                            </div>
                        </LocalizationProvider>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalBookingRoom;
