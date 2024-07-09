import {Todo} from "../models/Todo.ts";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

type TodoCardProps = {
    todo: Todo,
}

export default function TodoCard(props: Readonly<TodoCardProps>) {
    const navigate = useNavigate();

    const deleteTodo = () => {
        axios.delete(`/api/todo/${props.todo.id}`)
            .then(() => {
                navigate("/");
            })
            .then(() => alert(`${props.todo.description} deleted`))
            .catch(error => console.error('Error deleting todo', error))
    }

    return (
        <article className="todo-card">
            <p className="todo-description">{props.todo.description}</p>
            <div className="todo-action-container">
                <Link to={`/details/${props.todo.id}`} className="link-card">Details</Link>
                <Link to={`/edit/${props.todo.id}`} className="link-card">Edit</Link>
                {props.todo.status !== "DONE"
                    ? <button className="button-card__advance">Advance</button>
                    : <button onClick={deleteTodo} className="button-card__delete">Delete</button>
                }
            </div>
        </article>
    )
}