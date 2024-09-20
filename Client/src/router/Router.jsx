import React from "react";
import { Route, Routes } from "react-router-dom";

import { configPath } from "../config/configPath";

// PAGES
import Home from "../pages/home/Home";
import Reservation from "../pages/reservation/Reservation";
import RoomDetail from "../pages/room-detail/RoomDetail";
import ChangePassword from "../pages/change-password/ChangePassword";
import Schedule from "../pages/schedule/Schedule";
import ScheduleDetail from "../pages/schedule-detail/ScheduleDetail";
import History from "../pages/history/History";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";

const Router = () => {
    return (
        <Routes>
            <Route path={configPath.home} element={<Home />} />
            <Route path={configPath.reservation} element={<Reservation />} />
            <Route path={configPath.roomdetail} element={<RoomDetail />} />
            <Route
                path={configPath.changepassword}
                element={<ChangePassword />}
            />
            <Route path={configPath.schedule} element={<Schedule />} />
            <Route
                path={configPath.scheduledetail}
                element={<ScheduleDetail />}
            />
            <Route path={configPath.history} element={<History />} />
            <Route path={configPath.profile} element={<Profile />} />
            <Route path={configPath.login} element={<Login />} />
        </Routes>
    );
};

export default Router;
