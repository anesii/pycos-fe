import axios from 'axios';

// Sign Up Function
const signUp = async (username, email, password) => {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        console.log(backendUrl);
        const response = await axios.post(backendUrl + '/api/auth', {
            username,
            email,
            password,
        });
        console.log(response);
    } catch (error) {
        console.error('Error signing up:', error.response.data);
    }
};

// Export the function for use in other parts of the application
export { signUp };