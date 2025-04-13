import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';

//styles
import styles from './Exames.module.css';

//pages & components
import Navbar from '../../components/navbar/Navbar';

export default function Exames() {
  const navigate = useNavigate();
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // buscar os exames
  const fetchExames = async () => {
    try {
      const response = await axios.get(`${backendUrl}/exames`);
      setExames(response.data.reverse());
    } catch (error) {
      console.error('Erro ao buscar exames:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExames();
  }, []);

  // deletar um exame
  const handleDelete = async (codigoExame) => {
    try {
      const response = await axios.delete(`${backendUrl}/exames/${codigoExame}`);
      if (response.status === 200) {
        setExames(exames.filter((exame) => exame.codigo !== codigoExame)); // remove o exame deletado da lista
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao deletar exame:', error);
    }
  };

  // exportar a tabela de exames para Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      exames.map(({ codigo, descricao, valor }) => ({ Código: codigo, Descrição: descricao, Valor: `R$ ${valor.toFixed(2)}` }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exames');
    XLSX.writeFile(wb, 'exames_cadastrados.xlsx');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={() => navigate('/cadastrarexame')}>Criar Novo Exame</button>

        {/* exportação para Excel (aparece apenas se houver exames) */}
        {exames.length > 0 && (
          <button className={styles['btnExcel']} onClick={downloadExcel}>
            <FaFileExcel size={24} style={{ marginRight: '8px' }} />
            Exportar Exames
          </button>
        )}

        <div className={styles.listContainer}>
          <h2>Exames Cadastrados</h2>
          <p>Lista de exames cadastrados no sistema</p>
          {loading ? (
            <p>Carregando exames...</p>
          ) : exames.length === 0 ? (
            <p>Não há exames cadastrados.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {exames.map((exame) => (
                  <tr key={exame.codigo}>
                    <td>{exame.codigo}</td>
                    <td>{exame.descricao}</td>
                    <td>{`R$ ${exame.valor.toFixed(2)}`}</td>
                    <td>
                      <button className={styles.btndelete} onClick={() => handleDelete(exame.codigo)}>
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