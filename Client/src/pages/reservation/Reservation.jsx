import React, { useEffect, useRef, useState } from "react";
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
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import SectionCommon from "../../components/section-common/SectionCommon";
import RoomCardSkeleton from "../../components/room-card-skeleton/RoomCardSkeleton";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { getAllRoom } from "../../api/rooms";
import { getAllRoomType } from "../../api/roomType";

import "./reservation.scss";

const Reservation = () => {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [loadingRooms, setLoadingRooms] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingRooms(true);
            try {
                const response = await getAllRoom(page);
                setRooms(response || []); 
                setTotalPages(response.totalPages || 1);
            } catch (error) {
                console.log("Error: " + error);
            } finally {
                setLoadingRooms(false);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllRoomType();
                setRoomTypes(response);
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedRoomTypes.length === 0) {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) =>
                selectedRoomTypes.includes(room.typeName)
            );
            setFilteredRooms(filtered);
        }
    }, [selectedRoomTypes, rooms]);

    const handleRoomTypeChange = (e) => {
        const value = e.target.name;

        setSelectedRoomTypes((prev) => {
            if (prev.includes(value)) {
                return selectedRoomTypes.filter((type) => type !== value);
            } else {
                return [...selectedRoomTypes, value];
            }
        });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
                                            {roomTypes.map((item) => (
                                                <FormControlLabel
                                                    key={item.id}
                                                    className="item"
                                                    label={item.typeName}
                                                    control={
                                                        <Checkbox
                                                            className="custom-checkbox"
                                                            name={item.typeName}
                                                            checked={selectedRoomTypes.includes(
                                                                item.typeName
                                                            )}
                                                            onChange={
                                                                handleRoomTypeChange
                                                            }
                                                        />
                                                    }
                                                />
                                            ))}
                                        </FormGroup>
                                    </div>
                                    <Button
                                        variant="contained"
                                        className="button__filter__clear"
                                        onClick={() => setSelectedRoomTypes([])}
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
                                    {loadingRooms
                                        ? rooms.map((_, index) => (
                                              <Grid
                                                  item
                                                  xs={12}
                                                  sm={4}
                                                  md={4}
                                                  lg={3}
                                                  key={index}
                                              >
                                                  <RoomCardSkeleton />
                                              </Grid>
                                          ))
                                        : filteredRooms.map((item) => (
                                              <Grid
                                                  item
                                                  xs={12}
                                                  sm={4}
                                                  md={4}
                                                  lg={3}
                                                  key={item.id}
                                              >
                                                  <RoomCard
                                                      image={`${
                                                          import.meta.env
                                                              .VITE_FILE__URL
                                                      }${item.image}`}
                                                      roomName={item.roomName}
                                                      countOfSeats={
                                                          item.countOfSeats
                                                      }
                                                      area={item.area}
                                                      typeName={item.typeName}
                                                  />
                                              </Grid>
                                          ))}
                                </Grid>
                                <Grid container>
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={totalPages}
                                            page={page}
                                            onChange={handlePageChange}
                                            showFirstButton
                                            showLastButton
                                            className="custom-pagination"
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <ScrollToTop />
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default Reservation;
