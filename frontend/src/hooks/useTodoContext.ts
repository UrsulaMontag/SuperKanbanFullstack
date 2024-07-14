import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext.tsx";

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodoContext must be used within a TodoProvider");
    return context;
}