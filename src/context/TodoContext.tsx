import type { Todo } from "@/types/TodoContextType";
import { createContext } from "react";

export interface TodoContextType {
    todos: Todo[]
    createTodo: (text: string) => void
    updateTodo: (id: number ,text: string) => void
    deleteTodo: (id: number) => void
    toggleComplete: (id: number) => void
    loading: boolean
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)