import React, { useEffect, useState } from "react";
import axios from "axios";

function WhatLanguage() {
  const [languageOfDay, setLanguageOfDay] = useState(null);
  const [input, setInput] = useState("");
  const [historico, setHistorico] = useState([]);

  const [trys, setTrys] = useState(0);
  const [blurOn, setBlurOn] = useState(false);
  const [grayOn, setGrayOn] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input.trim().length === 0) {
      setSuggestions([]);
      return;
    }
  
    axios
      .get(`http://localhost:3001/autocomplete-language?q=${input}`)
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch(() => setSuggestions([]));
  }, [input]);
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/language-of-the-day")
      .then((response) => setLanguageOfDay(response.data))
      .catch((error) =>
        console.error("Erro ao buscar linguagem do dia", error)
      );
  }, []);

  const verifyLanguage = () => {
    if (!input.trim()) return;

    if (input.toLowerCase() === languageOfDay.name.toLowerCase()) {
      alert("Parabéns!");
    }

    setHistorico((prev) => [...prev, input]);
    setInput("");
    setTrys((prev) => prev + 1);
  };
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };
  
  const styleImage = {
    filter: `
      ${grayOn ? "grayscale(0%)" : "grayscale(100%)"}
      ${blurOn ? `blur(${30 - trys * 5}px)` : "blur(30px)"}
    `,
  };

  if (!languageOfDay) return <p>Carregando linguagem do dia...</p>;

  return (
    <div className="fundo">
       <nav className="nav">
          <img src=" " alt="" />
          <p><a href="http://localhost:3000/quiz-algorithm">Quiz</a></p>
          <p><a href="http://localhost:3000/">Login</a></p>
          <p><a href="http://localhost:3000/profile">Perfil</a></p>
        </nav>

      <div className="guia_quiz_horizontal">
        <ul>
          <li><a href="http://localhost:3000/quiz-algorithm"><img src="hamsterMatriz.jpg" alt="algorithm" /></a></li>
          <li><a href="http://localhost:3000/quiz-language"><img src="hamsterMatriz.jpg" alt="language" /></a></li>
          <li><a href="http://localhost:3000/quiz-error"><img src="hamsterMatriz.jpg" alt="code" /></a></li>
        </ul>
      </div>

      <div className="question">
        <h2>Qual a linguagem de programação que aparece nesta foto?</h2>
        <p>Escreva um caracter qualquer para começar</p>
      </div>

      <div className="div_imageOfDay">
        <img
          src={languageOfDay.image_path} 
          alt="Linguagem do Dia"
          style={styleImage}
        />
      </div>

      <div className="botoes">
        <label className="switch">
        <p>Exibir cores</p>
          <input type="checkbox" checked={grayOn} onChange={() => setGrayOn(!grayOn)}/>
          <span className="slider round"></span>
        </label>
        <p>Foca a cada tentativa</p>
        <label className="switch">
            <input type="checkbox"checked={blurOn}onChange={() => setBlurOn(!blurOn)}/>
          <span className="slider round"></span>
        </label>
      </div>

      <div className="input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={verifyLanguage}>Clique</button>
        {suggestions.length > 0 && (
         <ul className="suggestions-list">
            {suggestions.map((sug, index) => (
            <li key={index} onClick={() => handleSuggestionClick(sug)}>
            {sug}
            </li>
            ))}
        </ul>
)}

      </div>

      <div id="certo">
        <div className="table_answer">
          <div className="div_resposta">
            <table className="quadros">
              <tbody>
                {historico.map((guess, index) => (
                  <tr key={index}>
                    <td
                      className={
                        guess.toLowerCase() ===
                        languageOfDay.name.toLowerCase()
                          ? "boxColorCorrect"
                          : "boxColorIncorrect"
                      }
                    >
                      {guess}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="div_git">
        <p>
          Confira nosso código no gitHub{" "}
          <a href="https://github.com/MariMeng/dle_computacao">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="github"
            />
          </a>
        </p>
      </div>
    </div>
  );
}

export default WhatLanguage;
