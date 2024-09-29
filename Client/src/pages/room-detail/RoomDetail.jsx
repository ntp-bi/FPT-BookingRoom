import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { configPath } from "../../config/configPath";

import Helmet from "../../components/helmet/Helmet";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import SectionCommon from "../../components/section-common/SectionCommon";
import ModalBookingRoom from "../../components/modal-booking-room/ModalBookingRoom";

import { getRoomById } from "../../api/rooms";

import fptgallery1 from "../../assets/images/fptgallery/fptgallery1.jpg";
import fptgallery2 from "../../assets/images/fptgallery/fptgallery2.jpg";
import fptgallery3 from "../../assets/images/fptgallery/fptgallery7.jpg";

import "./room-detail.scss";

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const STATUS_ROOM = {
        1: "Đang sửa chữa",
        2: "Phòng trống",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRoomById(id);
                setRoom(response);

                return response;
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Helmet title="Room Detail">
            <div className="room-detail">
                <div className="main">
                    <Container className="container">
                        <SectionCommon title="Room Details" />
                        <Grid container spacing={2} className="wrapper">
                            <Grid item xs={12} sm={12} md={6} lg={7}>
                                <div className="room-detail__left">
                                    <Swiper
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        thumbs={
                                            thumbsSwiper
                                                ? { swiper: thumbsSwiper }
                                                : null
                                        }
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="room-detail__left__image"
                                    >
                                        <SwiperSlide>
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_FILE__URL
                                                }${room?.image}`}
                                                alt="image"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery1}
                                                alt="image"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery2}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery3}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                    </Swiper>

                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="room-detail__left__sub__image"
                                    >
                                        <SwiperSlide>
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_FILE__URL
                                                }${room?.image}`}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery1}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery2}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery3}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </Grid>
                            <Grid item xs={0} sm={0} md={6} lg={5}>
                                <div className="room-detail__right">
                                    <h2 className="room-detail__right__title">
                                        {room?.roomName}
                                    </h2>

                                    <div className="room-detail__right__count">
                                        <span>Loại phòng:</span>
                                        <span className="highlight">
                                            {room?.typeName}
                                        </span>
                                    </div>
                                    <hr />

                                    <div className="room-detail__right__count">
                                        <span>Trạng thái:</span>
                                        <span className="highlight">
                                            {room?.status === 1
                                                ? STATUS_ROOM[1]
                                                : STATUS_ROOM[2]}
                                        </span>
                                    </div>
                                    <hr />

                                    <div className="room-detail__right__count">
                                        <span>Số lượng chỗ ngồi:</span>
                                        <span className="highlight">
                                            {room?.countOfSeats}
                                        </span>
                                    </div>
                                    <hr />

                                    <div className="room-detail__right__area">
                                        <span>Diện tích:</span>
                                        <span className="highlight">
                                            {room?.area}m<sup>2</sup>
                                        </span>
                                    </div>
                                    <hr />

                                    <div className="room-detail__right__desc">
                                        <span>Mô tả:</span>
                                        <span>{room?.description}</span>
                                    </div>
                                    <hr />
                                    <div className="room-detail__right__action">
                                        <Button
                                            variant="contained"
                                            className="btn btn--back"
                                        >
                                            <Link
                                                to={`${configPath.reservation}`}
                                            >
                                                Trở về
                                            </Link>
                                        </Button>
                                        <ModalBookingRoom />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <ScrollToTop />
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default RoomDetail;
