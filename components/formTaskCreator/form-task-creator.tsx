import React, { useState } from "react";

interface PropTypes {
    type: "view" | "edit" | "creator",
    title: string,
    description: string,
    save?: CallableFunction,
    status: string
};

const mapTypeDisplayName = {
    view: "View",
    edit: "Edit",
    creator: "Create"
}

const FormTaskCreator: React.FC<PropTypes> = ({type, title, description, status, save}) => {
    const [formData, setFormData] = useState({
        title: {
            value: title,
            type: type
        },
        description: {
            value: description,
            type: type
        },
        status: status
    })
    return (
        <div className={"form--task--creator"}>
            <div className="form-task-head">
                <h5 className="type-title">{mapTypeDisplayName[type]}</h5>
                <select
                    name="status"
                    disabled={type === "view"}
                    value={formData.status}
                    onChange={(e) => {
                        setFormData({ ...formData, status: e.target.value })
                    }}
                >
                    <option value={"toDo"}>To Do</option>
                    <option value={"inProgress"}>In Progress</option>
                    <option value={"done"}>Done</option>
                </select>
            </div>
            <div className="title--block">
                <p className="label--form--task">Title</p>
                {formData.title.type !== "view"  
                    ? (
                        <input
                            value={formData.title.value} 
                            onChange={(e) => {
                                setFormData({ ...formData, title: {...formData.title, value: e.target.value }})
                            }} 
                        />
                    ) : (
                        <h5>{formData.title.value}</h5>
                    )
                }
            </div> 
            <div className="description--block">
                <p className="label--form--task">Description</p>
                {formData.title.type !== "view"  
                    ? (
                        <textarea
                            value={formData.description.value}
                            onChange={(e) => {
                                setFormData({ ...formData, description: {...formData.description, value: e.target.value }})
                            }}
                        />
                    ) : (
                        <p>{formData.description.value}</p>
                    )
                }
            </div>

            {type !== "view" && (
                <button
                    className="form--task--creator--save--btn"
                    onClick={() => save?.(formData)}
                >
                    Save
                </button>
            )}
        </div>
    )
}

export default FormTaskCreator;