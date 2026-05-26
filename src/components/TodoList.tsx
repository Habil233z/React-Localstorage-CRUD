import { useTodo } from "@/hooks/useTodo"
import { TodoItem } from "./TodoItem"
import { useEffect } from "react"

export default function TodoList() {
    const {todos, loading, openTodo} = useTodo()

    useEffect(() => {
        openTodo()
    }, [])

    return (
        <div className="">
            {loading && <p className="">Loading</p>}
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}