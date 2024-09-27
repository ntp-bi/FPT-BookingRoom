import React from "react";
import { Navigate } from "react-router-dom";
import { configPath } from "../config/configPath";

const ProtectedRouter = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to={configPath.login} />;
};

export default ProtectedRouter;
