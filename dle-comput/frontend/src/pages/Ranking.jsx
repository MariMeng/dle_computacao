import React from "react";


export default function Ranking() {
  return (
    
    <div className="ranking-container">
      <h2>Ranking de Usuários</h2>
      <div className="div_table">
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="gold">🥇 1</td>
            <td>Ana</td>
            <td>1500</td>
          </tr>
          <tr>
            <td className="silver">🥈 2</td>
            <td>Bruno</td>
            <td>1400</td>
          </tr>
          <tr>
            <td className="bronze">🥉 3</td>
            <td>Carla</td>
            <td>1300</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Daniel</td>
            <td>1200</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Eduarda</td>
            <td>1100</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}
