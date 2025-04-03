import React, {useState} from "react";
import "../style.css";

function WhatLanguage(){
    let tentativas = 0;
    const images = [
        {arquivo: "../logos/Python-logo-notext.svg.png", name:"Python"},
        {arquivo: "../logos/ISO_C++_Logo.svg.png", name:"C++"},
        {arquivo: "../logos/C_Logo.png", name:"C"},
        {arquivo: "../logos/images.png", name:"JavaScript"},
        {arquivo: "../logos/Ruby_logo.svg.png", name:"Ruby"}
    ];
    
    const imageOfDay = images[4];
    const imgFile = imageOfDay.arquivo;
    const [input, setInput] = useState("");
    const [historico, setHistorico] = useState([]);

    const verifyLanguage = function(){
        const elem = images.find(ig => ig.name.toLocaleLowerCase() === input.toLocaleLowerCase())

        if(elem){
            setHistorico(prev => [...prev,elem]);
            setInput("");
            if(elem.name === imageOfDay.name){
                alert("Parabéns");
            }
            tentativas++;
            console.log(tentativas);
        }
    }

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
                     <h2>Qual a linguagem de programação que aparece nesta foto?</h2>
                     <p>Escreva um caracter qualquer para começar</p>
                 </div>

                 <div className="div_imageOfDay">
                    <img src= {imageOfDay.arquivo} alt="image embassade of any language of programation"></img>
                  
                 </div>
                 <div className="botoes">
                    <label className="switch">
                        <input type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                    <label className="switch">
                        <input type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
                 <div className="input">
                 <input type="text" value={input} onChange={(e)=> setInput(e.target.value)}></input>
                 <button onClick={verifyLanguage} >clique</button>
                 </div>
 
             </div>
             <div id="certo">
             <div className="table_answer">
     <div className="div_resposta">
         <table className="quadros">
             <thead>
                 <tr>
                
                 </tr>
             </thead>
             <tbody>
             
                    {historico.map((elem, index) =>(
                        <tr key={index}>
                            <td className={elem.name === imageOfDay.name? "boxColorCorrect" : "boxColorIncorrect"}>{elem.name}</td>
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

export default WhatLanguage;