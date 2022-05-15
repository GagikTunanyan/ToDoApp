import React, { useState, useId } from "react";
import Modal from "../modal/modal";
import { addTask } from "../../redux/actions/tasks";
import { useDispatch } from "react-redux";
import FormTaskCreator from "../formTaskCreator/form-task-creator";
import dynamic from 'next/dynamic';
import styles from "./column.module.scss";

const Droppable = dynamic(
    async () => {
      const mod = await import('react-beautiful-dnd');
      return mod.Droppable;
    },
    { ssr: false },
  );

interface PropTypes {
    title: string;
    children?: JSX.Element | JSX.Element[];
    color: "green" | "blue" | "red";
    type: "toDo" | "inProgress" | "done"
};

interface FormTaskSaveDataTypes {
    title: { value: string, type: "edit" | "view" | "creator"};
    description: { value: string, type: "edit" | "view" | "creator"};
    status: string
}

const Column: React.FC<PropTypes> = (props) => {
    const { children, title, color, type } = props;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const createTask = (e: FormTaskSaveDataTypes) => {
        const { title, description, status} = e;
        const saveData = { title: title.value, description: description.value, status: status  };
        dispatch(addTask(saveData) as any);
        setShowModal(false);
    }

    return (
        <Droppable droppableId={type}>
            {(provided) => (
                <div
                    className={styles.column}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <div className={`${styles.columnHead} ${styles[color]}`}>
                        <h5>{title}</h5>
                        {type === "toDo" && <button className={styles.addTask} onClick={() => setShowModal(true)} />}
                    </div>
                    <div className={styles.columnBody}>
                        {!React.Children.toArray(children).length ? <h5 className={styles.emptyColumn}>Empty Column</h5> : children }
                    </div>
                    <Modal open={showModal} close={() => setShowModal(false)}>
                        <FormTaskCreator type="creator" title="" description="" status="toDo" save={createTask} />
                    </Modal>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
};

export default Column;