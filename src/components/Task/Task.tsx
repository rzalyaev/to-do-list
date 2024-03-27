import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import styles from "./Task.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../App";

type TaskPropsType = {
  className?: string,
  task: TaskType
  todolistId: string
  changeTaskCompletion: (todolistId: string, taskId: string, isDone: boolean) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = ({
                       className, task, todolistId, changeTaskCompletion, removeTask, changeTaskTitle
                     }: TaskPropsType) => {
  const handleChangeTaskCompletion = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    changeTaskCompletion(todolistId, task.id, event.currentTarget.checked);
  }, []);
  const handleChangeTaskTitle = useCallback((title: string) => {
    changeTaskTitle(todolistId, task.id, title)
  }, []);
  const handleRemoveTask = useCallback(() => {
    removeTask(todolistId, task.id)
  }, []);
  return (
      <li className={styles.task}>
        <Checkbox checked={task.isDone} onChange={handleChangeTaskCompletion}/>
        <div className={styles.taskBody}>
          <EditableSpan initialTitle={task.title} handleOnBlur={handleChangeTaskTitle}/>
          <IconButton aria-label="delete" onClick={handleRemoveTask} size={"small"}>
            <DeleteIcon/>
          </IconButton>
        </div>
      </li>
  );
}