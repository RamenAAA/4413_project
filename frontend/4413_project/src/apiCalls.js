
const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_PORT;

export const fetchProducts = async (category, brand) => {
    try {
        let url = `http://${host}:${port}/api/v1/products`;

        // filter by category or brand
        if (category !== 'all') {
            url += '/filter/category/' + category;
        } else if (brand !== 'all') {
            url += '/filter/brand/' + brand;
        }

        // fetch response from backend
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        // get data from response and return it
        return await response.json();
    } catch (error) {
        throw error; // Re-throw the error so it can be handled by the caller
    }
};

export const submitEdit = async (body, id) => {
    try {
        let url = `http://${host}:${port}/api/v1/products/${id}`;
        const response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export const submitEditUser = async (body) => {
    try {
        let url = `http://${host}:${port}/api/v1/users/updateUser`;
        const response = await fetch(url, {
            method: "PATCH",
            credentials: 'include',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteItem = async (id) => {
    try {
        let url = `http://${host}:${port}/api/v1/products/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export const getSaleHistory = async () => {
    try {
        let url = `http://${host}:${port}/api/v1/orders`;

        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        const resp = await response.json();
        return resp;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        let url = `http://${host}:${port}/api/v1/users/all/`;

        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        const resp = await response.json();
        return resp;
    } catch (error) {
        throw error;
    }
};

export const getUserHistory = async () => {
    try {
        let url = `http://${host}:${port}/api/v1/orders/showAllMyOrders`;

        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        const resp = await response.json();
        return resp;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        let url = `http://${host}:${port}/api/v1/auth/logout`;

        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('bad response');
        }
        return response;
    } catch (error) {
        throw error;
    }
};

