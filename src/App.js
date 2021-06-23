import { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.scss';
import ColorBox from './components/colorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/postList';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm';

function App() {
  const [todoList, setTodoList] = useState([]);

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 3,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1, 
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        // const URl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=3';
        const URl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const requesUrl = URl;
        const response = await fetch(requesUrl);
        const responseJSON = await response.json();
  
        const { data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);  
      } catch (error) {
          alert('loi');
      }
    }

    fetchPostList();
  }, [filters]);

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

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

  const handleFiltersForm = (newFilters) => {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page: 1,
      author_like: newFilters.input,  
    })
  };

  return (
    <div className="App">
      <PostFiltersForm onSubmit={handleFiltersForm}/>
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      <PostList posts={postList}/>
      <ColorBox/>
      <TodoForm onSubmit={handleTodoForm} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
