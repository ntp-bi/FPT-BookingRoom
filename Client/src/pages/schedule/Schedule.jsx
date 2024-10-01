import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import Helmet from "./../../components/helmet/Helmet";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import SectionCommon from "../../components/section-common/SectionCommon";
import DataTableSchedule from "../../components/data-table-schedule/DataTableSchedule";
import SingleInputDateRangePicker from "../../components/single-input-date-range-picker/SingleInputDateRangePicker";

import SearchIcon from "@mui/icons-material/Search";

import { getAllSchedule, searchSchedule } from "../../api/schedule";
import useDebounce from "../../hooks/useDebounce";

import "./schedule.scss";

const Schedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]);

    const [status, setStatus] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm thực tế
    const [searchInput, setSearchInput] = useState(""); // Giá trị input tìm kiếm

    const debouncedValue = useDebounce(searchTerm, 700);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllSchedule();
                setSchedule(response);
                setFilteredSchedule(response);
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await searchSchedule(debouncedValue);
                setFilteredSchedule(response);
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        if (debouncedValue.trim() !== "") {
            fetchData();
        } else {
            setFilteredSchedule(schedule);
        }
    }, [debouncedValue, schedule]);

    useEffect(() => {
        filterSchedule();
    }, [status, dateRange, searchTerm, schedule]);

    const filterSchedule = () => {
        let updatedSchedule = [...schedule];

        // Lọc theo trạng thái
        if (status) {
            updatedSchedule = updatedSchedule.filter(
                (item) => item.status === parseInt(status)
            );
        }

        // Lọc theo khoảng thời gian
        if (dateRange[0] && dateRange[1]) {
            updatedSchedule = updatedSchedule.filter((item) => {
                const bookingTime = new Date(item.reserveTime);
                const startDate = new Date(dateRange[0]);
                const endDate = new Date(dateRange[1]);

                return bookingTime >= startDate && bookingTime <= endDate;
            });
        }

        // Lọc theo giá trị tìm kiếm
        if (searchTerm.trim() !== "") {
            updatedSchedule = updatedSchedule.filter((item) => {
                const roomNameMatch = item.roomName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                return roomNameMatch;
            });
        }

        setFilteredSchedule(updatedSchedule);
    };

    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleChangeDateRange = (newValue) => {
        setDateRange(newValue);
    };

    const handleChangeSearch = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(" ")) {
            setSearchInput(searchValue); // Thay đổi giá trị của input nhưng không trigger tìm kiếm ngay lập tức
        }

        // Nếu giá trị tìm kiếm bị xóa, trả lại dữ liệu gốc
        if (searchValue === "") {
            setFilteredSchedule(schedule); 
            setSearchTerm("");
        }
    };

    const handleSearchClick = () => {
        setSearchTerm(searchInput); 
    };

    return (
        <Helmet title="Schedule">
            <div className="schedule">
                <div className="main">
                    <Container className="container">
                        <SectionCommon title="Booking Schedule" />
                        <div className="schedule__header">
                            <Grid
                                container
                                spacing={2}
                                className="schedule__header__filter"
                            >
                                <Grid item xs={12} sm={12} md={12} lg={3}>
                                    <FormControl
                                        fullWidth
                                        className="custom-input"
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Trạng thái
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Trạng thái"
                                            onChange={handleChangeStatus}
                                        >
                                            <MenuItem value="">Tất cả</MenuItem>
                                            <MenuItem value={1}>
                                                Chờ xác nhận
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                Đã xác nhận
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={3}>
                                    <SingleInputDateRangePicker
                                        className="custom-input"
                                        value={dateRange}
                                        onChange={handleChangeDateRange}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={6}
                                    className="search"
                                >
                                    <TextField
                                        type="search"
                                        variant="outlined"
                                        placeholder="Tìm kiếm..."
                                        className="custom-input input__search"
                                        value={searchInput}
                                        onChange={handleChangeSearch} // Chỉ thay đổi giá trị input
                                    />
                                    <Button
                                        variant="contained"
                                        className="search__btn"
                                        onClick={handleSearchClick} 
                                    >
                                        <SearchIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <DataTableSchedule
                                    schedule={filteredSchedule}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                    <ScrollToTop />
                </div>
            </div>
        </Helmet>
    );
};

export default Schedule;
