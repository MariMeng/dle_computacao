import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // se estiver usando react-router-dom
import "../login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate(); // para redirecionar após login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Salva usuário
        alert("Login bem-sucedido!");
        navigate("/profile"); // redireciona para a página de perfil
      } else {
        alert(data.message || "Erro no login");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <>
       <nav className="nav">
          <img src="logof.png" alt="" />
          <p><a href="http://localhost:3000/quiz-algorithm">Quiz</a></p>
          <p><a href="http://localhost:3000/">Login</a></p>
          <p><a href="http://localhost:3000/profile">Perfil</a></p>
        </nav>

      <div className="body_login">
        <main className="container_login">
          <form onSubmit={handleSubmit}>
            <h1>DLE Computação</h1>

            <div className="input-box_login">
              <input
                placeholder="Usuário"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box_login">
              <input
                placeholder="Senha"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className="remember-forgot_login">
              <label>
                <input type="checkbox" />
                Lembrar senha
              </label>
              <a href="#">Esqueci a senha</a>
            </div>

            <button type="submit" className="login">
              Login
            </button>

            <div className="register-link_login">
              <p>
                Não tem uma conta?{" "}
                <a href="http://localhost:3000/register">Cadastre-se</a>
              </p>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
