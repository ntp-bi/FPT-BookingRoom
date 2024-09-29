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

import { toast } from "react-toastify";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { updateProfile } from "../../api/profile";
import { configPath } from "../../config/configPath";

import "./modal-edit-profile.scss";

const ModalEditProfile = ({ profiles, setProfiles }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        setProfiles((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfiles((prev) => ({ ...prev, photo: file }));
    };

    const handleDOBChange = (newValue) => {
        setProfiles((prev) => ({ ...prev, birthDay: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const update = {
                fullName: profiles.fullName,
                birthDay:
                    profiles.birthDay && dayjs(profiles.birthDay).isValid()
                        ? dayjs(profiles.birthDay).format("YYYY-MM-DD")
                        : null,
                gender: profiles.gender,
                photo: profiles.photo,
            };

            const response = await updateProfile(profiles.id, update);
            setProfiles(response);

            handleClose();
            toast.success("Cập nhật profile thành công!");

            setTimeout(() => {
                window.location.href = `${configPath.profile}`;
            }, 1500);
        } catch (error) {
            toast.error("Cập nhật profile thất bại!");
            console.error(error);
        }
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

                        <Typography
                            id="transition-modal-description"
                            component="div"
                        >
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    value={profiles?.fullName || ""}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Date of Birth"
                                        value={
                                            profiles?.birthDay &&
                                            dayjs(profiles.birthDay).isValid()
                                                ? dayjs(profiles.birthDay)
                                                : null
                                        }
                                        onChange={handleDOBChange}
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="gender-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    value={profiles?.gender}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={true}>Male</MenuItem>
                                    <MenuItem value={false}>Female</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField
                                    type="file"
                                    label="Upload Avatar"
                                    onChange={handleFileChange}
                                    name="photo"
                                    id="photo"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        accept: "image/*",
                                    }}
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
                                    onClick={handleSubmit}
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
