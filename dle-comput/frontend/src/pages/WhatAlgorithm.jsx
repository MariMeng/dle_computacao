import React, { useEffect, useState } from "react";
import axios from "axios";

function WhatAlgorithm(){
    const [algorithmofDay, setAlgorithmofDay] = useState(null);
    const [input, setInput] = useState(""); 
    const [historico, setHistorico] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/algorithm-of-the-day")
            .then(response => setAlgorithmofDay(response.data))
            .catch(error => console.error("Erro ao buscar algoritmo do dia", error));
    }, []);

    useEffect(() => {
      if (input.trim().length === 0) {
          setSuggestions([]);
          return;
      }

      axios.get(`http://localhost:3001/autocomplete?q=${input}`)
          .then(response => {
              setSuggestions(response.data); // espera-se um array de nomes
          })
          .catch(() => setSuggestions([]));
  }, [input]);

   
    const verifyAnswer = () => {
        if (!input.trim()) return;
    
        axios.get(`http://localhost:3001/algorithm?name=${input}`)
            .then(response => {
                const userAlgorithm = response.data;
    
                const elem = {
                    name: userAlgorithm.name,
                    tipo: userAlgorithm.category,
                    grafo: userAlgorithm.recursive ? "Sim" : "Não", //recursivo
                    tempo_execucao: userAlgorithm.big_o,
                    item_tipo: userAlgorithm.item_type //se é estrutura algoritmo
                };
    
                setHistorico(prev => [...prev, elem]);
                setInput("");
                setSuggestions([]);
    
                if (userAlgorithm.name.toLowerCase() === algorithmofDay.name.toLowerCase()) {
                    alert("Parabéns!");
                }
            })
            .catch(error => {
                console.error("Erro ao buscar o algoritmo informado:", error);
                alert("Algoritmo não encontrado. Tente outro nome.");
            });
    };

    const handleSuggestionClick = (suggestion)=>{
      setInput(suggestion);
      setSuggestions([]);
    };
    

    if (!algorithmofDay) {
        return <p>Carregando algoritmo do dia...</p>;
    }

    return (
    <div className="fundo"> 
       <nav>
          <img src="logof.png" alt="" />
          <p><a href="http://localhost:3000/quiz-algorithm">Quiz</a></p>
          <p><a href="http://localhost:3000/">Login</a></p>
          <p><a href="http://localhost:3000/profile">Perfil</a></p>
        </nav>
            <div>
                <div className="guia_quiz_horizontal">
                    <ul>
                        <li><a href="http://localhost:3000/quiz-algorithm"><img src="hamsterMatriz.jpg" alt="algorithm"></img></a></li>
                        <li><a href="http://localhost:3000/quiz-language"><img src="hamsterMatriz.jpg" alt="language"></img></a></li>
                    </ul>
                </div>
                <div className="question">
                    <h2>Acerte o Algoritmo do dia</h2>
                    <p>Escreva um caracter qualquer para começar</p>
                </div>

                <div className="input">
                <input type="text" value={input}   onChange={(e) => setInput(e.target.value)} ></input>
                <button className="button-Quiz"onClick={verifyAnswer}>Enviar</button>
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

            </div>
            <div id="certo">
            <div className="table_answer">
    <div className="div_resposta">
        <table className="quadros">
            {historico.length > 0 && (
            <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Recursivo</th>
                  <th>Tempo de Execução</th>
                  <th>Tipo de elemento</th>
                </tr>
            </thead>
            )}
           <tbody>
  {historico.map((elem, index) => (
    <tr key={index}>
      <td className={elem.name === algorithmofDay.name ? "boxColorCorrect" : "boxColorIncorrect"}>
        {elem.name}
      </td>
      <td className={elem.tipo === algorithmofDay.category ? "boxColorCorrect" : "boxColorIncorrect"}>
        {elem.tipo}
      </td>
      <td className={elem.grafo === (algorithmofDay.recursive ? "Sim" : "Não") ? "boxColorCorrect" : "boxColorIncorrect"}>
        {elem.grafo}
      </td>
      <td className={elem.tempo_execucao === algorithmofDay.big_o ? "boxColorCorrect" : "boxColorIncorrect"}>
        {elem.tempo_execucao}
      </td>
      <td className={elem.item_tipo === algorithmofDay.item_type ? "boxColorCorrect" : "boxColorIncorrect"}>{elem.item_tipo} </td>
    </tr>
  ))}
</tbody>

        </table>
    </div>
</div>

            </div>
            <div className="div_git">
                <p>Confira nosso código no git <a href="https://github.com/MariMeng/dle_computacao"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="algorithm"></img></a></p>
            </div>
    </div>
    );
}

export default WhatAlgorithm;