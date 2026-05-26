import type { Todo } from "@/types/TodoContextType"
import { useState } from "react"
import { TodoContext } from "./TodoContext"


export const ToDoProvider = ({children}: {children: React.ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [loading, setLoading] = useState(false)
    const [idCounter, setIdCounter] = useState(1)

    const openTodo = () => {
        const oldData: any = localStorage.getItem("todos")
        if (oldData) {
            const todosData:Todo[] = JSON.parse(oldData)
            setTodos(todosData)
            setIdCounter(todosData.length + 1)
            console.log(todosData)
            console.log(todosData.length)
        }
        console.log(todos)
        setTimeout(() => {setLoading(false)}, 500)
    }

    const createTodo = (text: string) => {
        const newToDo:Todo = {id: idCounter, text, completed: false}
        setTodos((prev) => [newToDo, ... prev])
        setIdCounter((prev) => prev + 1)
        const oldObjects: any[] = todos
        const newObject: any = newToDo
        const array: any[] = [...oldObjects, newObject]
        localStorage.setItem("todos", JSON.stringify(array))
        console.log(array)
        setTimeout(() => {setLoading(false)}, 500)
    }
    const updateTodo = (id:number ,text: string) => {
        setLoading(true)
        const modifiedData = todos.map((todo) => (todo.id === id ? { ... todo, text} : todo))
        setTodos(() => modifiedData)
        console.log(modifiedData)
        localStorage.setItem("todos", JSON.stringify(modifiedData))
        setTimeout(() => {setLoading(false)}, 500)
    }
    const deleteTodo = (id: number) => {
        setLoading(true)
        const remaining = todos.filter((todo) => todo.id !== id)
        setTodos(remaining)
        console.log(remaining)
        console.log(JSON.stringify(todos))
        localStorage.setItem("todos", JSON.stringify(todos))
        setLoading(false)
    }
    const toggleComplete = (id: number) => {
        setTodos((prev) => prev.map((todo) => (todo.id === id ? { ... todo, completed: !todo.completed} : todo)))
    }
    return (
        <TodoContext.Provider value={{todos, createTodo, updateTodo, deleteTodo, toggleComplete, openTodo, loading}}>
            {children}
        </TodoContext.Provider>
    )
}
