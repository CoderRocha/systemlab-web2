import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaFlask, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; // Importando ícones
import styles from './Navbar.module.css';
import Logo from '../../assets/Systemlab-logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className={styles['navbar-container']}>
            {/* Logo */}
            <img
                src={Logo}
                alt="SystemLab Web Logo"
                className={styles['navbar-logo']}
                onClick={() => handleNavigate('/home')}
            />

            {/* Navbar */}
            <nav className={styles['navbar-nav']}>
                <ul className={styles['navbar-list']}>
                    <li className={styles['navbar-item']} onClick={() => handleNavigate('/atendimentos')}>
                        <FaClipboardList className={styles['navbar-icon']} />
                        <span className={styles['navbar-link']}>Atendimentos</span>
                    </li>
                    <li className={styles['navbar-item']} onClick={() => handleNavigate('/exames')}>
                        <FaFlask className={styles['navbar-icon']} />
                        <span className={styles['navbar-link']}>Exames</span>
                    </li>
                    <li className={styles['navbar-item']} onClick={() => handleNavigate('/relatorios')}>
                        <FaChartBar className={styles['navbar-icon']} />
                        <span className={styles['navbar-link']}>Relatórios</span>
                    </li>
                    <li className={styles['navbar-item']} onClick={() => handleNavigate('/')}>
                        <FaSignOutAlt className={styles['navbar-icon']} />
                        <span className={styles['navbar-link']}>Sair</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;