import './RecuperarSenha.css'
import Logo from '../../img/mainLogo.png'

const RecuperarSenha = () => {
    return (
        <section className='main-recuperarSenha-container'>
            <div className="recuperarSenha-container">
                <img src={Logo} alt="logoGasFinder"/>
                
                <form className='formulario-email-e-botao'>
                    <h2>RECUPERAR SENHA</h2>
                    <input className='campo-recuperar-senha'type='email' placeholder='E-mail de recuperação' required/>
                    <button className='botao-recuperar-senha'>Redefinir Senha</button>
                    <a href='/login'>Voltar para tela de Login</a>
                </form>
            </div>
        </section>
    )

}

export default RecuperarSenha;