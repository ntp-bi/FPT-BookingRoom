import React from "react";
import { Container, Grid } from "@mui/material";

import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import Helmet from "../../components/helmet/Helmet";
import RoomCard from "../../components/room-card/RoomCard";
import HeroSlider from "../../components/hero-slider/HeroSlider";
import SectionHeading from "../../components/section-heading/SectionHeading";

import { rooms } from "../../data/rooms";

import "swiper/css";
import "./home.scss";

const Home = () => {
    return (
        <Helmet title="Home">
            <div className="home">
                <div className="main">
                    <Container className="container">
                        <HeroSlider />
                        <section>
                            <SectionHeading
                                subtitle="Sample"
                                title="Room List"
                            />
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={0}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[FreeMode, Pagination, Navigation]}
                                className="custom-swiper"
                                breakpoints={{
                                    // Khi màn hình nhỏ hơn 300px
                                    300: {
                                        slidesPerView: 2, 
                                        spaceBetween: 10, 
                                    },
                                    // Khi màn hình nhỏ hơn 500px
                                    550: {
                                        slidesPerView: 2, 
                                        spaceBetween: 10, 
                                    },
                                    // Khi màn hình nhỏ hơn 640px
                                    640: {
                                        slidesPerView: 3, 
                                        spaceBetween: 10, 
                                    },
                                    // Khi màn hình nhỏ hơn 768px
                                    800: {
                                        slidesPerView: 3, 
                                        spaceBetween: 20,
                                    },
                                    // Khi màn hình nhỏ hơn 1024px
                                    1024: {
                                        slidesPerView: 4, 
                                        spaceBetween: 30,
                                    },
                                }}
                            >
                                {rooms.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <RoomCard
                                            image={item.image}
                                            roomName={item.roomName}
                                            countOfSeats={item.countOfSeats}
                                            area={item.area}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default Home;
