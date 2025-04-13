import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import styles from './ErrorPage.module.css';

function ErrorPage() {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error('Página não encontrada!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Página não encontrada</h2>
                <p className={styles.message}>
                    A página que você está procurando não existe ou foi removida.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className={styles.btn}
                >
                    Voltar para página inicial
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;