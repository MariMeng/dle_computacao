import React, {createElement, useState} from "react";
import "../style.css";

function WhatAlgorithm(){
    const algoritmos = [
        { name: "Bubble Sort", tipo: "Ordenação", grafo: "Não", tempo_execucao: "O(n^2)" },
        { name: "Quick Sort", tipo: "Ordenação", grafo: "Não", tempo_execucao: "O(n log n)" },
        { name: "Merge Sort", tipo: "Ordenação", grafo: "Não", tempo_execucao: "O(n log n)" },
        { name: "Dijkstra", tipo: "Busca em Grafo", grafo: "Sim", tempo_execucao: "O((V + E) log V)" },
        { name: "BFS", tipo: "Busca em Grafo", grafo: "Sim", tempo_execucao: "O(V + E)" },
        { name: "DFS", tipo: "Busca em Grafo", grafo: "Sim", tempo_execucao: "O(V + E)" },
        { name: "Binary Search", tipo: "Busca", grafo: "Não", tempo_execucao: "O(log n)" },
        { name: "Floyd-Warshall", tipo: "Busca em Grafo", grafo: "Sim", tempo_execucao: "O(V^3)" },
        { name: "Kadane's Algorithm", tipo: "Programação Dinâmica", grafo: "Não", tempo_execucao: "O(n)" },
        { name: "Prim", tipo: "Árvore Geradora Mínima", grafo: "Sim", tempo_execucao: "O((V + E) log V)" }
    ];

    const algorithmofDay = algoritmos[3];

    const [input, setInput] = useState(""); 
    const [historico, setHistorico] = useState([]);

    const verifyAnswer = () => {
        const elem = algoritmos.find(alg => alg.name.toLowerCase() === input.toLowerCase());
    
        if (elem) {
            setHistorico(prevHistorico => [...prevHistorico, elem]);
            setInput(""); 
            if((elem.name === algorithmofDay.name) && (elem.tipo === algorithmofDay.tipo) && (elem.grafo === algorithmofDay.grafo) && (elem.tempo_execucao === algorithmofDay.tempo_execucao)) {
                alert("Parabéns!")
            }
        }
    };
    
    return (
    <div> 
            <nav>
                <p>ranking</p>
                <p>perfil</p>
            </nav>
            <div>
                <div className="guia_quiz_horizontal">
                    <ul>
                        <li><a href="http://localhost:3000/quiz-algorithm"><img src="hamsterMatriz.jpg" alt="algorithm"></img></a></li>
                        <li><a href="http://localhost:3000/quiz-language"><img src="hamsterMatriz.jpg" alt="language"></img></a></li>
                        <li><a href="http://localhost:3000/quiz-error"><img src="hamsterMatriz.jpg" alt="code"></img></a></li>
                    </ul>
                </div>
                <div className="question">
                    <h2>Acerte o Algoritmo do dia</h2>
                    <p>Escreva um caracter qualquer para começar</p>
                </div>

                <div className="input">
                <input type="text" value={input}   onChange={(e) => setInput(e.target.value)} ></input>
                <button onClick={verifyAnswer}>clique</button>
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
                  <th>É grafo</th>
                  <th>Tempo de Execução</th>
                </tr>
            </thead>
            )}
            <tbody>
                {historico.map((elem, index) => (
                    <tr key={index}>
                        <td className={elem.name === algorithmofDay.name ? "boxColorCorrect" : "boxColorIncorrect"}>{elem.name}</td>
                        <td className={elem.tipo === algorithmofDay.tipo ? "boxColorCorrect" : "boxColorIncorrect"}>{elem.tipo}</td>
                        <td className={elem.grafo === algorithmofDay.grafo ? "boxColorCorrect" : "boxColorIncorrect"}>{elem.grafo}</td>
                        <td className={elem.tempo_execucao === algorithmofDay.tempo_execucao ? "boxColorCorrect" : "boxColorIncorrect"}>{elem.tempo_execucao}</td>
                       
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