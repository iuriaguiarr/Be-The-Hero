import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api'

export default function Register(){
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    function handleRegister(e) {
        e.preventDefault();
        const data = ({
            nome,
            email,
            password,
        });
        try{
            api.post('user', data);
            alert(`Cadastro realizado com sucesso!`);
            history.push('/');
        }catch{
            alert(`Erro no cadastro, tente novamente.`);
        }
            
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    
                    <input 
                        placeholder="Nome *" 
                        required
                        value={nome} 
                        onChange={e => setNome(e.target.value)} 
                    />

                    <input 
                        placeholder="E-mail *" 
                        required 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    
                    <input
                        placeholder="Senha *"
                        required
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}