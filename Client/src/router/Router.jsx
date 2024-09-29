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

import ProtectedRouter from "./../protected-router/ProtectedRouter";

const Router = () => {
    return (
        <Routes>
            <Route path={configPath.login} element={<Login />} />

            <Route
                path={configPath.home}
                element={<ProtectedRouter element={<Home />} />}
            />
            <Route
                path={configPath.reservation}
                element={<ProtectedRouter element={<Reservation />} />}
            />
            <Route
                path={configPath.roomdetail}
                element={<ProtectedRouter element={<RoomDetail />} />}
            />
            <Route
                path={configPath.changepassword}
                element={<ProtectedRouter element={<ChangePassword />} />}
            />
            <Route
                path={configPath.schedule}
                element={<ProtectedRouter element={<Schedule />} />}
            />
            <Route
                path={configPath.scheduledetail}
                element={<ProtectedRouter element={<ScheduleDetail />} />}
            />
            <Route
                path={configPath.history}
                element={<ProtectedRouter element={<History />} />}
            />
            <Route
                path={configPath.profile}
                element={<ProtectedRouter element={<Profile />} />}
            />
        </Routes>
    );
};

export default Router;
