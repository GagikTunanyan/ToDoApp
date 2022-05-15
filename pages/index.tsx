import React, { memo, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, updateTasks } from "../redux/actions/tasks";
import { StateToDoTypes } from "../types/toDo";
import styles from "../styles/home.module.scss";
import Column from "../components/column/column";
import { TaskTypes } from "../types/toDo";
import Modal from "../components/modal/modal";
import FormTaskCreator from "../components/formTaskCreator/form-task-creator";
import { DropResult, DragDropContext, Draggable } from "react-beautiful-dnd";


interface FormTaskSaveDataTypes {
  title: { value: string, type: "edit" | "view" | "creator"};
  description: { value: string, type: "edit" | "view" | "creator"};
  status: string
}


const Home: NextPage = memo(function Home() {
  const { toDo } = useSelector((state: { toDo:  StateToDoTypes }) => state);
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState({index: -1, status: "" });
  const [viewTask, setViewTask] = useState({
    show: false,
    title: "",
    description: "",
    status: "",
    type: ""
  })

  useEffect(() => {
    dispatch(getTasks() as any);
  }, []);

  const handleDBLClickTaskItem = (task: TaskTypes, type: "view" | "edit") => {
    setViewTask({
      ...task,
      show: true,
      type: type
    })
  };

  const onDragEnd = (e: DropResult) => {
    const { destination, source } = e;
    let dataCopy = { ...toDo };
    // @ts-ignore
    const elem = dataCopy[source.droppableId][source.index];
    // @ts-ignore
    dataCopy[source.droppableId].splice(source.index, 1);
    // @ts-ignore
    dataCopy[destination.droppableId].splice(destination.index, 0, {...elem, status: destination?.droppableId });
    dispatch(updateTasks(dataCopy) as any)
  };

  const saveEdit = (taskData: FormTaskSaveDataTypes) => {
    const { title, status, description } = taskData
    let dataCopy = { ...toDo };
    // @ts-ignore
    dataCopy[editDetails.status].splice(editDetails.index, 1);
    // @ts-ignore
    dataCopy[status].push({ title: title.value, description: description.value, status: status });
    dispatch(updateTasks(dataCopy) as any);
    setViewTask({ show: false, title: "", status: "", description: "", type: "" });
    setEditDetails({ index: -1, status: "" });
  };

  const onDelete = (index: number, status: string) => {
    let dataCopy = { ...toDo };
    // @ts-ignore
    dataCopy[status].splice(index, 1);
    dispatch(updateTasks(dataCopy) as any);
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.colmnsWrapper}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Column title="To Do" color="red" type="toDo">
            {toDo.toDo.map((item: any, index: number) => {
              const { title } = item
              return (
                <Draggable
                  draggableId={index + title}
                  key={index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={styles.taskItem}
                      onDoubleClick={() => handleDBLClickTaskItem(item, "view")}
                    >
                      <h5>{title}</h5>
                      <div className={styles.btnsGroup}>
                        <button 
                          onClick={() => {
                            handleDBLClickTaskItem(item, "edit");
                            setEditDetails({ index, status: "toDo"});
                          }}
                        >
                          <i className="fa fa-pencil"/>
                        </button>
                        <button onClick={() => onDelete(index, "toDo")}>
                          <i className="fa fa-trash"/>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
          </Column>

          <Column title="In Progress" color="blue" type="inProgress">
            {toDo.inProgress.map((item: any, index: number) => {
              const { title } = item
              return (
                <Draggable
                  draggableId={index + title}
                  key={index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={styles.taskItem}
                      onDoubleClick={() => handleDBLClickTaskItem(item, "view")}
                    >
                      <h5>{title}</h5>
                      <div className={styles.btnsGroup}>
                        <button 
                          onClick={() => {
                            handleDBLClickTaskItem(item, "edit");
                            setEditDetails({ index, status: "inProgress"});
                          }}
                        >
                          <i className="fa fa-pencil"/>
                        </button>
                        <button onClick={() => onDelete(index, "inProgress")}>
                          <i className="fa fa-trash"/>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
          </Column>
          <Column title="Done" color="green" type="done">
            {toDo.done.map((item: any, index: number) => {
              const { title } = item
              return (
                <Draggable
                  draggableId={index + title}
                  key={index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={styles.taskItem}
                      onDoubleClick={() => handleDBLClickTaskItem(item, "view")}
                    >
                      <h5>{title}</h5>
                      <div className={styles.btnsGroup}>
                        <button 
                          onClick={() => {
                            handleDBLClickTaskItem(item, "edit");
                            setEditDetails({ index, status: "done"});
                          }}
                          >
                          <i className="fa fa-pencil"/>
                        </button>
                        <button onClick={() => onDelete(index, "done")}>
                          <i className="fa fa-trash"/>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
          </Column>
        </DragDropContext>
      </div>
      <Modal 
        open={viewTask.show}
        close={() => {
          setViewTask({ show: false, title: "", status: "", description: "", type: "" });
          setEditDetails({ index: -1, status: "" });
        }}
      >
          <FormTaskCreator
            // @ts-ignore
            type={viewTask.type}
            title={viewTask.title}
            description={viewTask.description}
            status={viewTask.status}
            save={saveEdit}
          />
      </Modal>
    </div>
  )
})

export default Home
