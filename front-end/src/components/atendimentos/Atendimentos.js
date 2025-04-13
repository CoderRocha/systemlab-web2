import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

// styles
import styles from './Atendimentos.module.css';

// pages & components
import Navbar from '../../components/navbar/Navbar';

export default function Atendimentos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const successShown = useRef(false); // Add this ref

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchAtendimentos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/atendimentos`);
      setAtendimentos(response.data.reverse());
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
      toast.error('Erro ao carregar atendimentos!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtendimentos();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('success') === 'true' && !successShown.current) {
      successShown.current = true; // Mark as shown
      navigate('/atendimentos', { replace: true });
      setTimeout(() => {
        toast.success('Atendimento cadastrado com sucesso!', {
          style: {
            background: '#0097B2',
            color: '#fff'
          }
        })
      }, 100);
    }
  }, [location, navigate]);

  const handleClick = () => {
    navigate('/cadastraratendimento');
  };

  const handleDelete = async (numeroAtendimento) => {
    try {
      toast.success('Atendimento deletado com sucesso!', {
        style: {
          background: '#0097B2',
          color: '#fff'
        }
      })

      // update a lista de atendimentos e remove o atendimento deletado
      setAtendimentos(atendimentos.filter(atendimento => atendimento.numero_atendimento !== numeroAtendimento));
    } catch (error) {
      console.error('Erro ao deletar atendimento:', error);
      toast.error('Erro ao deletar atendimento!');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles.btn} onClick={handleClick}>
          Criar Novo Atendimento
        </button>
        <div className={styles.listContainer}>
          <h2>Listagem de Atendimentos</h2>
          <p>Lista de atendimentos cadastrados no sistema.</p>
          {loading ? (
            <p>Carregando atendimentos...</p>
          ) : atendimentos.length === 0 ? (
            <p>Não há atendimentos cadastrados.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Número do Atendimento</th>
                  <th>Nome do Paciente</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.map((atendimento) => (
                  <tr key={atendimento.numero_atendimento}>
                    <td>{atendimento.numero_atendimento}</td>
                    <td>{atendimento.nomePaciente}</td>
                    <td>
                      <button
                        className={styles.btndelete}
                        onClick={() => handleDelete(atendimento.numero_atendimento)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <br />
    </>
  );
}