import React from 'react'
import { Star, CheckCircle, Circle, } from 'lucide-react';

const TaskContainer = ({tasks,updateCompleted,deleteTask}) => {
  return (
    <div className="tasks-section">
    <div className="tasks-container">
        <div className="tasks-header">
            <Star className="tasks-icon" />
            <h2 className="tasks-title">My Tasks</h2>
            <div className="honey-emoji">🍯</div>
        </div>
        <button className="task-checkbox" ></button>

        {tasks.length==0?(
             <div className="no-tasks-message">No tasks yet! Add some lovely tasks to get started.</div>
        ):(tasks.map((task) => (
            <div className="tasks-list">
                <div className="task-card task-incomplete">
                    <div className="task-content">
                        <button className="task-checkbox" onClick={() => updateCompleted(task.id, task.completed)} >
                            {task.completed ? (
                                <CheckCircle className="checkbox-icon completed-icon" />
                            ) : (
                                <Circle className="checkbox-icon incomplete-icon" />
                            )}
                        </button>
                        <div className="task-info">
                            <h3 className="task-title">{task.title}</h3>
                            <p className="task-description">
                                {task.description}
                            </p>
                        </div>
                        <button className="delete-task" onClick={() => deleteTask(task.id)}>🗑️</button>
                    </div>
                </div>
            </div>
        )))}

    
    </div>

</div>
  )
}

export default TaskContainer
