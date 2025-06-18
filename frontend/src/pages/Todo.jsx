import React, { useState, useEffect } from 'react';
import { Plus, Heart, Sun, StickyNote, X, Pencil } from 'lucide-react';
import './Todo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import TaskContainer from '../components/TaskContainer';
import NoteContainer from '../components/NoteContainer';
import AddNewTask from '../components/AddNewTask';
import AddNewNote from '../components/AddNewNote';

export default function TodoApp() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [noteEditingid, setNoteEditingid] = useState(null);
    const [noteEditingData, setNoteEditingData] = useState({
        title: '',
        description: ''
    })
    const [username, setUsername] = useState("");
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        completed: false
    });
    const [noteForm, setNoteForm] = useState({
        id: "",
        title: "",
        description: ""
    });
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = tasks.length - completedTasks;

    useEffect(() => {
        if (token) {
            fetchTasks();
            fetchUsername();
            fetchNotes();
        }

    }, [])

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handlenoteInput = (e) => {
        setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
    }

    const startEditingNote = (note) => {
        setNoteEditingid(note.id);
        setNoteEditingData({
            title: note.title,
            description: note.description
        });
    }

    const handleEditChange = (e) => {
        setNoteEditingData({ ...noteEditingData, [e.target.name]: e.target.value });
    }

    const fetchUsername = async () => {
        try {
            const decoded = jwtDecode(token);
            const useremail = decoded.useremail;
            const res = await axios.get(`http://localhost:8000/user/dashboard/${useremail}`,);
            setUsername(res.data.username);
        } catch (error) {

        }
    }
    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8000/task/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(res.data || []);
        }
        catch (error) {
            console.error(error);
        }
    }

    const addTask = async () => {
        try {
            console.log("Sending:", formData);
            const res = await axios.post("http://localhost:8000/task/add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(res.data.msg);
            setFormData({ id: '', title: '', description: '', completed: false });
            fetchTasks();

        } catch (error) {
            console.error(error);
            alert("Failed to add task.");
        }
    }


    const addNotes = async () => {
        try {
            console.log("sending note", noteForm);
            const res = await axios.post(`http://localhost:8000/note/add`, noteForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(res.data.msg);
            setNoteForm({ id: '', title: '', description: '' });
            fetchNotes();
        } catch (error) {
            console.error(error);
            alert("Failed to add note.");
        }
    }
    const updateCompleted = async (id, taskcompleted) => {
        try {
            await axios.patch(`http://localhost:8000/task/update/${id}`, { completed: !taskcompleted }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error(error);
            alert("Failed to update task.");
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/task/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(res.data.msg);
            fetchTasks();
        }
        catch (error) {
            console.error(error);
        }

    }




    const fetchNotes = async () => {
        try {
            const res = await axios.get("http://localhost:8000/note/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setNotes(res.data || [])
        }
        catch (error) {
            console.error("Failed to fetch notes:", error);
            alert("Failed to fetch notes. Please try again later.");
        }

    }

    const deleteNotes = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8000/note/delete/${id}`)
            alert(res.data.msg)
            fetchNotes();
        }
        catch (error) {
            alert("Note couldn't be deleted")
        }
    }

    const saveEditedNote = async (id) => {
        try {
            console.log("Saving edited note:", noteEditingData);
            const res = await axios.patch(`http://localhost:8000/note/update/${id}`, noteEditingData)
            alert(res.data.msg);
            setNoteEditingid(null);
            fetchNotes();

        }
        catch (error) {
            console.error("Failed to save edited note:", error);
        }
    }

    const formatDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="todo-container">
            {/* Floating decorative elements */}
            <div className="floating-decoration flower">🌸</div>
            <div className="floating-decoration sparkle">✨</div>
            <div className="floating-decoration butterfly">🦋</div>

            <div className="content-wrapper">
                {/* Header */}
                <div className="header-section">
                    <div className="header-card">
                        <Sun className="header-icon sun-icon" />
                        <h1 className="main-title">
                            Hello, {username}!
                        </h1>
                        <Heart className="header-icon heart-icon" />
                    </div>

                    <div className="date-card">
                        <p className="date-text">
                            📅 {formatDate()}
                        </p>
                    </div>

                    <button className='logout-btn' onClick={()=>navigate("/")}>
                        <p className='date-text'>Logout</p>
                    </button>
                </div>

                {/* Stats */}
                <div className="stats-container">
                    <div className="stat-card stat-total">
                        <div className="stat-number">{tasks.length}</div>
                        <div className="stat-label">Total Tasks</div>
                    </div>
                    <div className="stat-card stat-completed">
                        <div className="stat-number">{completedTasks}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                    <div className="stat-card stat-remaining">
                        <div className="stat-number">{remainingTasks}</div>
                        <div className="stat-label">Remaining</div>
                    </div>
                </div>

                <div className="main-content">
                    {/* Tasks List */}
                    <TaskContainer tasks={tasks} updateCompleted={updateCompleted} deleteTask={deleteTask} />

                    <NoteContainer notes={notes} deleteNotes={deleteNotes} startEditingNote={startEditingNote} noteEditingid={noteEditingid} noteEditingData={noteEditingData} handleEditChange={handleEditChange} saveEditedNote={saveEditedNote} />

                    <AddNewTask formData={formData} handleInput={handleInput} addTask={addTask} />
                    <AddNewNote noteForm={noteForm} handlenoteInput={handlenoteInput} addNotes={addNotes} />
                </div>
            </div>
            <div className="motivational-card">
                        <div className="motivational-content">
                            <div className="motivational-emoji">🌻</div>
                            <p className="motivational-text">
                                You've got this, sweetie!
                            </p>
                            <p className="motivational-subtext">
                                Every small step counts 💕
                            </p>
                        </div>
                    </div>
        </div>
    );
}