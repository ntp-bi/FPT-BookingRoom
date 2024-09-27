import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";

import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import Helmet from "../../components/helmet/Helmet";
import RoomCard from "../../components/room-card/RoomCard";
import HeroSlider from "../../components/hero-slider/HeroSlider";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import SectionHeading from "../../components/section-heading/SectionHeading";
import MasonryImagesGallery from "../../components/masonry-images-gallery/MasonryImagesGallery";

import { rooms } from "../../data/rooms";
import { getAllRoom } from "../../api/rooms";

import "swiper/css";
import "./home.scss";

const Home = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllRoom();
                setRooms(response);

                return response;
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

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
                                {rooms.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <RoomCard
                                            image={`${
                                                import.meta.env.VITE_FILE__URL
                                            }${item.image}`}
                                            roomName={item.roomName}
                                            countOfSeats={item.countOfSeats}
                                            area={item.area}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                        <section className="masonry">
                            <SectionHeading
                                subtitle="Collection"
                                title="Collection of images of classrooms"
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <MasonryImagesGallery />
                                </Grid>
                            </Grid>
                        </section>
                        <ScrollToTop />
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default Home;
