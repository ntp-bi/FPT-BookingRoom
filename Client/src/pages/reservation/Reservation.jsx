import React, { useRef } from "react";
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    Pagination,
    Stack,
} from "@mui/material";

import Helmet from "../../components/helmet/Helmet";
import RoomCard from "../../components/room-card/RoomCard";
import SectionCommon from "../../components/section-common/SectionCommon";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { rooms } from "../../data/rooms";

import "./reservation.scss";

const Reservation = () => {
    const filterRef = useRef(null);

    const showHideFilter = () => filterRef.current.classList.toggle("active");

    return (
        <Helmet title="Reservation">
            <div className="reservation">
                <div className="main">
                    <Container className="container">
                        <SectionCommon title="Reservation" />
                        <Grid container spacing={2}>
                            <Grid
                                item
                                xs={0}
                                sm={0}
                                md={2}
                                lg={2}
                                className="filter"
                            >
                                <div
                                    className="reservation__category"
                                    ref={filterRef}
                                >
                                    <div className="filter__close">
                                        <div
                                            className="reservation__category__close"
                                            onClick={showHideFilter}
                                        >
                                            <ArrowBackIosIcon />
                                        </div>
                                        <h3 className="reservation__category__title">
                                            Categories
                                        </h3>
                                    </div>
                                    <div className="reservation__category__items">
                                        <h4>Room type</h4>
                                        <FormGroup className="form-group">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="Meeting room"
                                                className="item"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="Event room"
                                                className="item"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="Media room"
                                                className="item"
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="reservation__category__items">
                                        <h4>Count of seats</h4>
                                        <FormGroup className="form-group">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="100"
                                                className="item"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="200"
                                                className="item"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="300"
                                                className="item"
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="reservation__category__items">
                                        <h4>Room area</h4>
                                        <FormGroup className="form-group">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="100"
                                                className="item"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="200"
                                                className="item"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className="custom-checkbox" />
                                                }
                                                label="300"
                                                className="item"
                                            />
                                        </FormGroup>
                                    </div>

                                    <Button
                                        variant="contained"
                                        className="button__filter"
                                    >
                                        clear filter
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10} lg={10}>
                                <Button
                                    variant="contained"
                                    className="button__filter"
                                    onClick={showHideFilter}
                                >
                                    filter
                                </Button>
                                <Grid container spacing={2}>
                                    {rooms.map((item, index) => (
                                        <Grid
                                            item
                                            xs={6}
                                            sm={4}
                                            md={4}
                                            lg={3}
                                            key={index}
                                        >
                                            <RoomCard
                                                roomName={item.roomName}
                                                image={item.image}
                                                area={item.area}
                                                countOfSeats={item.countOfSeats}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid container>
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={10}
                                            showFirstButton
                                            showLastButton
                                            size="large"
                                            className="custom-pagination"
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default Reservation;
