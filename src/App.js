import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#ffffff',
  color: '#000000'
};

const darkTheme = {
  background: '#000000',
  color: '#ffffff'
};

const themes = {
  light: lightTheme,
  dark: darkTheme
};

const AppContainer = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin: 20px 0;

  th, td {
    border: 1px solid ${props => props.theme.color};
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: ${props => props.theme.color};
    color: ${props => props.theme.background};
  }
`;

const SearchInput = styled.input`
  margin: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius:2rem;
  width: 300px;
 
`;



const ThemeSwitch = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius:0.5rem;
  font-weight:bold;
`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/todos')
      .then(response => setTodos(response.data.todos))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredTodos = todos.filter(todo => 
    todo.todo.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppContainer>
        <h1>This is Todo from</h1>
        <div>
       
        <SearchInput
        
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <ThemeSwitch onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </ThemeSwitch>
        </div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Todo</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.todo}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
