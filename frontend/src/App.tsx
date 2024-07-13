import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Home from "./routes/Home.tsx";
import TodoGallery from "./routes/TodoGallery.tsx";
import TodoDetailCard from "./routes/TodoDetailCard.tsx";
import EditTodo from "./routes/EditTodo.tsx";
import CreateNewTodo from "./routes/CreateNewTodo.tsx";
import {TodoProvider} from "./contexts/TodoContext.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>,
                },
                {
                    path: '/board/todo',
                    element: <TodoGallery status="OPEN"/>
                }, {
                    path: '/board/doing',
                    element: <TodoGallery status="IN_PROGRESS"/>
                }, {
                    path: '/board/done',
                    element: <TodoGallery status="DONE"/>
                }, {
                    path: '/details/:id',
                    element: <TodoDetailCard/>
                }, {
                    path: '/edit/:id',
                    element: <EditTodo/>
                }, {
                    path: '/create',
                    element: <CreateNewTodo/>
                },

            ]
        }
    ])

    return (
        <TodoProvider>
            <RouterProvider router={router}/>
        </TodoProvider>
    )
}

export default App
