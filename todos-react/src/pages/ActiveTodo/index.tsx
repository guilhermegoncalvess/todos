import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import formatDate from '../../utils/formaDate';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ActiveTodo: React.FC = () => {

    const [nowShowing, setNowShowing] = useState('active')
    const [newTodo, setNewTodo] = useState('');
    const [editText, setEditText] = useState('');
    const [editing, setEditing] = useState<Todo | null>(null);
    const [ toggle, setToggle ] = useState(false);
    const [ todos, setTodos] = useState<Todo[]>([]) ;
    const [todosCompleted, setTodosCompleted] = useState<Todo[]>([]);
    
    useEffect(() => {
      api.get<Todo[]>('/tasks').then(response => {
        const todosActived = response.data.filter( todo => todo.completed === false);
        const todosCompleted = response.data.filter( todo => todo.completed === true);
        
        setTodosCompleted(todosCompleted);
        setTodos(todosActived)
      }); 
    }, [])

    

    async function handleNewTodo(event: any): Promise<void> {
        if (event.key !== 'Enter') {
          return
        }
        event.preventDefault();

        api.post('/tasks', {title: event.target.value, completed: false }).then( response => {
          const todo = response.data;

          setTodos([...todos, todo]);
          console.log(todos);
        });

        setNewTodo("")
    }

    async function handleCheckChangeTodo(todo: Todo){

      const { id, completed } = todo;

      const todoIndex = todos.findIndex( todo => {
        return todo.id === id
      });

      todos.splice(todoIndex, 1);
      setTodos([...todos]);
      
      api.put(`/tasks/${id}`, {id, completed: !completed }).then( response => {
          const todo = response.data;
          
          console.log(todo);
        });
    }

    function handleKeyDown(todo: Todo, event: any) {
      if(event.key === 'Enter' ){
        handleSubmit(todo, event)
      }
    }
    async function handleSubmit(todo: Todo, event?: any) {
      const { id } = todo;
      
      const todoIndex = todos.findIndex( todo => {
        return todo.id === id;
      });  

      if( todos[todoIndex].title === editText ){
        setEditing(null)
        return
      } else {
        todos[todoIndex].title = editText;

        setTodos([...todos]);
        setEditing(null) 
        api.put(`/tasks/${id}`, {title: editText }).then( response => {
            const todo = response.data;
          
            console.log(todo);
            console.log('BLUR')
        });
          
      }
      
    }

    async function handleRemoveTodo(id: string){
      const todoIndex = todos.findIndex( todo => {
        return todo.id === id
      });
      todos.splice(todoIndex, 1);

      api.delete(`/tasks/${id}`).then( response => {
        const todo = response.data;
        
        setTodos([...todos])
        console.log(todo);
      });
    }

  

    function toggleAll(){
      todos.forEach( todo => {
          todo.completed = !toggle;
      });

      setToggle(!toggle)
      setTodos([...todos])
    }


    function onEdit(todo: Todo, event: any) {
      setEditing(todo)
      setEditText(todo.title)
    }

    return ( 
        <>
        <header className="todoapp">
          <h1>todos</h1>
          <input
            id="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            value = {newTodo}
            onChange={ e => setNewTodo(e.target.value)}
            onKeyDown = {(e) => handleNewTodo(e)}
            autoFocus={true}
          />
        </header>
        <section className="main">
						<input
							id="toggle-all"
							className="toggle-all"
							type="checkbox"
              onChange={e => toggleAll()}
							checked={todos.length === 0}
						/>
						<label
							htmlFor="toggle-all"
						/>
						<ul className="todo-list">
              { todos.map( todo => 
              
                <li key={todo.id} >
                  <div >
                    <input 
                          className="toggle" 
                          type="checkbox" checked={todo.completed} 
                          onChange={ e => handleCheckChangeTodo(todo)}
                    />

                    { !(editing === todo) &&
                                          <label onDoubleClick={ e => onEdit(todo, e)}> {todo.title}
                                            <span className="date"> Create at {formatDate(todo.createdAt)} </span> 
                                          </label>  
                    }

                    { !(editing === todo) && <button className="destroy" onClick={e => handleRemoveTodo(todo.id)} /> }

                    { editing === todo &&  
                                        <input 
                                        className="editing"
                                        type="text"
                                        value ={editText}
                                        onBlur={ e => handleSubmit(todo,e)}
                                        onChange= {e => setEditText(e.target.value)}
                                        autoFocus={true}
                                        onKeyDown={e => handleKeyDown(todo, e)}
                                        />
                    } 
                  </div>
                </li>
              )}
						</ul>
					</section>  
          { ( todos.length >= 0) && 
          <footer className="footer">
					<span className="todo-count">
						<strong>{todos.length} </strong> 
            {todos.length > 1 ? "items " : "item "}
            left
					</span>
					<ul className="filters">
						<li>
							<a
								href="/"
                onClick={e => setNowShowing('all')}
							  className={nowShowing === "all" ? "selected" : ''} >
                  All
							</a>
						</li>
						{' '}
						<li>
							<a
								href="/active"
                onClick={e => setNowShowing('active')}
								className={nowShowing === "active" ? "selected" : ''} >
									Active
							</a>
						</li>
						{' '}
						<li>
							<a
								href="/completed"
                onClick={e => setNowShowing('completed')}
								className={nowShowing === "completed" ? "selected" : ''}>
									Completed
							</a>
						</li>
					</ul>
          {(todosCompleted.length > 0) && <button className="clear-completed" >Clear completed</button>}
				</footer>      
      }
      </>
    )

}
export default ActiveTodo;