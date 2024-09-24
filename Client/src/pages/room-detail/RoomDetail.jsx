import React, { useState } from "react";
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

import Helmet from "../../components/helmet/Helmet";
import ScrollToTop from '../../components/scroll-to-top/ScrollToTop';
import SectionCommon from "../../components/section-common/SectionCommon";

import fptgallery1 from "../../assets/images/fptgallery/fptgallery1.jpg";
import fptgallery2 from "../../assets/images/fptgallery/fptgallery2.jpg";
import fptgallery3 from "../../assets/images/fptgallery/fptgallery3.jpg";
import fptgallery4 from "../../assets/images/fptgallery/fptgallery4.jpg";

import "./room-detail.scss";

const RoomDetail = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
                                                src={fptgallery1}
                                                alt="image"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery2}
                                                alt="image"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery3}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery4}
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
                                        <SwiperSlide>
                                            <img
                                                src={fptgallery4}
                                                alt="thumbnail"
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </Grid>
                            <Grid item xs={0} sm={0} md={6} lg={5}>
                                <div className="room-detail__right">
                                    <h2 className="room-detail__right__title">
                                        Phòng họp 01
                                    </h2>

                                    <div className="room-detail__right__count">
                                        <span>Số lượng chỗ ngồi:</span>
                                        <span className="highlight">100</span>
                                    </div>
                                    <hr />

                                    <div className="room-detail__right__area">
                                        <span>Diện tích:</span>
                                        <span className="highlight">
                                            100m<sup>2</sup>
                                        </span>
                                    </div>
                                    <hr />

                                    <div className="room-detail__right__desc">
                                        <span>Mô tả:</span>
                                        <span>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Dolores atque obcaecati alias fugit
                                            aliquid temporibus expedita eius
                                            aperiam similique pariatur? At rerum
                                            sint sunt asperiores nesciunt amet
                                            dolorem, porro commodi!
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="room-detail__right__action">
                                        <Button
                                            variant="contained"
                                            className="btn btn--back"
                                        >
                                            Trở về
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className="btn btn--book"
                                        >
                                            Đặt phòng
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <ScrollToTop/>
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default RoomDetail;
