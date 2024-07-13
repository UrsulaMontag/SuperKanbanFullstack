import {Status, Todo} from "../models/Todo.ts";
import {Params, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {useTodoContext} from "../contexts/TodoContext.tsx";


export default function EditTodo() {
    const {todos, editTodo, createTodo} = useTodoContext()
    const urlParams: Readonly<Params<string>> = useParams();
    const currentTodo: Todo | undefined = todos.find(todo => todo.id === urlParams.id);
    const [description, setDescription] = useState<string>(currentTodo ? currentTodo.description : "");
    const [status, setStatus] = useState<Status>(currentTodo ? currentTodo.status : "OPEN");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentTodo) {
            editTodo({id: currentTodo.id, description: description, status: status});
            setDescription("");
            setStatus("OPEN");

        }
        createTodo({description: description});
        setDescription("");


    }
    return (
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
            <label>Todo Description:
                <input type="text" value={description}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/></label>
            <label>Todo Status:
                <select value={status}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatus((event.target.value))}>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">Doing</option>
                    <option value="DONE">Done</option>
                </select></label>
            {currentTodo ? (<button>Edit</button>) : (<button>Create</button>)}

        </form>


    )
}