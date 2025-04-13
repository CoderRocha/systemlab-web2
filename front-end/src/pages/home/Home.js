import React from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import styles from './Home.module.css';

//pages & components
import Navbar from '../../components/navbar/Navbar';
import UserBar from '../../components/userBar/UserBar';
import Footer from '../../components/footer/Footer';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Navbar />
            <UserBar />
            <div className={styles['home-container']}>
                <section
                    className={`${styles['home-section']} ${styles['atendimentos']}`}
                    onClick={() => handleNavigate('/atendimentos')}
                >
                    <h2>Atendimentos</h2>
                </section>

                <section
                    className={`${styles['home-section']} ${styles['exames']}`}
                    onClick={() => handleNavigate('/exames')}
                >
                    <h2>Exames</h2>
                </section>

                <section
                    className={`${styles['home-section']} ${styles['relatorios']}`}
                    onClick={() => handleNavigate('/relatorios')}
                >
                    <h2>Relatórios</h2>
                </section>

                <section
                    className={`${styles['home-section']} ${styles['sair']}`}
                    onClick={() => handleNavigate('/')}
                >
                    <h2>Sair</h2>
                </section>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </>
    );
};

export default Home;