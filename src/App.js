import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
     const repository = response.data;
      console.log(repository);
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositoriesNew = repositories.filter(repository => repository.id !== id);
    setRepositories(repositoriesNew);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
         
          <li key={repository.id}> <p>{repository.title}</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
         
          ))}         
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
