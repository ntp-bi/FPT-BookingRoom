import React from "react";
import { Grid } from "@mui/material";

import world from "../../assets/images/world.png";
import fptimage2 from "../../assets/images/fptgallery/fptgallery7.jpg"
import fptimage from "../../assets/images/fptgallery/fptgallery6.jpg"
import fptroomvideo from "../../assets/images/fptroomvideo.mp4";

import "./hero-slider.scss";

const HeroSlider = () => {
    return (
        <div className="hero-slider">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className="hero-slider__left">
                        <div className="hero-slider__left__subtitle">
                            <span>About us</span>
                            <img src={world} alt="" />
                        </div>
                        <h2 className="hero-slider__left__title">
                            Tạo không gian cho sự sáng tạo: <br/>
                            <span className="highlight">
                                Phòng học được tạo ra để giáo viên thăng hoa
                            </span>
                        </h2>
                        <div className="hero-slider__left__desc">
                            Việc đặt phòng học cho giáo viên là một quá trình
                            quan trọng để tạo điều kiện thuận lợi cho việc giảng
                            dạy và học tập. Mỗi phòng học được thiết kế với mục
                            đích cụ thể để phản ánh phong cách giảng dạy của
                            giáo viên và tạo ra một môi trường học tập tích cực
                            cho học sinh. Các yếu tố như sự bài trí, ánh sáng tự
                            nhiên, không gian mở, và các thiết bị giáo dục đều
                            được xem xét kỹ lưỡng. Phòng học được sắp xếp để tối
                            ưu hóa không gian và tạo ra một môi trường học tập
                            linh hoạt và sáng tạo.
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <div className="hero-slider__right">
                        <img src={fptimage} alt="" className="image1"/>
                        <video src={fptroomvideo} alt="" className="video" controls/>
                        <img src={fptimage2} alt="" className="image2"/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default HeroSlider;
