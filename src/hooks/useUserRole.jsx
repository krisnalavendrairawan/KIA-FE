import { useState, useEffect } from 'react';

const useUserRole = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Replace this with your actual logic to get the user role
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, []);

    return userRole;
};

export default useUserRole;
