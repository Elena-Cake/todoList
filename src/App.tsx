import React from 'react';
import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { TodoLists } from './components/TodoLists/TodoLists';


function App() {

  return (
    <div className="App">
      <TodoLists />
    </div>
  );
}

export default App;

