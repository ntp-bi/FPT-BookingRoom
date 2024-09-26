import React from "react";
import { Container, Grid } from "@mui/material";

import Helmet from "../../components/helmet/Helmet";
import ModalEditProfile from "../../components/modal-edit-profile/ModalEditProfile";

import avatar from "../../assets/avatar/avatar1.png";

import "./profile.scss";

const Profile = () => {
    return (
        <Helmet title="Profile">
            <div className="profile">
                <div className="main">
                    <section>
                        <Container className="container">
                            <Grid container spacing={2} className="wrapper">
                                <Grid item xs={12} sm={12} md={6} lg={7}>
                                    <div className="profile__left">
                                        <img
                                            src={avatar}
                                            alt=""
                                            className="profile__left__image"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={5}>
                                    <div className="profile__right">
                                        <div className="profile__right__info">
                                            <h2 className="profile__right__info__name">
                                                Nguyễn Tâm Phước
                                            </h2>
                                            <div className="profile__right__info__email">
                                                <span>Email: </span>
                                                phuocnt02@gmail.com
                                            </div>
                                            <div className="profile__right__info__account">
                                                <span>Account Name: </span>
                                                Nguyễn Tâm Phước
                                            </div>
                                            <div className="profile__right__info__gender">
                                                <span>Gender: </span>
                                                Nam
                                            </div>
                                        </div>
                                        <div className="profile__right__btn">                                            
                                            <ModalEditProfile />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </section>
                </div>
            </div>
        </Helmet>
    );
};

export default Profile;
