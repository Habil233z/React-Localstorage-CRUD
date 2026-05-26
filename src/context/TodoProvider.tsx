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

            const idConvert: number = Number(localStorage.getItem("latestId"))
            setIdCounter(idConvert + 1)
        }
        setTimeout(() => 500)
    }

    const createTodo = (text: string) => {
        setLoading(true)
        const newToDo:Todo = {id: idCounter, text, completed: false}
        setTodos((prev) => [newToDo, ... prev])
        const oldObjects: any[] = todos
        const newObject: any = newToDo
        const array: any[] = [newObject ,...oldObjects]
        localStorage.setItem("todos", JSON.stringify(array))

        setIdCounter((prev) => prev + 1)
        localStorage.setItem("latestId", JSON.stringify(idCounter))
        setTimeout(() => {setLoading(false)}, 500)
    }
    const updateTodo = (id:number ,text: string) => {
        setLoading(true)
        const modifiedData = todos.map((todo) => (todo.id === id ? { ... todo, text} : todo))
        setTodos(() => modifiedData)
        localStorage.setItem("todos", JSON.stringify(modifiedData))
        setTimeout(() => {setLoading(false)}, 500)
    }
    const deleteTodo = (id: number) => {
        const remaining = todos.filter((todo) => todo.id !== id)
        setTodos(remaining)
        localStorage.setItem("todos", JSON.stringify(remaining))
    }
    const toggleComplete = (id: number) => {
        const status = todos.map((todo) => (todo.id === id ? { ... todo, completed: !todo.completed} : todo))
        setTodos(() => status)
        localStorage.setItem("todos", JSON.stringify(status))
    }
    return (
        <TodoContext.Provider value={{todos, createTodo, updateTodo, deleteTodo, toggleComplete, openTodo, loading}}>
            {children}
        </TodoContext.Provider>
    )
}
