import React, { useState } from "react";
import { Box, Fade, Modal, Typography, Button, Backdrop, TextField } from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import CloseIcon from "@mui/icons-material/Close";

import "./modal-update-booking-room.scss";

const ModalUpdateBookingRoom = ({ open, handleOpen, handleClose }) => {
    const [value, setValue] = useState(dayjs("2022-04-17T15:30"));

    return (
        <div className="modal-update-booking-room">
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
                    <Box className="modal-update-booking-room__content">
                        <div className="modal-update-booking-room__content__header">
                            <h4>Cập nhật thông tin đặt phòng</h4>
                            <CloseIcon
                                onClick={handleClose}
                                className="btn--close"
                            />
                        </div>

                        <Typography id="transition-modal-description">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        "DateTimePicker",
                                        "DateTimePicker",
                                    ]}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Tên phòng"
                                        variant="outlined"
                                    />
                                    <DateTimePicker
                                        label="Ngày đặt phòng"
                                        value={value}
                                        onChange={(newValue) =>
                                            setValue(newValue)
                                        }
                                        className="datetimepicker"
                                    />

                                    <DateTimePicker
                                        label="Ngày trả phòng"
                                        value={value}
                                        onChange={(newValue) =>
                                            setValue(newValue)
                                        }
                                        className="datetimepicker"
                                    />
                                </DemoContainer>
                                <div className="modal-update-booking-room__content__btn">
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
                                    >
                                        <span>Cập nhật</span>
                                    </Button>
                                </div>
                            </LocalizationProvider>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalUpdateBookingRoom;
