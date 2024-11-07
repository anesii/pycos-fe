'use client';

import React, { useState } from 'react';
import { useLoader } from 'app/loader/Loader'; // Import useLoader for loading state
import { useRouter } from 'next/navigation';
import './page.css'; // Import the CSS file


const AccountPage: React.FC = () => {
    const { setLoading } = useLoader(); // Access loading state
    const router = useRouter(); // Initialize router for navigation

    const [username, setUsername] = useState<string>(''); // State for username
    const [password, setPassword] = useState<string>(''); // State for password
    const [newPassword, setNewPassword] = useState<string>(''); // State for new password
    const [error, setError] = useState<string>(''); // State for error messages
    const [success, setSuccess] = useState<string>(''); // State for success messages

    // Function to handle username change
    const handleUsernameChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Call your API to update the username
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-username`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Failed to update username');
            }

            setSuccess('Username updated successfully!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle password change
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Call your API to update the password
            const response = await fetch('/api/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            setSuccess('Password updated successfully!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle logout
    const handleLogout = async () => {
        setLoading(true);
        try {
            // Call your API to log out
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            router.push('/login'); // Redirect to login page after logout
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="account-page">
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleUsernameChange}>
                <h2>Change Username</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="New Username"
                    required
                />
                <button type="submit">Update Username</button>
            </form>

            <form onSubmit={handlePasswordChange}>
                <h2>Change Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Current Password"
                    required
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                />
                <button type="submit">Update Password</button>
            </form>

            <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
    );
};

export default AccountPage; // Export AccountPage component