import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddProjeto from './pages/AddProjeto';
import EditarProjeto from './pages/EditarProjeto';
import AddAtividade from './pages/AddAtividade';
import EditarAtividade from './pages/EditarAtividade';
import NoMatch from './pages/NoMatch';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/addprojeto" component={AddProjeto} />
        <Route path="/editarprojeto/:id" component={EditarProjeto} />
        <Route path="/addatividade/:id" component={AddAtividade} />
        <Route path="/editaratividade/:id" component={EditarAtividade} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </BrowserRouter>
  )
}