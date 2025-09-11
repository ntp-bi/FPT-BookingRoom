import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

import { Pagination } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";

import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import useDebounce from "../../../components/hooks/useDebounce";

import * as api from "../../../api/ApiTeacher";

import { baseIMG } from "../../../api/apiConfig";

import "./main-teacher.scss";

const Teacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State loading tải dữ liệu khi searchValue
    const [loadingSearch, setLoadingSearch] = useState(false); // State loading tải dữ liệu khi searchValue
    const [filteredRows, setFilteredRows] = useState([]); // State lưu trữ dữ liệu đã lọc

    const [page, setPage] = useState(1);
    const rowsPerPage = 6;

    const debouncedValue = useDebounce(search, 500);

    const inputRef = useRef();

    useEffect(() => {
        fetchTeachers(); 
    }, []);

    // Hàm gọi API để lấy danh sách teacher
    const fetchTeachers = async () => {
        try {
            setIsLoading(true);
            const result = await api.getAllTeachers();
            setTeachers(result);
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

             const result = await api.searchTeacher(debouncedValue); // Gọi API tìm kiếm

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
        setFilteredRows(teachers);
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

    // Pagination component từ thư viện @mui/material,
    // thì handleChangePage yêu cầu có hai tham số, do đó vẫn cần khai báo event ngay cả khi không sử dụng.
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const filterRows = (searchTerm) => {
        const filteredRows = teachers.filter((teacher) => {
            const nameMatch =
                !searchTerm ||
                teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch;
        });

        setFilteredRows(filteredRows);
        setPage(1); 
    };

    // Hàm xử lý xóa phòng
    const handleDelete = async (teacherId) => {       
        const confirmed = window.confirm(
            "Bạn có chắc chắn muốn xóa giáo viên này không?"
        );
        if (confirmed) {
            try {
                const result = await api.deleteTeacher(teacherId); 
                if (result) {                    
                    toast.success(`Giáo viên đã được xóa thành công!`);
                    fetchTeachers();
                } else {                    
                    toast.error(`Có lỗi khi xóa giáo viên.`);
                }
            } catch (error) {
                toast.error(`Không thể xóa giáo viên này!.`);
            }
        }
        setTimeout(() => {
            toast.dismiss();
        }, 3000);
        setPage(1);
    };

    return (
        <div className="teacher">
            <Sidebar />
            <div className="teacherContainer">
                <Navbar />
                <div className="teacherList">
                    <div className="datatableTitle">
                        <span>Quản lý giảng viên</span>
                    </div>
                    <div className="teacherSearch">
                        <h4>Tìm kiếm: </h4>
                        <div className="search">
                            <input
                                ref={inputRef}
                                spellCheck={false}
                                placeholder="Nhập tên giáo viên muốn tìm."
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
                            to="/teachers/add-teacher"
                            style={{ textDecoration: "none" }}
                            className="link"
                        >
                            <span>Thêm mới </span>
                        </Link>
                    </div>
                    {isLoading ? (
                        <p style={{ padding: "20px" }}>Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            <div className="top">
                                {filteredRows.length === 0 && (
                                    <div className="no-data-message">
                                        Không tìm thấy kết quả tìm kiếm.
                                    </div>
                                )}
                                {filteredRows
                                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                                    .map((teacher) => (
                                        <div className="left" key={teacher.id}>
                                            <h6 className="title">Thông tin cá nhân</h6>

                                            <div className="btnAction">
                                                <button
                                                    className="deleteButton"
                                                    onClick={() =>
                                                        handleDelete(teacher.id)
                                                    }
                                                >
                                                    <span>
                                                        <DeleteOutlinedIcon className="icon" />
                                                    </span>
                                                </button>

                                                <Link
                                                    to={`/teachers/update-teacher/${teacher.id}`}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <span className="editButton">
                                                        <EditCalendarOutlinedIcon className="icon" />
                                                    </span>
                                                </Link>
                                            </div>

                                            <div className="item">
                                                <img
                                                    src={`${baseIMG}/${teacher.photo}`}
                                                    alt=""
                                                    className="itemImg"
                                                />                                            
                                                <div className="details">
                                                    <h1 className="itemTitle">
                                                        {teacher.fullName}
                                                    </h1>
                                                    <div className="detailItem">
                                                        <span className="itemkey">
                                                            Ngày sinh:{" "}
                                                        </span>
                                                        <span className="itemValue">                                                           
                                                            {format(
                                                                new Date(
                                                                    teacher.birthDay
                                                                ),
                                                                "dd/MM/yyyy"
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="detailItem">
                                                        <span className="itemkey">
                                                            Giới tính:{" "}
                                                        </span>
                                                        <span className="itemValue">
                                                            {teacher.gender
                                                                ? "Nam"
                                                                : "Nữ"}
                                                        </span>
                                                    </div>
                                                    <div className="detailItem">
                                                        <span className="itemkey">
                                                            Email:{" "}
                                                        </span>
                                                        <span className="itemValue">
                                                            {teacher.accountName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {filteredRows.length > 0 && (
                                <Pagination
                                    className="pagination"
                                    count={Math.ceil(filteredRows.length / rowsPerPage)}
                                    page={page}
                                    onChange={handleChangePage}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teacher;
