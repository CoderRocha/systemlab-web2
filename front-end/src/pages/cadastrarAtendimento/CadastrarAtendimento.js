import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// styles
import styles from './CadastrarAtendimento.module.css';
import { RiCloseCircleLine } from 'react-icons/ri'; // Importe o ícone

// pages & components
import Navbar from '../../components/navbar/Navbar';

export default function CadastrarAtendimento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    sexo: '',
    email: '',
    celular: '',
    exames: [],
  });

  const [novoExame, setNovoExame] = useState('');
  const [numeroAtendimento, setNumeroAtendimento] = useState(null); // state para o número de atendimento
  const [loading, setLoading] = useState(false); // state para exibir "Carregando..."

  const backendUrl = process.env.REACT_APP_BACKEND_URL; // URL do backend do .env

  useEffect(() => {
    // gera o número de atendimento apenas uma vez
    const numero = Math.floor(1000 + Math.random() * 9000);
    setNumeroAtendimento(numero);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExame = async () => {
    const exameTrimmed = novoExame.trim(); // remove os espaços extras

    if (exameTrimmed) { // verifica se o exame não é vazio após o trim()
      try {
        // verifica se o exame existe no sistema
        const response = await axios.get(`${backendUrl}/exames/${exameTrimmed}`);

        if (response.status === 200) {
          // verifica se o exame já foi adicionado (tratando case-sensitive e espaços em branco)
          const exameJaExiste = formData.exames.some(
            (exame) => exame.trim().toLowerCase() === exameTrimmed.toLowerCase()
          );

          if (!exameJaExiste) {
            setFormData({ ...formData, exames: [...formData.exames, exameTrimmed] });
            setNovoExame(''); // clear o campo
          } else {
            alert('Este exame já foi adicionado à lista.');
          }
        }
      } catch (error) {
        alert('Código de exame inválido ou não encontrado.');
      }
    } else {
      alert('Por favor, insira um código de exame válido.');
    }
  };


  // remover o exame
  const handleRemoveExame = (exame) => {
    setFormData({
      ...formData,
      exames: formData.exames.filter((e) => e !== exame),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // define o state como "carregando"

    // validação com o trim para garantir que os campos não estejam vazios ou apenas com espaços
    if (
      !formData.nomePaciente.trim() ||
      !formData.sexo.trim() ||
      !formData.email.trim() ||
      !formData.celular.trim()
    ) {
      alert('Por favor, preencha todos os campos corretamente.');
      setLoading(false);
      return;
    }

    const atendimentoData = {
      numeroAtendimento,
      ...formData,
    };

    try {
      // request POST para o backend
      await axios.post(`${backendUrl}/atendimentos`, atendimentoData);

      // redirect para a página de atendimentos após salvar
      navigate('/atendimentos');
    } catch (error) {
      console.error('Erro ao salvar atendimento:', error);
      alert('Ocorreu um erro ao salvar o atendimento. Tente novamente.');
    } finally {
      setLoading(false); // finaliza o state de carregamento
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Cadastrar Atendimento</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Número do Atendimento</label>
            <input
              type="text"
              value={numeroAtendimento}
              readOnly
              className={styles.readOnlyInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nome do Paciente</label>
            <input
              type="text"
              name="nomePaciente"
              value={formData.nomePaciente}
              onChange={handleInputChange}
              required
              placeholder="Digite o nome do paciente"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o Sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Digite o email do paciente"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Celular</label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              required
              placeholder="Digite o número de celular do paciente"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Cadastrar Exames</label>
            <div className={styles.exameInputGroup}>
              <input
                type="text"
                value={novoExame}
                onChange={(e) => setNovoExame(e.target.value)}
                placeholder="Código do exame"
              />
              <button
                type="button"
                onClick={handleAddExame}
                className={styles.addExameBtn}
              >
                Adicionar
              </button>
            </div>
            <ul className={styles.exameList}>
              {formData.exames.map((exame, index) => (
                <li className={styles.liexame} key={index}>
                  {exame}
                  <RiCloseCircleLine
                    className={styles.removeExameBtn}
                    onClick={() => handleRemoveExame(exame)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className={styles.btn}
            disabled={loading} // desabilita o botão durante o carregamento
          >
            {loading ? 'Salvando...' : 'Salvar Atendimento'}
          </button>
        </form>
      </div>
    </>
  );
}