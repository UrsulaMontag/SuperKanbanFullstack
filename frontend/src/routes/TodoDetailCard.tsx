import {Todo} from "../models/Todo.ts";
import {Params, useParams} from "react-router-dom";
import TodoCard from "../components/TodoCard.tsx";

import {useTodoContext} from "../hooks/useTodoContext.ts";

export default function TodoDetailCard() {
    const {todos} = useTodoContext()
    const urlParams: Readonly<Params<string>> = useParams();
    const currentTodo: Todo | undefined = todos.find(todo => todo.id === urlParams.id)

    return (
        <>
            {
                currentTodo
                    ? <TodoCard todo={currentTodo}/>
                    : <p>Todo not found</p>
            }
        </>

    )
}