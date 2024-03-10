import React from "react"
import {useState, useEffect} from "react"

export default function TodoList(){
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [searchValue, setSearchValue] = useState("")
    const [sortMethod, setSortMethod] = useState("all")
    const filteredTodo = todos.filter(todo =>{
        switch(sortMethod){
            case "active":
                return !todo.completed;
            case "completed":
                return todo.completed;
            default:
                return true;

        }
        todo.text.toLowerCase().includes(searchValue.toLowerCase())
    })


    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        const getTodo = JSON.parse(localStorage.getItem('todo'))
        if(getTodo){
            setTodos(getTodo)
        }
    },[])
    function handleChange(event){
        const{name, value} = event.target
        return name === "search" ? setSearchValue(value) : setInputValue(value)
    }

    function handleAdd(event){
        event.preventDefault()
        const newTodo =
            {
            id: Date.now(),
            text: inputValue,
            completed: false
        }
        const updateTodo = [...todos, newTodo]
        setTodos(updateTodo)
        setInputValue("")
    }

    function handleDelete(id){
        const todoDel = todos.filter(todo => todo.id !== id)
        setTodos(todoDel)
    }

    function handleComplete(id){
        setTodos(todos.map(todo => {
            if(todo.id === id){
                return{
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        }))
    }

    function handleSort(method){
        setSortMethod(method)
    }


    return(
        <div className="mainBody">
            <h1>To-Do List</h1>
            <form className="InputBox">
                <input
                    type="text"
                    placeholder="Add a to-do"
                    value={inputValue}
                    name="inputBox"
                    onChange={handleChange}
                />
                <button onClick={handleAdd}>
                    Add
                </button>

            </form>
            <ul className="todoList">
                {filteredTodo.map(todo =>

                    <div key={todo.id.toString()} className="todoItem">
                        <input
                            type="checkbox"
                            onChange={() => handleComplete(todo.id)}
                            checked={todo.completed}

                        />
                        <li>
                            <span style={{textDecoration: todo.completed ? "line-through": "none"}}>
                                {todo.text}
                            </span>
                        </li>
                        <button onClick={() => handleDelete(todo.id)}>
                            Delete
                        </button>
                    </div>

                )}

            </ul>
            <div className="sortBar">
                <input
                    type="text"
                    name="search"
                    placeholder="Search for an item"
                    onChange={handleChange}
                />
                <button onClick={() => handleSort("all")}>All</button>
                <button onClick={() => handleSort("active")}>Active</button>
                <button onClick={() => handleSort("completed")}>Completed</button>
            </div>


        </div>
        )

}