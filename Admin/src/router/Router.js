import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ChangePassword from "../pages/change-password/ChangePassword";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";

// import Rooms
import Room from "../pages/rooms/mainRoom/Room.jsx";
import AddRoom from "../pages/rooms/addRoom/AddRoom.jsx";
import UpdateRoom from "../pages/rooms/updateRoom/UpdateRoom.jsx";
import DetailRoom from "../pages/rooms/detailRoom/DetailRoom.jsx";

// import Types Room
import TypeRoom from "../pages/type-rooms/mainTypeRoom/TypeRoom.jsx";
import AddTypeRoom from "../pages/type-rooms/addTypeRoom/AddTypeRoom.jsx";
import UpdateTypeRoom from "../pages/type-rooms/updateTypeRoom/UpdateTypeRoom.jsx";

// import Events
import Event from "../pages/events/mainEvent/Event.jsx";
import AddEvent from "../pages/events/addEvent/AddEvent.jsx";
import UpdateEvent from "../pages/events/updateEvent/UpdateEvent.jsx";

// import Teachers
import Teacher from "../pages/teachers/mainTeacher/Teacher.jsx";
import AddTeacher from "../pages/teachers/addTeacher/AddTeacher.jsx";
import UpdateTeacher from "../pages/teachers/updateTeacher/UpdateTeacher.jsx";

// import Accounts
import Account from "../pages/accounts/mainAccount/Account.jsx";
import AddAccount from "../pages/accounts/addAccount/AddAccount.jsx";
import UpdateAccount from "../pages/accounts/updateAccount/UpdateAccount.jsx";

// import History
import History from "../pages/historybooking/mainHistory/History.jsx";
import DetailHistory from "../pages/historybooking/detailHistory/DetailHistory.jsx";

// import Report
import Report from "../pages/reports/mainRReport/Report.jsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<ProtectedRoute element={<Home />} />} />

            {/* Rooms */}
            <Route path="/rooms" element={<ProtectedRoute element={<Room />} />} />
            <Route
                path="/rooms/add-room"
                element={<ProtectedRoute element={<AddRoom />} />}
            />
            <Route
                path="/rooms/update-room/:roomId"
                element={<ProtectedRoute element={<UpdateRoom />} />}
            />
            <Route
                path="/rooms/detail-room/:roomId"
                element={<ProtectedRoute element={<DetailRoom />} />}
            />

            {/* Type Room */}
            <Route path="/types" element={<ProtectedRoute element={<TypeRoom />} />} />
            <Route
                path="/types/add-type"
                element={<ProtectedRoute element={<AddTypeRoom />} />}
            />
            <Route
                path="/types/update-type/:typeId"
                element={<ProtectedRoute element={<UpdateTypeRoom />} />}
            />

            {/* Events */}
            <Route path="/events" element={<ProtectedRoute element={<Event />} />} />
            <Route
                path="/events/add-event"
                element={<ProtectedRoute element={<AddEvent />} />}
            />
            <Route
                path="/events/update-event/:eventId"
                element={<ProtectedRoute element={<UpdateEvent />} />}
            />

            {/* Teachers */}
            <Route path="/teachers" element={<ProtectedRoute element={<Teacher />} />} />
            <Route
                path="/teachers/add-teacher"
                element={<ProtectedRoute element={<AddTeacher />} />}
            />
            <Route
                path="/teachers/update-teacher/:teacherId"
                element={<ProtectedRoute element={<UpdateTeacher />} />}
            />

            {/* Accounts */}
            <Route path="/accounts" element={<ProtectedRoute element={<Account />} />} />
            <Route
                path="/accounts/add-account"
                element={<ProtectedRoute element={<AddAccount />} />}
            />
            <Route
                path="/accounts/update-account/:accountId"
                element={<ProtectedRoute element={<UpdateAccount />} />}
            />

            {/* History */}
            <Route path="/histories" element={<ProtectedRoute element={<History />} />} />
            <Route
                path="/histories/detail-history/:historyId"
                element={<ProtectedRoute element={<DetailHistory />} />}
            />

            {/* Report */}
            <Route path="/reports" element={<ProtectedRoute element={<Report />} />} />

            <Route path="/login" element={<Login />} />
            <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
    );
};

export default Router;
