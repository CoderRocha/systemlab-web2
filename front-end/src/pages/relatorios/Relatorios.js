import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

// styles
import styles from './Relatorios.module.css';
import { FaFileExcel } from 'react-icons/fa';

// pages & components
import Navbar from '../../components/navbar/Navbar';

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false); // aqui controla a exibição do ícone de excel

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchRelatorios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/relatorios`);
      setRelatorios(response.data.reverse());
      setReportGenerated(true); // aqui marca que o relatório foi gerado
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchRelatorios(); // realiza a busca de relatórios novamente quando o botão for clicado
  };

  const downloadExcel = () => {
    // criar uma planilha do Excel a partir dos dados da tabela
    const ws = XLSX.utils.json_to_sheet(relatorios);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatórios');

    // gerar arquivo Excel e baixar
    XLSX.writeFile(wb, 'relatorio_atendimentos.xlsx');
  };

  const downloadDashboardExcel = () => {
    const dashboardData = [
      { Tipo: 'Total de Atendimentos', Quantidade: totalAtendimentos },
      { Tipo: 'Total de Exames', Quantidade: totalExames },
      { Tipo: 'Valor Total dos Exames', Quantidade: `R$ ${valorTotalExames.toFixed(2)}` },
      { Tipo: 'Ticket Médio', Quantidade: `R$ ${ticketMedio}` },
      ...atendimentosOrdenados.map(([sexo, quantidade]) => ({ Tipo: `Atendimentos - ${sexo}`, Quantidade: quantidade })),
      ...Object.entries(examesRealizados).map(([exame, quantidade]) => ({ Tipo: `Exames - ${exame}`, Quantidade: quantidade })),
    ];

    const ws = XLSX.utils.json_to_sheet(dashboardData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dashboard');

    XLSX.writeFile(wb, 'dashboards.xlsx');
  };


  // calcular os atendimentos totais
  const totalAtendimentos = relatorios.length;

  // ajuste para calcular corretamente o total de exames
  const totalExames = relatorios.reduce((acc, relatorio) => {
    if (relatorio.exames) {
      // verificar se 'exames' é uma string, e converter em array
      const examesArray = Array.isArray(relatorio.exames) ? relatorio.exames : relatorio.exames.split(',').map(exame => exame.trim());
      return acc + examesArray.length; // soma a quantidade de exames
    }
    return acc;
  }, 0);

  const valorTotalExames = relatorios.reduce((acc, relatorio) => acc + (relatorio.total_valor || 0), 0);

  // calcular os atendimentos por sexo
  const atendimentosPorSexo = relatorios.reduce((acc, relatorio) => {
    const sexo = relatorio.sexo || 'Não informado'; // Garante um valor padrão
    acc[sexo] = (acc[sexo] || 0) + 1;
    return acc;
  }, { Masculino: 0, Feminino: 0 }); // Inicializa com 0


  const atendimentosOrdenados = Object.entries(atendimentosPorSexo).sort(
    ([sexoA, quantidadeA], [sexoB, quantidadeB]) => quantidadeB - quantidadeA
  );

  // aqui calcula os exames realizados por código de exame
  const examesRealizados = relatorios.reduce((acc, relatorio) => {
    if (relatorio.exames) {
      const examesArray = Array.isArray(relatorio.exames) ? relatorio.exames : relatorio.exames.split(',').map(exame => exame.trim());
      examesArray.forEach(exame => {
        acc[exame] = (acc[exame] || 0) + 1;
      });
    }
    return acc;
  }, {});

  // add "Realizados: 0"  se não tiver exames realizados
  if (Object.keys(examesRealizados).length === 0) {
    examesRealizados["Realizados"] = '0';
  }

  // aqui funciona o cálculo do ticket médio
  const atendimentosComValor = relatorios.filter(relatorio => relatorio.total_valor != null && relatorio.total_valor > 0);
  const totalValorExamesComValor = atendimentosComValor.reduce((acc, relatorio) => acc + relatorio.total_valor, 0);
  const ticketMedio = atendimentosComValor.length > 0 ? (totalValorExamesComValor / atendimentosComValor.length).toFixed(2) : 0;


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <button className={styles['btn']} onClick={handleClick}>
          Gerar Relatórios
        </button>

        {/* baixar o Excel (apenas quando o relatório for gerado) */}
        {reportGenerated && (
          <button className={styles['btnExcel']} onClick={downloadExcel}>
            <FaFileExcel size={24} style={{ marginRight: '8px' }} />
            Exportar Relatório
          </button>
        )}

        <div className={styles.listContainer}>
          <h2>Relatório Geral de Atendimentos</h2>
          <p>Relatório detalhado de todos os atendimentos cadastrados no sistema.</p>
          {loading ? (
            <p>Carregando relatórios...</p>
          ) : relatorios.length === 0 ? (
            <p>Não há relatórios disponíveis.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Código do Paciente</th>
                  <th>Nome Completo</th>
                  <th>Sexo</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Exames Cadastrados</th>
                  <th>Valor Total R$</th>
                </tr>
              </thead>
              <tbody>
                {relatorios.map((relatorio, index) => (
                  <tr key={index}>
                    <td>{relatorio.codigo_paciente}</td>
                    <td>{relatorio.nome_completo}</td>
                    <td>{relatorio.sexo}</td>
                    <td>{relatorio.email}</td>
                    <td>{relatorio.celular}</td>
                    <td>{relatorio.exames ? relatorio.exames : 'Nenhum'}</td>
                    <td>{relatorio.total_valor != null ? `R$ ${relatorio.total_valor.toFixed(2)}` : 'Sem valor'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Grids parecidas com um Power BI */}
        <div className={styles.listContainer}>
          <h2>Dashboards</h2>
          <p>Relatório com todos os indicadores do negócio, incluindo atendimentos, exames realizados e faturamento.</p>
          {/* exibir mensagem quando não houver relatórios gerados igual no relatório acima */}
          {!reportGenerated && <p>É necessário gerar o "Relatório Geral de Atendimentos" primeiro para poder ter acesso aos Dashboards.</p>}
        </div>

        {/* mostrar o botão de export apenas quando o relatório for gerado */}
        {reportGenerated && (
          <div>
            <button className={`${styles.btnExcel}`} onClick={downloadDashboardExcel}>
              <FaFileExcel size={24} style={{ marginRight: '8px' }} />
              Exportar Dashboards
            </button>
          </div>
        )}
        {reportGenerated && (
          <div className={styles.grids}>
            <div className={styles.gridItem}>
              <h3>Total de Atendimentos</h3>
              <p>{totalAtendimentos}</p>
            </div>
            <div className={styles.gridItem}>
              <h3>Total de Exames</h3>
              <p>{totalExames}</p>
            </div>
            <div className={styles.gridItem}>
              <h3>Valor Total dos Exames</h3>
              <p>{`R$ ${valorTotalExames.toFixed(2)}`}</p>
            </div>
            <div className={`${styles.gridItem} ${styles.gridItem2}`}>
              <h3>Atendimentos por Sexo</h3>
              {atendimentosOrdenados.map(([sexo, quantidade]) => (
                <p key={sexo}>{`${sexo}: ${quantidade}`}</p>
              ))}
            </div>
            <div className={`${styles.gridItem} ${styles.gridItem2}`}>
              <h3>Exames Realizados</h3>
              {Object.entries(examesRealizados).map(([exame, quantidade]) => (
                <p key={exame}>{`${exame}: ${quantidade}`}</p>
              ))}
            </div>
            <div className={`${styles.gridItem} ${styles.gridItem2}`}>
              <h3>Ticket Médio</h3>
              <p>{`R$ ${ticketMedio}`}</p>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
    </>
  );
}