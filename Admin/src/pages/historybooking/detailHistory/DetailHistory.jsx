import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import * as api from "../../../api/ApiHistories";
import { baseIMG } from "../../../api/apiConfig";

import "./detail-history.scss";

const DetailHistory = () => {
    const { historyId } = useParams();
    const [histories, setHistories] = useState([]);
    const [isDeleteBtnVisible, setDeleteBtnVisible] = useState(true);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const STATUS_LABELS = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Trả phòng",
        4: "Đã hủy",
        5: "Từ chối",
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyData = await api.getHistoryById(historyId);
                setHistories(historyData);
                setStatus(historyData.status); // Cập nhật trạng thái từ dữ liệu API

                if (
                    historyData.status === 1 ||
                    historyData.status === 2 ||
                    historyData.status === 3
                ) {
                    setDeleteBtnVisible(false);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, [historyId]);

    // Hàm xử lý xóa sự kiện
    const handleDelete = async (historyId) => {        
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa lịch sử đặt phòng này không?"
        );
        if (confirmed) {
            try {
                const result = await api.deleteHistory(historyId); // Gọi API xóa lịch sử đặt phòng
                if (result) {                    
                    toast.success(`Lịch sử đặt đã được xóa thành công!`);
                    navigate("/histories");
                } else {                   
                    toast.error(`Có lỗi khi xóa lịch sử đặt phòng.`);
                }
            } catch (error) {
                toast.error(`Có lỗi: ${error.message}`);
            }
        }
        setTimeout(() => {
            toast.dismiss();
        }, 3000);
    };

    return (
        <div className="detailHitory">
            <Sidebar />
            <div className="detailContainer">
                <Navbar />
                <div className="top">
                    <span className="title">Xem chi tiết lịch sử đặt và hủy phòng</span>
                </div>
                {histories && (
                    <div className="bottom">
                        <div className="historry-action">
                            {isDeleteBtnVisible &&
                                status !== 1 &&
                                status !== 2 &&
                                status !== 3 && (
                                    <button
                                        className="deleteBtn btn"
                                        onClick={() => handleDelete(histories.id)}
                                    >
                                        Xóa
                                    </button>
                                )}

                            <Link to="/histories" style={{ textDecoration: "none" }}>
                                <button className="backBtn">Quay lại</button>
                            </Link>
                        </div>
                        <form>
                            <div className="left">
                                <img src={`${baseIMG}/${histories.photo}`} alt="" />
                            </div>
                            <div className="right">
                                <div className="formInput">
                                    <label>
                                        <span>Họ tên:</span>
                                        <span className="info name">
                                            {histories.fullName}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Số lượng chỗ ngồi:
                                        <span className="info name-room">
                                            {histories.countOfSeats}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Giới tính:
                                        <span className="info name">
                                            {histories.gender}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Trạng thái:
                                        <span className="info status">
                                            {STATUS_LABELS[histories.status]}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Ngày sinh:
                                        <span className="info name">
                                            {histories.birthDay}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Tên sự kiện:
                                        <span className="info">
                                            {histories.eventName}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Tên phòng:
                                        <span className="info name-room">
                                            {histories.roomName}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Thời gian đặt phòng:
                                        <span className="info time-reserve">
                                            {histories.reserveTime}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label htmlFor="">
                                        Loại phòng:
                                        <span className="info type-room">
                                            {histories.typeName}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Thời gian trả phòng:
                                        <span className="info time-return">
                                            {histories.returnTime}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Diện tích phòng:
                                        <span className="info name-room">
                                            {histories.area}
                                        </span>
                                    </label>
                                </div>

                                <div className="formInput">
                                    <label>
                                        Thời gian kết thúc:
                                        <span className="info time-end">
                                            {histories.endTime}
                                        </span>
                                    </label>
                                </div>
                                <div className="formInput">
                                    <label>
                                        Mô tả:
                                        <span className="info status">
                                            {histories.description}
                                        </span>
                                    </label>
                                </div>
                                <div className="formInput">
                                    <label>
                                        Thời gian chấp nhận:
                                        <span className="info time-end">
                                            {histories.acceptTime}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailHistory;
