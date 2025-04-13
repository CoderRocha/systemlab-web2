import React from 'react';

//styles
import styles from './Footer.module.css';
import FooterLogo from '../../assets/Footer-logo.png';

export default function Footer() {
    return (
        <div className={styles['footer-container']}>
            <img
                className={styles['footer-logo']}
                src={FooterLogo}
                alt="SystemLab Web Footer logo"
            />
            <footer>
                <p>©2025 SystemLab Web</p>
            </footer>
        </div>
    );
}