import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

export default function AddProjeto() {
    const [descricao, setDescricao] = useState([]);
    const [msg, setMsg] = useState([]);

    async function criarProjeto() {
        if (descricao == "") {
            openModal("Descrição não pode estar em branco!");
        } else {
            await api.post('atividades/criarprojeto', {
                descricao: descricao
            });
            setDescricao('');
            openModal("Projeto Criado");
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
                <h1>Novo Projeto</h1>
                <NavLink to="/"><img src={BackIcon} alt="Voltar" width="50" /></NavLink>
            </div>
            <input placeholder="Descrição do projeto" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <button className="btn btn-big btn-confirm" onClick={criarProjeto}>Criar Projeto</button>
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