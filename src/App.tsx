import './App.css'
import ToDoForm from './components/TodoForm'
import ToDoList from './components/TodoList'
import { ToDoProvider } from './context/TodoProvider'

function App() {

  return (
    <ToDoProvider>
      <div className='h-screen flex justify-center items-center bg-stone-300'>
        <div className='bg-amber-50 border-4 h-125 w-200 flex flex-col items-center'>
          <h1 className='mt-2 font-bold text-4xl'>To do App</h1>
          <ToDoForm />
          <ToDoList />
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
