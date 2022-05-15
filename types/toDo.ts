export interface TaskTypes {
    status: "ToDo" | "InProgress" | "Done";
    title: string;
    description: string;
}

export interface StateToDoTypes {
    toDo: TaskTypes[];
    inProgress: TaskTypes[];
    done: TaskTypes[];
}