import React, {useState} from 'react';
import axios from "axios";

const registerUrl = 'https://ojutnsxcek.execute-api.us-east-1.amazonaws.com/prod/register'
const api_key = 'xqzfpqCmsB94MI7JLQATTaHg7ArdI0mM2KaHSWOl';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === ''){
            setMessage('All fields are required');
            return;
        }
        setMessage(null);
        console.log('submit button is pressed!');

        const userInfo = {
            name: name,
            username: username,
            email: email,
            password: password
        }

        const json_data = {
            httpMethod: 'POST',
            path: '/register',
            body: JSON.stringify(userInfo) 
        }

        const headers = {
            'x-api-key': api_key,
            'Content-Type': 'application/json'
        };
        const method = 'POST';

        axios({
            method: method,
            url: registerUrl,
            data : json_data,
            headers : headers
        }).then(response => {
            console.log(response);
            setMessage('Registration Successful');
        }).catch(error => {
            console.error('Error al realizar la solicitud: ',error);
        });

    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)}/><br/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)}/> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/><br/>
                password: <input type="text" value={password} onChange={event => setPassword(event.target.value)}/><br/>
                <input type="submit" value="Register"/>
            </form>
            {message && <p className='message'>{message}</p>}
        </div>
    )
}

export default Register;