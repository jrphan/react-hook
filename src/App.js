import { useEffect, useState } from 'react';
import './App.scss';
import ColorBox from './components/colorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/postList';

function App() {
  const [todoList, setTodoList] = useState([]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requesUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=3';
        const response = await fetch(requesUrl);
        const responseJSON = await response.json();
  
        const {data} = responseJSON;
        setPostList(data);
      } catch (error) {
          alert('loi');
      }
    }

    fetchPostList();
  }, []);

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList);
  };

  function handleTodoForm(formValues) {
    const newTodoList = [...todoList];
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <PostList posts={postList}/>
      <ColorBox/>
      <TodoForm onSubmit={handleTodoForm} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
