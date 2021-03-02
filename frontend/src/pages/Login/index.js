import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        

        try{
            const response = await api.post('sessions', {email,password})

            localStorage.setItem('userId',response.data.id)
            localStorage.setItem('userName',response.data.nome)

            history.push('/perfil');
            
        }catch{
            alert('Falha no login, tente novamente.')
        }

        
    }
    
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>

                    <h1>Faça seu Login</h1>
                    
                    <input 
                        placeholder="Seu e-mail *" 
                        type="email" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value) }
                    />
                    
                    <input 
                        placeholder="Seu senha *" 
                        type="password" 
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value) }
                    />

                    <button className="button" type="submit">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            
            <img src={heroesImg} alt="heroes" />
        </div>
    );
}