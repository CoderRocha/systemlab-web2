import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import styles from './UserBar.module.css';

const UserBar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no user data found
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className={styles['userbar-container']}>
            <span className={styles['user-info']}>
                <strong>Usuário:</strong> 
                <span className={styles['user-name']}>
                    {user ? user.username : 'Carregando...'}
                </span>
            </span>
            <span className={styles['user-unit']}>
                <strong>Unidade:</strong>
                <select className={styles['user-select']} defaultValue="MAT - MATRIZ">
                    <option value="MAT - MATRIZ">MA - MATRIZ</option>
                    <option value="UNIT2">UN2 - UNIDADE 2</option>
                    <option value="UNIT3">UN3 - UNIDADE 3</option>
                </select>
            </span>
        </div>
    );
};

export default UserBar;