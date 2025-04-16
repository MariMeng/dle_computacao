import React, {useState} from "react";


function WhatError(){

    const codes  = [
        {code: "console.log(hello)", ans:"hello"}
    ];

    const [input, setInput] = useState("");
    const [historico, seuHistorico] = useState([]);
    const codeOfDay = codes[0];

    const verifyError = function(){
        const elem = codes.find(code => code.ans.toLowerCase() === input.toLowerCase());

        if(elem){
            seuHistorico(prev => [...prev,elem]);
            setInput("");
            if(codeOfDay.ans === elem.ans){
                alert("Parabéns, você acertou!!!");
            }
        }
    }
  
     return (
     <div> 
            <nav className="nav">
                <img src=" " alt="" />
                <p>Quiz</p>
                <p>Perfil</p>
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
                     <h2>Qual o erro desse código?</h2>
                     <p>Escreva um caracter qualquer para começar</p>
                 </div>
                 
                 <div className="input">
                 <input type={input} onChange={(e)=> setInput(e.target.value)}></input>
                 <button onClick={verifyError} >clique</button>
                 </div>
 
             </div>
             <div id="certo">
             <div className="table_answer">
     <div className="div_resposta">
         <table className="quadros">
             <thead>
                 
             </thead>
             <tbody>
             
             {historico.map((elem, index) => (
                    <tr key={index}>
                    <td className={elem.ans === codeOfDay.ans ? "boxColorCorrect" : "boxColorIncorrect"}>{elem.ans}</td>
                    </tr>
                ))}   
     
             </tbody>
         </table>
     </div>
 </div>
 
             </div>
             <div className="div_git">
                 <p>Confira nosso código no gitHub <a href="https://github.com/MariMeng/dle_computacao"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="algorithm"></img></a></p>
             </div>
     </div>
     );
}

export default WhatError;