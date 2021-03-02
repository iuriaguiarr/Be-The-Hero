import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'
import NovoGasto from './pages/NovoGasto'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>

                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/gastos/novo" component={NovoGasto} />
            </Switch>
        </BrowserRouter>
    )
}