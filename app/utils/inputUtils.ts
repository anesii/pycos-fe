export function validateInput(data: any) {
    // Check required fields
    if (!data.age || data.age < 0) return false;
    if (!isValidEmail(data.email)) return false; // Example validation
    // Additional validations...
    return true;
}

export function sanitizeInput(data: any) {
    return {
        ...data,
        name: sanitizeString(data.name), // Sanitize strings
        // Other sanitizations...
    };
}

// Example helper functions
function isValidEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(email);
}

function sanitizeString(str: string) {
    return str.replace(/<[^>]*>/g, ''); // Remove HTML tags
}