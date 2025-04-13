import React from 'react';

//styles
import styles from './UserBar.module.css';

const UserBar = () => {
    return (
        <div className={styles['userbar-container']}>
            <span className={styles['user-info']}>
                <strong>Usuário:</strong> <span className={styles['user-name']}>Guilherme Rocha</span>
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