'use client';

import React, { useState } from 'react';
import { useLoader } from 'app/loader/Loader'; // Import useLoader for loading state
import './SignUpPage.css'; // Import the CSS file
import { signUp } from 'app/api/auth';


const SignUpPage: React.FC = () => {
    const { setLoading } = useLoader(); // Access loading state

    const [username, setUsername] = useState<string>(''); // State for username
    const [email, setEmail] = useState<string>(''); // State for email
    const [password, setPassword] = useState<string>(''); // State for password
    const [error, setError] = useState<string>(''); // State for error messages
    const [success, setSuccess] = useState<string>(''); // State for success messages

    // Function to handle sign-up
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signUp(username, email, password);
            setSuccess('Account created successfully!');
        } catch (err: any) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h1>PyCOSShield</h1>
            <h2>Strengthen Your Path to PCOS Wellness</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSignUp}>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create account</button>
            </form>
        </div>
    );
};

export default SignUpPage; // Export SignUpPage component