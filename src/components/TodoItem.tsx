import type { Todo } from "@/types/TodoContextType"
import { useTodo } from "../hooks/useTodo"
import { useState } from "react"


export const TodoItem = ({todo}: {todo: Todo}) => {
    const {updateTodo, deleteTodo, toggleComplete, loading} = useTodo()
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(todo.text)

    const handleUpdate = () => {
        updateTodo(todo.id, text)
        console.log(todo)
        setIsEditing(false)
    }

    return (
        <div className="flex gap-4 border p-2 w-150">
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            {isEditing ? (
                <><input value={text} onChange={(e) => setText(e.target.value)} className="border" disabled={loading}/></>
            ) : (
                <><span style={{textDecoration: todo.completed? "line-through" : "none"}} className="flex items-center">{todo.text}</span></>
            )}

            <div className=" flex w-full flex-row-reverse">
                <div className="">
            {isEditing ? (
                <button onClick={handleUpdate} disabled={loading} className="border p-1">Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)} disabled={loading} className="border p-1">Edit</button>
            )}
            <button onClick={() => deleteTodo(todo.id)} disabled={loading} className="border p-1 ml-2">Delete</button>
                </div>
            </div>
        </div>
    )
}