import React, { useState } from "react";
import "../register.css";

export default function Register() {
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [nomeErro, setNomeErro] = useState(false);
  const [emailErro, setEmailErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameValidate = () => {
    setNomeErro(nome.trim().length < 3);
  };

  const emailValidate = () => {
    setEmailErro(!emailRegex.test(email.trim()));
  };

  const senhaValidate = () => {
    setSenhaErro(senha.length < 8);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    nameValidate();
    emailValidate();
    senhaValidate();
  
    if (nome.trim().length >= 3 && emailRegex.test(email) && senha.length >= 8) {
      try {
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name:nome, email, pass:senha }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message);
      
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Erro ao registrar");
      }
    }
  };
  return (
    <>    
       <nav>
          <img src="logof.png" alt="" />
          <p><a href="http://localhost:3000/quiz-algorithm">Quiz</a></p>
          <p><a href="http://localhost:3000/">Login</a></p>
          <p><a href="http://localhost:3000/profile">Perfil</a></p>
        </nav>

       <div className="body_register">
    <main className="container">
      <form id="form" onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <div className="input-box">
          <input
            id="nome"
            name="nome"
            placeholder="Nome"
            type="text"
            className={`inputs required ${nomeErro ? "error" : ""}`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onBlur={nameValidate}
            required
          />
          <i className="bx bxs-user"></i>
          {nomeErro && (
            <span className="span-required">
              O nome deve ter no mínimo 3 caracteres.
            </span>
          )}
        </div>

        <div className="input-box">
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            className={`inputs required ${emailErro ? "error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={emailValidate}
            required
          />
          <i className="bx bxs-envelope"></i>
          {emailErro && (
            <span className="span-required">Digite um email válido.</span>
          )}
        </div>

        <div className="input-box">
          <input
            id="senha"
            name="senha"
            placeholder="Senha"
            type="password"
            className={`inputs required ${senhaErro ? "error" : ""}`}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onBlur={senhaValidate}
            required
          />
          <i className="bx bxs-lock-alt"></i>
          {senhaErro && (
            <span className="span-required">
              A senha deve conter no mínimo 8 caracteres.
            </span>
          )}
        </div>

        <button type="submit" className="cadastrar">
          Cadastrar
        </button>
      </form>
    </main>
    </div>
    </>
  );
}
