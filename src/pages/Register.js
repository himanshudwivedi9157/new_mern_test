import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { firstName, lastName, email, password });
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
