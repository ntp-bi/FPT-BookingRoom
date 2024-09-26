import React, { useState } from "react";
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
import SectionCommon from "../../components/section-common/SectionCommon";
import DataTableSchedule from "../../components/data-table-schedule/DataTableSchedule";
import SingleInputDateRangePicker from "../../components/single-input-date-range-picker/SingleInputDateRangePicker";

import SearchIcon from "@mui/icons-material/Search";

import "./schedule.scss";

const Schedule = () => {
    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        setStatus(event.target.value);
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
                                            onChange={handleChange}                                            
                                        >
                                            <MenuItem value={10}>
                                                Chờ xác nhận
                                            </MenuItem>
                                            <MenuItem value={20}>
                                                Đã xác nhận
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={3}>
                                    <SingleInputDateRangePicker className="custom-input" />
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
                                        variant="outlined"
                                        placeholder="Tìm kiếm..."
                                        className="custom-input input__search"
                                    />
                                    <Button variant="contained" className="search__btn">
                                        <SearchIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <DataTableSchedule />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default Schedule;
