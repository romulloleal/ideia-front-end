import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Modal from 'react-modal';

import api from '../../services/api';

import BackIcon from '../../assets/arrowleft.png';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export default function EditarProjeto() {
  let { id } = useParams();

  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    api.get(`atividades/filtrarProjeto/${id}`).then(response => {
      setProjetos(response.data);
    });
  }, []);

  const [descricao, setDescricao] = useState([]);
  const [msg, setMsg] = useState([]);

  async function editarAtividade() {
    if (descricao == "") {
      openModal("Descrição não pode estar em branco!");
    } else {
      const response = await api.put(`atividades/editarprojeto/${id}`, {
        descricao: descricao
      });
      setProjetos([response.data]);
      setDescricao('');
      openModal("Projeto Editado");
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  function openModal(msg) {
    setModalOpen(true);
    setMsg(msg)
  }
  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="header">
        <h1>Editar Projeto: {projetos.map(projeto => projeto.descricao)}</h1>
        <NavLink to="/"><img src={BackIcon} alt="Voltar" width="50" /></NavLink>
      </div>
      <input placeholder="Nova descrição do projeto" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <button className="btn btn-big btn-confirm" onClick={editarAtividade}>Editar Projeto</button>
      <Modal
        isOpen={modalOpen}
        style={customStyles}
      >
        <h3>{msg}</h3>
        <button className="btn btn-small btn-confirm" onClick={closeModal}>Ok</button>
      </Modal>
    </>
  )
}