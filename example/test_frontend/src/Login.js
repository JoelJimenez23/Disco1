import React, {useState} from "react";
import axios from "axios";
import { setUserSession, getUser, getToken } from "./AuthService";
import { useNavigate } from 'react-router-dom';

const loginUrl = 'https://ojutnsxcek.execute-api.us-east-1.amazonaws.com/prod/login'
const api_key = 'xqzfpqCmsB94MI7JLQATTaHg7ArdI0mM2KaHSWOl';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate(); 

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === ''){
            setErrorMessage('Both username and password are required');
            return;
        }
        setErrorMessage(null); 
        console.log('submit button is pressed!')

        const userInfo = {
            username: username,
            password: password
        }
        const json_data = {
            httpMethod: 'POST',
            path: '/login',
            body: JSON.stringify(userInfo)
        }
        const headers = {
            'x-api-key':api_key,
            'Content-Type': 'application/json'
        };
        const method = 'POST';

        axios({
            method: method,
            url: loginUrl,
            data : json_data,
            headers : headers
        }).then(response => {
            const data = JSON.parse(response.data.body);
            setUserSession(data.user, data.token);
            navigate('/premium-content');
            setErrorMessage('Login Successfull');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 401) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('sorry... the backend server is down, please try again later!!!');
            }
        });
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Login</h5>
                username: <input type='text' value={username} onChange={event => setUsername(event.target.value)}/>
                password: <input type='password' value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="submit" value="Login"/>
            </form>
            {errorMessage && <p className="message">{errorMessage}</p>}
        </div>
    )
}

export default Login;