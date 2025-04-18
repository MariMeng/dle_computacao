import React, { useEffect, useState } from "react";
import '../ranking.css';

export default function Ranking() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div className="ranking-container">
      <h2>Ranking de Usuários</h2>
      <div className="div_table">
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
