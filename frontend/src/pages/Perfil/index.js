import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Perfil() {
    const [gastos, setGastos] = useState([]);
    const history = useHistory();
    const userid = localStorage.getItem('userId');
    const username = localStorage.getItem('userName');

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: userid,
            }
        }).then(response => {
            setGastos(response.data);
        })
    }, [userid]);


    async function handleDeleteGasto(id){
        try{
            await api.delete(`gastos/${id}`, {
                headers: {
                    Authorization: userid,
                }
            })

            setGastos(gastos.filter(gasto => gasto.id !==    id))

        }catch{
            alert('Erro ao deletar caso.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>Bem-vindo {username}</span>

                <Link to="/gastos/novo" className="button"> Cadastrar novo gasto </Link>
                <button type="button" onClick={handleLogout}> <FiPower size="18" color="#E02041" /> </button>
            </header>
            <h1>Gastos Cadastrados</h1>
            <ul>
                {gastos.map(gasto => (
                    <li key={gasto.id}>
                    <strong>GASTO:</strong>
                    <p>{gasto.gasto}</p>

                    <strong>DATA:</strong>
                    <p>{gasto.data}</p>

                    <strong>VALOR: {Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(gasto.valor)}</strong>

                    <button type="button" onClick= {() => handleDeleteGasto(gasto.id)}>
                        <FiTrash2 size="20" color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>

    );
}