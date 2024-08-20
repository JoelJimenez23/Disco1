import React from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from "./AuthService";


const ExperimentRoute = () => {
    const isAuthenticated = () => {
        return getToken() !== null;
    };

    return isAuthenticated() ? <Outlet/> : <Navigate to="/login"/>; 
}

export default ExperimentRoute;
