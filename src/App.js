// import logo from './logo.svg';
import { useState } from 'react';
import './App.scss';
import ColorBox from './components/colorBox';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'phan'},
    {id: 2, title: 'duy'},
    {id: 3, title: 'tam'}
  ]);

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList);
  };

  return (
    <div className="App">
      <ColorBox/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
