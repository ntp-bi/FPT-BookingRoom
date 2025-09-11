// DetailRoom.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import * as api from "../../../api/ApiRoom";
import { baseIMG } from "../../../api/apiConfig";
import BookingModal from "../bookingModal/BookingModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import "./detail-room.scss";

const DetailRoom = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState([]);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [historyBooking, setHistoryBooking] = useState([]);

    const STATUS_LABELS = {
        1: "Bị hỏng hoặc bảo trì",
        2: "Có thể sử dụng",
    };

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await api.getRoomById(roomId);
                setRoom(roomData);
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };

        fetchRoom();
    }, [roomId]);

    const handleOpenBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    return (
        <div className="detail">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span>Xem chi tiết thông tin phòng</span>
                </div>
                <div className="bottom">
                    {room && (
                        <>
                            <div className="left">
                                <div className="image">
                                    <img
                                        src={`${baseIMG}/${room.image}`}
                                        alt=""
                                        className="image"
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <form>
                                    <div className="formInput">
                                        <label>
                                            Tên phòng:
                                            <span className="info name-room">
                                                {room.roomName}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Loại phòng:
                                            <span className="info type-room">
                                                {room.typeName}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Trạng thái:
                                            <span className="info type-room">
                                                {STATUS_LABELS[room.status]}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Diện tích:
                                            <span className="info area">
                                                {room.area}m2
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            Số lượng chỗ ngồi:
                                            <span className="info count-seat">
                                                {room.countOfSeats}
                                            </span>
                                        </label>
                                    </div>
                                    <div className="formInput">
                                        <label>
                                            <span className="desc">Mô tả:</span>
                                            <span className="info description">
                                                {room.description}
                                            </span>
                                        </label>
                                    </div>
                                </form>
                                <div className="btn-action">
                                    <button
                                        onClick={handleOpenBookingModal}
                                        className="book"
                                    >
                                        Đặt phòng
                                    </button>
                                    <Link to="/rooms">
                                        <button className="back">Trở về</button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <BookingModal
                isOpen={isBookingModalOpen}
                onRequestClose={handleCloseBookingModal}
                roomId={roomId}
            />

            {/* <TableContainer component={Paper} className="tablecontainer">
                {filteredRows.length === 0 && (
                    <div className="no-data-message">Không tìm thấy kết quả tìm kiếm</div>
                )}
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {filteredRows.length > 0 && (
                        <TableHead>
                            <TableRow>
                                <TableCell className="tableCell tabble-header">
                                    STT
                                </TableCell>
                                <TableCell className="tableCell tabble-header">
                                    Tên loại phòng
                                </TableCell>
                                <TableCell
                                    className="tableCell tabble-header"
                                    colSpan={2}
                                    align="center"
                                >
                                    Thao tác
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {filteredRows
                            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                            .map((type, index) => (
                                <TableRow key={type.id}>
                                    <TableCell className="tableCell id-type">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="tableCell name-type">
                                        {type.typeName}
                                    </TableCell>
                                    <TableCell className="tableCell btn-action">
                                        <button
                                            className="deleteBtn btn"
                                            onClick={() => handleDelete(type.id)}
                                        >
                                            Xóa
                                        </button>
                                        <Link
                                            to={`/types/update-type/${type.id}`}
                                            className="btn"
                                        >
                                            <button className="updateBtn">
                                                Cập nhật
                                            </button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </div>
    );
};

export default DetailRoom;
