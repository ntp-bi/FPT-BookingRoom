import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import * as api from "../../../api/ApiTypeRoom";

import "./main-type.scss";

const TypeRoom = () => {
    const [types, setTypes] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingSearch, setLoadingSearch] = useState(false); // State loading tải dữ liệu khi searchValue
    const [isLoading, setIsLoading] = useState(false); // State loading tải dữ liệu khi searchValue
    const [filteredRows, setFilteredRows] = useState([]); // State lưu trữ dữ liệu đã lọc   

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    useEffect(() => {
        fetchTypeRooms(); 
    }, []);

    // Hàm gọi API để lấy danh sách loại phòng
    const fetchTypeRooms = async () => {
        try {
            setIsLoading(true);
            const result = await api.getAllType();
            setTypes(result);
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

            const result = await api.searchTypeRoom(debouncedValue); // Gọi API tìm kiếm

            setLoadingSearch(false); 
            return result; 
        };

        // Kiểm tra xem từ khóa tìm kiếm không phải là chuỗi rỗng
        if (debouncedValue.trim() !== "") {
            fetchApi(); // Gọi hàm fetchApi
        }
    }, [debouncedValue]);

    const handleClear = () => {
        setSearch("");
        inputRef.current.focus();
        setFilteredRows(types);
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
        const filteredRows = types.filter((type) => {
            const nameMatch =
                !searchTerm ||
                type.typeName.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        });

        setFilteredRows(filteredRows);
    };

    // Hàm xử lý xóa loại phòng
    const handleDelete = async (typeId) => {
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa loại phòng này không?"
        );
        if (confirmed) {
            try {
                const result = await api.deleteType(typeId); // Gọi API xóa loại phòng
                if (result) {                   
                    toast.success(`Loại phòng đã được xóa thành công!`);
                    fetchTypeRooms();
                } else {
                    toast.error(`Có lỗi khi xóa loại phòng.`);
                }
            } catch (error) {
                toast.error(`Không thể xóa loại phòng này!`);
            }
        }
        setTimeout(() => {
            toast.dismiss();
        }, 3000);

        setPage(1);
    };

    return (
        <div className="type">
            <Sidebar />
            <div className="typeContainer">
                <Navbar />
                <div className="typeList">
                    <div className="datatableTitle">
                        <span>Quản lý loại phòng</span>
                    </div>
                    <div className="typeSearch">
                        <h4>Tìm kiếm: </h4>
                        <div className="search">
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên loại phòng muốn tìm."
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
                            to="/types/add-type"
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
                            <div className="accounttable">
                                <TableContainer
                                    component={Paper}
                                    className="tablecontainer"
                                >
                                    {filteredRows.length === 0 && (
                                        <div className="no-data-message">
                                            Không tìm thấy kết quả tìm kiếm
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
                                                .slice(
                                                    (page - 1) * rowsPerPage,
                                                    page * rowsPerPage
                                                )
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
                                                                onClick={() =>
                                                                    handleDelete(type.id)
                                                                }
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

export default TypeRoom;
