import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';
import formatDate from '../../utils/formaDate';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard: React.FC = () => {


    const [newTodo, setNewTodo] = useState('');
    const [editText, setEditText] = useState('');
    const [editing, setEditing] = useState<Todo | null>(null);
    const [ toggle, setToggle ] = useState(false);
    const [ todos, setTodos] = useState<Todo[]>([]) ;

    var val = false;

    const activeTodoCount = 0;

    useEffect(() => {
      api.get<Todo[]>('/tasks').then(response => {
        
        setTodos(response.data)
      }); 
      console.log(todos)
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
        console.log(newTodo);
    }

    async function handleCheckChangeTodo(todo: Todo){

      const { id, completed } = todo;

      const todoIndex = todos.findIndex( todo => {
        return todo.id === id
      });

      todos[todoIndex].completed = !completed;
      setTodos([...todos]);
      
      api.put(`/tasks/${id}`, {id, completed: !completed }).then( response => {
          const todo = response.data;
          
          console.log(todo);
        });
    }

    async function handleSubmit(todo: Todo, event?: any) {
      const { id } = todo;
      
      const todoIndex = todos.findIndex( todo => {
        return todo.id === id;
      });
      
      
      if( event.key !== 'Enter') {
        
        event.preventDefault();
        
        if( todos[todoIndex].title !== editText){
          todos[todoIndex].title = editText;
          
          setTodos([...todos]);
          api.put(`/tasks/${id}`, {title: editText }).then( response => {
            const todo = response.data;
            
            console.log(todo);
            console.log('BLUR')
          });
        }
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
							checked={activeTodoCount === 0}
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
                          onChange={ e => handleCheckChangeTodo(todo)}>
                            
                    </input>
                  { 
                    !(editing === todo) &&
                                        <label onDoubleClick={e => onEdit(todo, e)}>
                                              {todo.title}
                                          <span className="date">
                                            Create at {formatDate(todo.createdAt)}
                                          </span> 
                                        </label>  
                  }

                  { !(editing === todo) &&  <button className="destroy" onClick={e => handleRemoveTodo(todo.id)} /> }

                   {/* <input 
                        className="edit"
                        type="text"
                        value={todo.title}
                        onBlur={e => handleSubmit(todo, e)}
                        // onChange= {e => setEditText(e.target.value)}
                        onKeyDown={e => handleSubmit(todo, e)}
                    /> */}
                    
                    {editing === todo &&  
                      <input 
                          className="editing"
                          type="text"
                          onDoubleClick={ e => setEditText(todo.title)}
                          defaultValue ={editText}
                          // onFocus= { e => setEditText(editText)}
                          onBlur={ e => handleSubmit(todo, e)}
                          onChange= {e => setEditText(e.target.value)}
                          onKeyDown={e => handleSubmit(todo, e)}
                      >
                      </input> 
                  } 
                  </div>

                </li>
              )}
						</ul>
					</section>        
      </>
    )
}
 
export default Dashboard;