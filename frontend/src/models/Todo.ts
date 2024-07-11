export type Todo = {
    id: string;
    description: string;
    status: Status;
}

export type TodoToAdd = {
    description: string;
}

export type Status = "OPEN" | "IN_PROGRESS" | "Done" | string;

