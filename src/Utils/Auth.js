const getToken = () => localStorage.getItem("token");

export const isAuthenticated = async () => {
    const token = getToken();
    if (!token) {
        return false;
    }

    try {
        const response = await fetch("/api/auth/validate-token", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Token validation failed");
        }

        const data = await response.json();
        return data.isValid;
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
};

export const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });
    return response;
};
