import React from "react";
import { resetUserSession, getUser , getToken} from "./AuthService";
import { useNavigate } from 'react-router-dom';


const PremiumContent = () => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';
    const navigate = useNavigate(); 

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');

    }


    return (
        <div>
            Hello {name}! Youhave been loggined in !!! Welcome to premium content.<br/>
            <input type="button" value="Logout" onClick={logoutHandler}/>
        </div>
    )
}
export default PremiumContent;