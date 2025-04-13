import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//styles
import styles from './CadastrarExame.module.css';

//pages & components
import Navbar from '../../components/navbar/Navbar';

export default function CadastrarExame() {
  const navigate = useNavigate(); // redirecionar após o cadastro
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    valor: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // state para mensagem de erro

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codigoTrimmed = formData.codigo.trim(); // remover espaços antes e depois do código
    const descricaoTrimmed = formData.descricao.trim(); // remover espaços antes e depois da descrição

    // verifica se o código e a descrição são válidos (sem ser apenas espaços)
    if (!codigoTrimmed || !descricaoTrimmed) {
      setErrorMessage('O código e a descrição não podem ser apenas espaços.');
      return;
    }

    try {
      // verifica se o código já existe no sistema com um GET request
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/exames/${codigoTrimmed}`);

      // se o código já existir, ele retornará com status 200
      if (response.status === 200) {
        setErrorMessage('Este código de exame já está cadastrado.');
        return; // barra o cadastro se o código já existe
      }
    } catch (error) {
      // se o código não for encontrado (erro 404), prosseguir com o cadastro
      if (error.response && error.response.status === 404) {
        // aqui envia os dados para o backend, agora com os valores tratados com o trim
        const data = { ...formData, codigo: codigoTrimmed, descricao: descricaoTrimmed };
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/exames`, data);

        // redirect para a página de exames cadastrados
        navigate('/exames');
        return;
      }
      // caso ocorra algum outro erro inesperado
      setErrorMessage('Erro ao verificar se o exame já está cadastrado. Tente novamente!');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Cadastrar Exame</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Código do Exame</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleInputChange}
              required
              placeholder="Digite o código do exame"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Descrição</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              required
              placeholder="Digite a descrição do exame"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Valor</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              step="0.01"
              required
              placeholder="Digite o valor do exame"
            />
          </div>
          <button type="submit" className={styles.btn}>
            Salvar Exame
          </button>
        </form>
      </div>
    </>
  );
}