import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchReportsByDate, exportExcelByYear } from "../../../api/ApiReport";
import { baseIMG } from "../../../api/apiConfig";
import "./main-report.scss";

const Report = () => {
    const [reports, setReports] = useState([]);
    const [mostBookedRooms, setMostBookedRooms] = useState([]);
    const [leastBookedRooms, setLeastBookedRooms] = useState([]);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const savedData = localStorage.getItem("reportData");

        if (savedData) {
            const {
                reports,
                mostBookedRooms,
                leastBookedRooms,
                selectedDay,
                selectedMonth,
                selectedYear,
            } = JSON.parse(savedData);

            setReports(reports);
            setMostBookedRooms(mostBookedRooms);
            setLeastBookedRooms(leastBookedRooms);

            setSelectedDay(selectedDay);
            setSelectedMonth(selectedMonth);
            setSelectedYear(selectedYear);
        }
    }, []);

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const futureYears = 10;
    const years = Array.from(
        { length: currentYear - startYear + 1 + futureYears },
        (_, index) => startYear + index
    );

    const handleStatistics = async () => {
        if (!selectedYear) {
            alert("Vui lòng chọn thông tin trước khi thực hiện thống kê.");
            return;
        }

        const response = await fetchReportsByDate(
            selectedDay,
            selectedMonth,
            selectedYear
        );
        const data = response.data;

        if (data) {
            setReports([data]);
            setMostBookedRooms(data.theMostRoomTypeOfBooking);
            setLeastBookedRooms(data.leastOfRoomTypeOfBooking);

            localStorage.setItem(
                "reportData",
                JSON.stringify({
                    reports: [data],
                    mostBookedRooms: data.theMostRoomTypeOfBooking,
                    leastBookedRooms: data.leastOfRoomTypeOfBooking,
                    selectedDay,
                    selectedMonth,
                    selectedYear,
                })
            );
        } else {
            setReports([]);
            setMostBookedRooms([]);
            setLeastBookedRooms([]);
        }
    };

    const handleExportExcel = async () => {
        try {
            if (!selectedYear) {
                alert("Vui lòng chọn thông tin trước khi thực hiện xuất file excel.");
                return;
            }
            const excelData = await exportExcelByYear(
                selectedDay,
                selectedMonth,
                selectedYear
            );
            const blob = new Blob([excelData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `report_${selectedYear}_${selectedMonth}_${selectedDay}.xls`;
            document.body.appendChild(a);
            
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Lỗi khi xuất file Excel:", error);
        }
    };

    return (
        <div className="report">
            <Sidebar />
            <div className="reportContainer">
                <Navbar />
                <div className="reportList">
                    <div className="datatableTitle">
                        <span>Thống kê báo cáo</span>
                    </div>
                    <div className="reportSearch">
                        <select
                            className="select"
                            value={selectedDay}
                            onChange={handleDayChange}
                        >
                            <option value="">-- Chọn ngày --</option>
                            {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                        >
                            <option value="">-- Chọn tháng --</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select"
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            <option value="">-- Chọn năm --</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <button className="btn" onClick={handleStatistics}>
                            Thống kê
                        </button>
                        <button className="btn excel" onClick={handleExportExcel}>
                            Xuất file excel
                        </button>
                    </div>

                    <div className="reportDetails">
                        {reports.length > 0 && (
                            <div className="reporttable">
                                <TableContainer
                                    component={Paper}
                                    className="tablecontainer"
                                >
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng đặt phòng
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng loại phòng
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng giáo viên
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng trả phòng
                                                </TableCell>
                                                <TableCell className="tableCell tabble-header">
                                                    Số lượng sự kiện
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {reports.map((report, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="tableCell">
                                                        {report.countOfBookingRoom}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfRoomType}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfTeacher}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfReturnBookingRoom}
                                                    </TableCell>
                                                    <TableCell className="tableCell">
                                                        {report.countOfEvent}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}

                        {mostBookedRooms.length > 0 && (
                            <div>
                                <div className="datatableTitle second">
                                    <span>Số lượng phòng được đặt nhiều nhất</span>
                                </div>
                                <div className="reporttable">
                                    <TableContainer
                                        component={Paper}
                                        className="tablecontainer"
                                    >
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="tableCell tabble-header header-start">
                                                        Ảnh
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header header-start">
                                                        Tên phòng
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header header-start">
                                                        Loại phòng
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Diện tích
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Số lượng chỗ ngồi
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {mostBookedRooms.map((room) => (
                                                    <TableRow key={room.id}>
                                                        <TableCell className="tableCell header-img">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    src={`${baseIMG}/${room.image}`}
                                                                    alt=""
                                                                    className="image"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell name-room most-room">
                                                            {room.roomName}
                                                        </TableCell>
                                                        <TableCell className="tableCell room-type most-room">
                                                            {room.typeName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.area}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.countOfSeats}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        )}

                        {leastBookedRooms.length > 0 && (
                            <div>
                                <div className="datatableTitle second">
                                    <span>Số lượng phòng được đặt ít nhất</span>
                                </div>
                                <div className="reporttable">
                                    <TableContainer
                                        component={Paper}
                                        className="tablecontainer"
                                    >
                                        <Table
                                            sx={{ minWidth: 650 }}
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="tableCell tabble-header header-start">
                                                        Ảnh
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header header-start">
                                                        Tên phòng
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header header-start">
                                                        Loại phòng
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Diện tích
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Số lượng chỗ ngồi
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {leastBookedRooms.map((room) => (
                                                    <TableRow key={room.id}>
                                                        <TableCell className="tableCell header-img">
                                                            <div className="cellWrapper">
                                                                <img
                                                                    src={`${baseIMG}/${room.image}`}
                                                                    alt=""
                                                                    className="image"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tableCell name-room most-room">
                                                            {room.roomName}
                                                        </TableCell>
                                                        <TableCell className="tableCell room-type most-room">
                                                            {room.typeName}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.area}
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            {room.countOfSeats}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
