import React from "react";
import "../style.css";

function WhatAlgorithm(){
    return (
        <div> 
        <div>
            <nav>
                <p>ranking</p>
                <p>perfil</p>
            </nav>
            <div>
                <div class="guia_quiz_horizontal">
                    <ul>
                        <li><a href=""><img src="logo192.png" alt="algorithm"></img></a></li>
                        <li><a href=""><img src="logo192.png" alt="language"></img></a></li>
                        <li><a href=""><img src="logo192.png" alt="code"></img></a></li>
                    </ul>
                </div>
                <div class="question">
                    <p>Acerte o Algoritmo do dia</p>
                </div>
                <div class="input">
                <input type="text"></input>

                </div>

            </div>
            <div id="certo">
                <div class="table_answer">
                    <div class="div_resposta">
                        <table>
                            <tr>
                            
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
            <div class="div_git">
                <p>Confira nosso código no git</p>
            </div>
        </div>
    </div>
    );
}

export default WhatAlgorithm;