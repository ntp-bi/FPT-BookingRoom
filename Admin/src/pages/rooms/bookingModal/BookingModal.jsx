import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as api from "../../../api/ApiRoom";
import { getAllTeachers } from "../../../api/ApiTeacher";
import { getAllEvent } from "../../../api/ApiEvents";
import { format, isAfter } from "date-fns";

import "./booking-modal.scss";

Modal.setAppElement("#root");

const BookingModal = ({ isOpen, onRequestClose, roomId }) => {
    const [teachers, setTeachers] = useState([]);
    const [events, setEvents] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("");

    const [teacherError, setTeacherError] = useState(false);
    const [eventError, setEventError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const result = await getAllTeachers();
                setTeachers(result);
            } catch (error) {
                console.error(`Error fetching teachers: ${error.message}`);
            }
        };
        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const result = await getAllEvent();
                setEvents(result);
            } catch (error) {
                console.error(`Error fetching events: ${error.message}`);
            }
        };
        fetchEvents();
    }, []);

    const handleBooking = async () => {
        let error = false;

        const now = new Date();
        if (!isAfter(startDate, now)) {
            setStartDateError("Ngày đặt phải lớn hơn thời gian hiện tại.");
            error = true;
        } else if (startDate >= endDate) {
            setErrorMsg("Ngày trả phải lớn hơn ngày đặt.");
            error = true;
        } else {
            setErrorMsg("");
        }

        if (!selectedTeacher) {
            setTeacherError("Vui lòng chọn giảng viên.");
            error = true;
        } else {
            setTeacherError("");
        }

        if (!selectedEvent) {
            setEventError("Vui lòng chọn sự kiện.");
            error = true;
        } else {
            setEventError("");
        }

        if (error) return;

        const reserveTime = format(startDate, "yyyy-MM-dd HH:mm:ss");
        const endTime = format(endDate, "yyyy-MM-dd HH:mm:ss");

        try {
            // Kiểm tra xem phòng đã được đặt chưa
            const isRoomAvailable = await api.bookRoom(
                roomId,
                reserveTime,
                endTime
            );
            if (!isRoomAvailable) {
                setErrorMsg("Phòng đã được đặt trong khoảng thời gian này.");
                return;
            }

            const response = await api.bookRoom({
                roomId,
                userId: selectedTeacher,
                eventId: selectedEvent,
                reserveTime,
                endTime,
            });
            toast.success("Đặt phòng thành công!");
            onRequestClose();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Giáo viên chưa có tài khoản!");
            } else {
                toast.error("Đã xảy ra lỗi khi đặt phòng. Vui lòng thử lại sau.");
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Book Room"
            className="booking-modal"
        >
            <h2>ĐẶT PHÒNG</h2>
            <div className="form-group">
                <label>Ngày đặt:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setStartDateError("");
                    }}
                    showTimeSelect
                    dateFormat="Pp"
                />
                {startDateError && <span className="error">{startDateError}</span>}
            </div>
            <div className="form-group">
                <label>Ngày trả:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                        setEndDate(date);
                        setErrorMsg("");
                    }}
                    showTimeSelect
                    dateFormat="Pp"
                />
                {errorMsg && <span className="error">{errorMsg}</span>}
            </div>
            <div className="form-group">
                <label>
                    Giảng viên:<span className="check">*</span>
                </label>
                <select
                    value={selectedTeacher}
                    onChange={(e) => {
                        setSelectedTeacher(e.target.value);
                        setTeacherError("");
                    }}
                >
                    <option value="">Chọn giảng viên</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.fullName}
                        </option>
                    ))}
                </select>
                {teacherError && <span className="error">Vui lòng chọn giảng viên.</span>}
            </div>
            <div className="form-group">
                <label>
                    Sự kiện:<span className="check">*</span>
                </label>
                <select
                    value={selectedEvent}
                    onChange={(e) => {
                        setSelectedEvent(e.target.value);
                        setEventError("");
                    }}
                >
                    <option value="">Chọn sự kiện</option>
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.eventName}
                        </option>
                    ))}
                </select>
                {eventError && <span className="error">{eventError}</span>}
            </div>
            <button onClick={onRequestClose}>Trở về</button>
            <button onClick={handleBooking}>Đặt phòng</button>
        </Modal>
    );
};

export default BookingModal;
