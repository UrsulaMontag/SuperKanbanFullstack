import {ChangeEvent, FormEvent, useState} from "react";

import {useTodoContext} from "../hooks/useTodoContext.ts";


export default function CreateNewTodo() {
    const {createTodo} = useTodoContext();
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTodo({description: description});
        setDescription("");
    }
    return (
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
            <label>Todo Description:
                <input type="text" value={description}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}/></label>
            <button>Create</button>
        </form>
    )
}