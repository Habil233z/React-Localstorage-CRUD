import { useTodo } from "../hooks/useTodo"
import { useState } from "react"

export default function TodoForm() {
    const [text, setText] = useState("")
    const {createTodo, loading} = useTodo()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!text.trim()) return
        createTodo(text)
        setText("")
    }

    return (
        <form onSubmit={handleSubmit} className="m-4">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="border" disabled={loading} placeholder="Add new task" />
            <button type="submit" disabled={loading}>Add</button>
        </form>
    )
}


