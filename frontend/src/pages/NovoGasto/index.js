import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api'

export default function NovoGasto() {
    const userid = localStorage.getItem('userId')
    const [gasto, setGasto] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');
    const history = useHistory();

    async function handleNovoGasto(e) {

        e.preventDefault();

        try {
            
            const dados = { gasto, data, valor };

            await api.post('gastos', dados, {
                headers: {
                    Authorization: userid,
                }
            });
            history.push('/perfil');

        } catch(err){
            alert('Erro ao cadastrar caso.');
        }
    }

    return (
        <div className="NovoGasto-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo gasto</h1>
                    <p>Descreva o gasto detalhadamente para organizar as suas finanças</p>
                    <Link className="back-link" to="/Perfil">
                        <FiUser size={16} color="#e02041" />
                        Voltar para Perfil
                    </Link>
                </section>
                <form onSubmit={handleNovoGasto}>
                    <input
                        value={gasto}
                        onChange={e => setGasto(e.target.value)}
                        placeholder="Título do gasto *"
                        required

                    />
                    <input
                        value={data}
                        onChange={e => setData(e.target.value)}
                        placeholder="Data *"
                        required
                        type="text"
                    />

                    <input
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        placeholder="Valor *"
                        required
                        type="text"
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}