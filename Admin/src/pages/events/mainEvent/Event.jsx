import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";

import * as api from "../../../api/ApiEvents";

import "./event.scss";

const Event = () => {
    const [events, setEvents] = useState([]); // State để lưu trữ dữ liệu danh sách được lấy về
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false); // State loading tải dữ liệu khi searchValue
    const [isLoading, setIsLoading] = useState(false); // State loading tải dữ liệu khi searchValue
    const [filteredRows, setFilteredRows] = useState([]); // State lưu trữ dữ liệu đã lọc

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    useEffect(() => {
        fetchEvents();
    }, []);

    // Hàm gọi API để lấy danh sách sự kiện
    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const result = await api.getAllEvent();
            setEvents(result);
            setFilteredRows(result); 
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(`Có lỗi: ${error.message}`);
        }
    };

    // Hàm xử lý tìm kiếm khi có sự thay đổi trong từ khóa tìm kiếm
    useEffect(() => {
        const fetchApi = async () => {
            setLoadingSearch(true);

            const result = await api.searchEvent(debouncedValue); // Gọi API tìm kiếm

            setLoadingSearch(false);
            return result;
        };

        // Kiểm tra xem từ khóa tìm kiếm không phải là chuỗi rỗng
        if (debouncedValue.trim() !== "") {
            fetchApi(); 
        }
    }, [debouncedValue]);

    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(events);
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearch(searchValue);
        }
    };

    const handleSearch = () => {
        filterRows(search);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const filterRows = (searchTerm) => {
        const filteredRows = events.filter((event) => {
            const nameMatch =
                !searchTerm ||
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        });

        setFilteredRows(filteredRows);
        setPage(1);
    };

    // Hàm xử lý xóa sự kiện
    const handleDelete = async (eventId) => {   
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?");
        if (confirmed) {
            try {
                const result = await api.deleteEvent(eventId); 
                if (result) {
                    toast.success(`Sự kiện đã được xóa thành công!`);
                    fetchEvents();
                } else {
                    toast.error(`Có lỗi khi xóa sự kiện.`);
                }
            } catch (error) {
                toast.error(`Có lỗi: ${error.message}`);
            }
        }
        setTimeout(() => {
            toast.dismiss();
        }, 3000);

        setPage(1);
    };

    return (
        <div className="event">
            <Sidebar />
            <div className="eventContainer">
                <Navbar />
                <div className="eventList">
                    <div className="datatableTitle">
                        <span>Quản lý sự kiện</span>
                    </div>
                    <div className="eventSearch">
                        <h4>Tìm kiếm: </h4>
                        <div className="search">
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên sự kiện muốn tìm."
                                value={search}
                                onChange={handleSearchChange}
                            />
                            {!!search && !loadingSearch && (
                                <button className="clear" onClick={handleClear}>
                                    <CancelIcon className="icon-search" />
                                </button>
                            )}
                            {loadingSearch && (
                                <RotateRightOutlinedIcon className="loading icon-search" />
                            )}

                            <button className="search-btn" onClick={handleSearch}>
                                <SearchOutlinedIcon />
                            </button>
                        </div>
                        <Link
                            to="/events/add-event"
                            style={{ textDecoration: "none" }}
                            className="link"
                        >
                            <span>Thêm mới </span>
                        </Link>
                    </div>
                    {isLoading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <div className="eventtable">
                                <TableContainer
                                    component={Paper}
                                    className="tablecontainer"
                                >
                                    {filteredRows.length === 0 && (
                                        <div className="no-data-message">
                                            Không tìm thấy kết quả tìm kiếm.
                                        </div>
                                    )}
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
                                        {filteredRows.length > 0 && (
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="tableCell tabble-header">
                                                        STT
                                                    </TableCell>
                                                    <TableCell className="tableCell tabble-header">
                                                        Tên sự kiện
                                                    </TableCell>
                                                    <TableCell
                                                        className="tableCell tabble-header"
                                                        colSpan={2}
                                                    >
                                                        Thao tác
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                        )}
                                        <TableBody>
                                            {filteredRows
                                                .slice(
                                                    (page - 1) * rowsPerPage,
                                                    page * rowsPerPage
                                                )
                                                .map((event, index) => (
                                                    <TableRow key={event.id}>
                                                        <TableCell className="tableCell id-event">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell className="tableCell name-event">
                                                            {event.eventName}
                                                        </TableCell>
                                                        <TableCell className="tableCell btn-action">
                                                            <button
                                                                className="deleteBtn btn"
                                                                onClick={() =>
                                                                    handleDelete(event.id)
                                                                }
                                                            >
                                                                Xóa
                                                            </button>
                                                            <Link
                                                                to={`/events/update-event/${event.id}`}
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
                                </TableContainer>
                                {filteredRows.length > 0 && (
                                    <Pagination
                                        className="pagination"
                                        count={Math.ceil(
                                            filteredRows.length / rowsPerPage
                                        )}
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Event;
