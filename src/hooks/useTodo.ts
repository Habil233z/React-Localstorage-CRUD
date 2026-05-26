import { TodoContext } from "@/context/TodoContext"
import { useContext } from "react"

export const useTodo = () => {
    const context = useContext(TodoContext)
    if (!context) {
        throw new Error("useToDo must be used within a provider")
    }
    return context
}