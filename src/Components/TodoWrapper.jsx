import React, {useState, useEffect, useRef} from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
     uuidv4();
export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])
    //save reference for DragStartItem and DragOverItem
    const dragItem=useRef();
    const dragOverItem=useRef();
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = todo => {
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    //DRAG AND DROP PART
    //handle drag sorting
    const handleSort=()=>{
        //duplicate items
        let _todos=[...todos]
        //remove and save the dragged item content
        const draggedItemContent=_todos.splice(dragItem.current,1)[0]

        _todos.splice(dragOverItem.current,0,draggedItemContent);
        //reset the position ref
        dragItem.current=null;
        dragOverItem.current=null;
        //update the actual array
        setTodos(_todos)
         localStorage.setItem('todos', JSON.stringify(_todos));
    }
  return (
    <div className='TodoWrapper' >
        <h1>Evaluation Task | Selteq Solutions</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <div draggable className='TodoWrapper-drag' onDragStart={()=>dragItem.current=index} onDragEnter={()=>dragOverItem.current=index} onDragEnd={handleSort} onDragOver={(e)=>e.preventDefault()}>
                <Todo  task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            </div>
            )
        ))}
    </div>
  )
}