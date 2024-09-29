import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";

import Helmet from "../../components/helmet/Helmet";
import ModalEditProfile from "../../components/modal-edit-profile/ModalEditProfile";

import { profile } from "../../api/profile";

import "./profile.scss";
import dayjs from "dayjs";

const Profile = () => {
    const [profiles, setProfiles] = useState({
        fullName: "",
        birthDay: null,
        gender: true,
        photo: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await profile();
                setProfiles(response);
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

    const renderGender = (gender) => {
        return gender ? "Male" : "Female";
    };

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
                                            src={`${
                                                import.meta.env.VITE_FILE__URL
                                            }${profiles?.photo}`}
                                            alt=""
                                            className="profile__left__image"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={5}>
                                    <div className="profile__right">
                                        <div className="profile__right__info">
                                            <h2 className="profile__right__info__name">
                                                {profiles?.fullName}
                                            </h2>
                                            <div className="profile__right__info__email">
                                                <span>Email: </span>
                                                {profiles?.accountName}
                                            </div>
                                            <div className="profile__right__info__account">
                                                <span>Account Name: </span>
                                                {profiles?.accountName}
                                            </div>
                                            <div className="profile__right__info__account">
                                                <span>Date Of Birth: </span>
                                                {profiles?.birthDay ? dayjs(profiles.birthDay).format('DD-MM-YYYY') : 'N/A'}
                                            </div>
                                            <div className="profile__right__info__gender">
                                                <span>Gender: </span>
                                                {renderGender(profiles?.gender)}
                                            </div>
                                        </div>
                                        <div className="profile__right__btn">
                                            <ModalEditProfile
                                                profiles={profiles}
                                                setProfiles={setProfiles}
                                            />
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
