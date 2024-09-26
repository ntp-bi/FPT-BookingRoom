import React, { useState } from "react";
import {
    Box,
    Fade,
    Modal,
    Typography,
    Button,
    Backdrop,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import "./modal-edit-profile.scss";

const ModalEditProfile = () => {
    const [open, setOpen] = useState(false);
    const [fullName, setFullName] = useState(""); 
    const [birthDate, setBirthDate] = useState(dayjs());
    const [gender, setGender] = useState(""); 
    const [avatar, setAvatar] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0]); 
    };

    return (
        <div className="modal-edit-profile">
            <Button
                variant="contained"
                className="profile__right__btn__edit"
                onClick={handleOpen}
            >
                Edit <EditIcon />
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
                            <h4>Chỉnh sửa thông tin cá nhân</h4>
                            <CloseIcon
                                onClick={handleClose}
                                className="btn--close"
                            />
                        </div>

                        <Typography id="transition-modal-description" component="div">
                            {/* Full Name */}
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="outlined-full-name"
                                    label="Full Name"
                                    variant="outlined"
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                />
                            </FormControl>

                            {/* Date of Birth */}
                            <FormControl fullWidth margin="normal">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Date of Birth"
                                        value={birthDate}
                                        onChange={(newValue) =>
                                            setBirthDate(newValue)
                                        }
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            {/* Gender */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="gender-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="select-gender"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                    <MenuItem value="Khác">Khác</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Avatar */}
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    type="file"
                                    label="Upload Avatar"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        accept: "image/*",
                                    }}
                                    onChange={handleAvatarChange}
                                />
                            </FormControl>

                            <div className="profile__btn">
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
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalEditProfile;
