import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';

import './style.css';

import api from '../../services/api'

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

export default function Home() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    api.get('atividades/projetos').then(response => {
      setProjetos(response.data);
    });
  }, []);


  // pega o id do projeto/atividade a ser deletado
  const [idReference, setIdReference] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState([]);
  const [type, setType] = useState([])

  //confirmação para deletar atividades
  function deletarAtividade(idAtividade) {
    setIdReference(idAtividade)
    setModalOpen(true);
    setType("removeAtividade");
    setMsg("Tem certeza que deseja deletar esta atividade?");
  }

  //confirmação para deletar projetos
  function deletarProjeto(idProjeto) {
    setIdReference(idProjeto)
    setModalOpen(true);
    setType("removeProjeto");
    setMsg("Você ira deletar todas as atividades presentes nele. Tem certeza que deseja deletar este projeto? ");
  }

  //deleta projeto ou atividade
  async function remover() {
    if (type == "removeAtividade") {

      await api.delete(`atividades/deletaratividade/${idReference}`);
      api.get('atividades/projetos').then(response => {
        setProjetos(response.data);
      });

    } else if (type == "removeProjeto") {

      await api.delete(`atividades/deletarprojeto/${idReference}`);
      const reloadProjetos = projetos.filter(projeto => projeto.id !== idReference)
      setProjetos(reloadProjetos);
    }

    setType('');
    setIdReference('');
    setModalOpen(false);
  }


  return (
    <>
      <div className="header">
        <h1>Bem vindo a seus projetos</h1>
        <NavLink to="/addprojeto" className="novo-projeto">
          Novo projeto
        </NavLink>
      </div>

      {
        projetos.map(projeto => (
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemButton>
                <div className="projeto-desc">
                  {projeto.descricao}
                </div>
                <div className="options">
                  <NavLink to={'/addatividade/' + projeto.id}><MdAddCircle className="add" title="Adicionar Atividade" /></NavLink>
                  <NavLink to={'/editarprojeto/' + projeto.id}><MdEdit className="edit" title="Editar Projeto" /></NavLink>
                  <MdDelete onClick={() => deletarProjeto(projeto.id)} className="delete" title="Deletar Projeto" />
                </div>
              </AccordionItemButton>
              {
                projeto.atividades.map(atividade => (
                  <AccordionItemPanel>
                    <div className="atividades">
                      {atividade.descricao} | {atividade.data}
                      <div className="options">
                        <NavLink to={'/editaratividade/' + atividade.id}><MdEdit className="edit" title="Editar Atividade" /></NavLink>
                        <MdDelete onClick={() => deletarAtividade(atividade.id)} className="delete" title="Deletar Atividade" />
                      </div>
                    </div>
                  </AccordionItemPanel>
                ))
              }
            </AccordionItem>
          </Accordion>
        ))
      }

      <Modal
        isOpen={modalOpen}
        style={customStyles}
      >
        <h3>{msg}</h3>
        <button className="btn btn-small btn-confirm" onClick={remover}>Sim</button>
        <button className="btn btn-small btn-cancel" onClick={() => setModalOpen(false)}>Não</button>
      </Modal>
    </>
  )
}