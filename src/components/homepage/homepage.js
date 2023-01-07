import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom"

import "./homepage.css"

const Homepage = ({setLoginUser}) => {

    let history=useHistory()

    

    const Addtodo = () => {
        history.push("/addtodo")
    }


    const [todoList, setTodoList] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTodoList() {
            const response = await fetch('/todo-list');
            const todoList = await response.json();
            setTodoList(todoList)
        }
        fetchTodoList();
    }, []);

    async function handleStart(taskId) {
        try {
            if (currentTask) {
                throw new Error('Finish or pause the ongoing task first');
            }
            const response = await fetch("/tasks/${taskId } / start", { method: 'POST' });
            if (!response.ok) {
                throw new Error('Error starting task');
            }
            const task = await response.json();
            setCurrentTask(task);
        } catch (error) {
            setError(error.message);
        }
    }

    async function handlePause(taskId) {
        try {
            const response = await fetch("/tasks/${ taskId } / pause", { method: 'POST' });
            if (!response.ok) {
                throw new Error('Error pausing task');
            }
            const task = await response.json();
            setCurrentTask(null);
        } catch (error) {
            setError(error.message);
        }
    }

    async function handleEnd(taskId) {
        try {
            const response = await fetch("/tasks/${ taskId } / end", { method: 'POST' });
            if (!response.ok) {
                throw new Error('Error ending task');
            }
            const task = await response.json();
            setCurrentTask(null);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="homepage">
            <h1>Hello Homepage</h1>



            <section>UserNAME</section>
            <div className='main-container'>


                <div className='sidebar'>

                    To-do List
                    History

                </div>

                <div className='main-activity'>



                    <table>
                        <thead>
                            <th>Activity</th>
                            <th>Status</th>
                            <th>Time Taken</th>
                            <th>Action</th>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Running</td>
                                <td>Pending</td>
                                <td>4 min</td>
                                <td>Start</td>
                            </tr>

                            <tr>
                                <td>Cooking</td>
                                <td>Completed</td>
                                <td>6 min</td>
                                <td>End</td>

                            </tr>

                            {todoList.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                    <td>{task.timeTaken}</td>
                                    <td>
                                        {task.status === 'not started' && (
                                            <button onClick={() => handleStart(task.id)}>Start</button>
                                        )}
                                        {task.status === 'in progress' && (
                                            <>
                                                <button onClick={() => handlePause(task.id)}>Pause</button>
                                                <button onClick={() => handleEnd(task.id)}>End</button>
                                            </>
                                        )}
                                        {task.status === 'paused' && (
                                            <button onClick={() => handleStart(task.id)}>Resume</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                </div>
                <button onClick={Addtodo} >ADD NEW ACTIVITY</button>

            </div>




            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage