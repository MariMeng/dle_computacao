import React, { useEffect, useState } from "react";
import "../style.css";
import "../profile.css";

export default function Profile() {
  const [newName, setNewName] = useState("");
  const [savedName, setSavedName] = useState("Carregando...");
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);

 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setSavedName(user.name);
      setNewName(user.name);
      setUserId(user.id); 
    }
  }, []);

  const handleSave = async () => {
    const trimmed = newName.trim();
    if (trimmed.length >= 4) {
      try {
        const res = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmed }),
        });

        if (!res.ok) throw new Error("Erro ao atualizar nome");

        setSavedName(trimmed);
        alert(`Nome salvo com sucesso: ${trimmed}`);
        setIsEditing(false);

        // Atualiza localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify({ ...user, name: trimmed }));
      } catch (err) {
        alert("Erro ao atualizar nome");
      }
    } else {
      alert("O nome precisa ter pelo menos 4 caracteres.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja apagar a conta?")) {
      try {
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: "DELETE",
        });

        alert("Conta apagada!");
        localStorage.removeItem("user");
        // Redireciona ou limpa estado
        setSavedName("Usuário excluído");
        setNewName("");
        setIsEditing(false);
      } catch (err) {
        alert("Erro ao apagar conta");
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

      <div className="body_profile">
        <div className="container_profile">
          <div className="profile">
            <img
              src="https://w7.pngwing.com/pngs/651/997/png-transparent-cat-pixel-art-kitten-cat-purple-mammal-animals.png"
              alt="Avatar"
            />
            <p>{savedName}</p>
            <p>pontos</p>
            <button className="edit-btn" onClick={() => setIsEditing(prev => !prev)}>
              Editar
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="div_edit">
          <p>Editar nome</p>
          <input value={newName} onChange={e => setNewName(e.target.value)} />
          <div className="div_editButtons">
            <button onClick={handleSave}>Salvar</button>
            <button onClick={handleDelete}>Apagar conta</button>
          </div>
        </div>
      )}
    
    </>
  );
}
