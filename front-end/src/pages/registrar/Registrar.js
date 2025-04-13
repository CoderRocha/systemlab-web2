import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// styles
import styles from './Registrar.module.css';
import Logo from '../../assets/Systemlab-logo.png';
import BackgroundImage from '../../assets/login-background.jpg';

function Registrar() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate form
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            toast.error('Por favor, preencha todos os campos!');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('As senhas não coincidem!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                username: formData.username,
                password: formData.password
            });

            if (response.data.success) {
                toast.success('Cadastro realizado com sucesso!', {
                    style: {
                        background: '#0097B2',
                        color: '#fff'
                    }
                });
                navigate('/');  // Navigate to login page
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Erro ao realizar cadastro.');
            console.error('Register error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={styles['register-page']}
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            <div className={styles['register-container']}>
                <form onSubmit={handleSubmit} className={styles['register-form']}>
                    <img src={Logo} alt="SystemLab Web Logo" className={styles['logo']} />
                    <h2>Criar Acesso</h2>
                    <label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            placeholder="Usuário"
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Senha"
                            required
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            placeholder="Confirmar Senha"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className={styles['btn']}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registrar;