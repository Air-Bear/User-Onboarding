import React, { useState } from 'react';
import { Container } from "reactstrap";
import UserForm from "./components/userForm";
import UserCard from "./components/userCard";
import './App.css';

function App() {
  const [users, setUsers] = useState([{
    name: "Aaron",
    email: "aaronmyates@hotmail.com",
    password: "password",
    role: "Full-stack web dev",
    id: Date.now()
  }]);

  const addUser = (newUser) =>{
    setUsers([...users, newUser]);
    console.log(users);
  };

  return (
    <Container className="App">
      <UserForm addUser={addUser} />
      {users.map(user => (
        <UserCard user={user} />
      ))}
    </Container>
  );
}

export default App;
