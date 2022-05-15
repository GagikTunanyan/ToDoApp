import { StateToDoTypes } from "../../types/toDo";

const startGetTasks = () => {
    return {
        type: "START_GET_TASKS"
    }
};

const succesGetTasks = (payload: StateToDoTypes) => {
    return {
        type: "SUCCESS_GET_TASKS",
        payload: payload
    }
}

const errorGetTasks = () => {
    return {
        type: "ERROR_GET_TASKS",
        message: "Error Get Tasks"
    }
}

export const getTasks = () => {
    return (dispatch: any)=> {
        dispatch(startGetTasks());
        fetch("api/tasks", { method: "GET" })
        .then((e) => { 
            if(e.status === 400) {
                dispatch(errorGetTasks())
                return { error: {}, status: e.status }
            }
            else return e.json()
        })
        .then((e: StateToDoTypes & { error: string, status: number }) => {
            if(e.status !== 400) return dispatch(succesGetTasks(e as StateToDoTypes))
        })
    } 
};

const startAddTask = () => {
    return {
        type: "START_ADD_TASK"
    }
};

const succesAddTask = (payload: StateToDoTypes) => {
    return {
        type: "SUCCESS_ADD_TASK",
        payload: payload
    }
};

const errorAddTasks = () => {
    return {
        type: "ERROR_ADD_TASK",
        message: "Error Add Tas"
    }
};

export const addTask = (task: { title: string, description: string, status: string }) => {
    return (dispatch: any)=> {
        dispatch(startAddTask());
        fetch("api/addTask", { method: "POST", body: JSON.stringify(task) })
        .then((e) => { 
            if(e.status === 400) {
                dispatch(errorAddTasks())
                return { error: {}, status: e.status }
            }
            else return e.json()
        })
        .then((e: StateToDoTypes & { error: string, status: number }) => {
            if(e.status !== 400) return dispatch(succesAddTask(e as StateToDoTypes))
        })
    } 
};

const startUpdateTasks = () => {
    return {
        type: "START_UPDATE_TASK"
    }
};

const succesUpdateTasks = (payload: StateToDoTypes) => {
    return {
        type: "SUCCESS_UPDATE_TASK",
        payload: payload
    }
};

const errorUpdateTasks = () => {
    return {
        type: "ERROR_UPDATE_TASK",
        message: "Error UPDATE Task"
    }
};

export const updateTasks = (tasks: StateToDoTypes) => {
    return (dispatch: any)=> {
        dispatch(startUpdateTasks());
        succesUpdateTasks(tasks)
        fetch("api/updateTasks", { method: "POST", body: JSON.stringify(tasks) })
        .then((e) => { 
            if(e.status === 400) {
                dispatch(errorUpdateTasks())
                return { error: {}, status: e.status }
            }
            else return e.json()
        })
    } 
};