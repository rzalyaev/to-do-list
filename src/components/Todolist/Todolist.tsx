import React, {ChangeEvent} from 'react';
import styles from './Todolist.module.css';
import {TaskType, FilterType} from '../../App';
import Button from '../common/Button';
import AddItemForm from '../common/AddItemForm/AddItemForm';
import EditableSpan from "../common/EditableSpan/EditableSpan";
import {Button, Checkbox} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type PropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TaskType[]

    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void

    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

const Todolist = ({id, title, filter, tasks, removeTodolist, changeTodolistTitle,
                      changeTodolistFilter, addTask, removeTask, changeTaskTitle, changeTaskStatus}: PropsType) => {


    const handleOnClickRemoveTodolist = () => removeTodolist(id);
    const handleChangeTodolistTitle = (newTodoTitle: string) => changeTodolistTitle(id, newTodoTitle);

    const filterTasks = (filterMethod: FilterType) => changeTodolistFilter(id, filterMethod);
    const filterAllHandler = () => filterTasks('all');
    const filterActiveHandler = () => filterTasks('active');
    const filterCompletedHandler = () => filterTasks('completed');

    const onClickAddTaskHandler = (newTaskTitle: string) => {
        addTask(id, newTaskTitle);
    }

    const onChangeHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, taskId, newIsDoneValue);
    }

    const tasksElements = tasks.map((task) => {
        const onClickRemoveTaskHandler = () => removeTask(id, task.id);
        const handleChangeTaskTitle = (newTaskTitle: string) => changeTaskTitle(id, task.id, newTaskTitle);

        return (
            <li key={task.id} className={task.isDone ? styles.isDone : ''}>
                <Checkbox
                       checked={task.isDone}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(task.id, e)}
                />
                <EditableSpan value={task.title}
                              changeBody={handleChangeTaskTitle}
                />
                <Button name={'X'}
                        callBack={onClickRemoveTaskHandler}
                />
            </li>
        )
    });

    return (
        <div>
            <h3>
                <EditableSpan value={title}
                              changeBody={handleChangeTodolistTitle}
                />
                <Button name={'X'} callBack={handleOnClickRemoveTodolist}/>
            </h3>
            <AddItemForm addItem={onClickAddTaskHandler}/>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button className={filter === 'all' ? styles.activeFilter : ''}
                        name={'All'}
                        callBack={filterAllHandler}
                />
                <Button className={filter === 'active' ? styles.activeFilter : ''}
                        name={'Active'}
                        callBack={filterActiveHandler}
                />
                <Button className={filter === 'completed' ? styles.activeFilter : ''}
                        name={'Completed'}
                        callBack={filterCompletedHandler}
                />
            </div>
        </div>
    );
};

export default Todolist;