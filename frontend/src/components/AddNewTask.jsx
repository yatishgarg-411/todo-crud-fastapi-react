import React from 'react'
import {Plus }from 'lucide-react';

const AddNewTask = ({handleInput,addTask,formData}) => {
  return (
    <div className="form-section">
                        <div className="form-container">
                            <div className="form-header">
                                <div className="form-emoji">🌟</div>
                                <h2 className="form-title">Add New Task</h2>
                                <p className="form-subtitle">What lovely thing will you do?</p>
                            </div>

                            <div className="form-fields">
                                <div className="field-group">
                                    <label className="field-label">
                                        ✏️ Task Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Something wonderful..."
                                        className="field-input"
                                        value={formData.title}
                                        onChange={handleInput}
                                    />

                                </div>

                                <div className="field-group">
                                    <label className="field-label">
                                        📝 Description
                                    </label>
                                    <textarea
                                        placeholder="Tell me more about it..."
                                        rows="4"
                                        name='description'
                                        className="field-textarea"
                                        value={formData.description}
                                        onChange={handleInput}
                                    />
                                </div>

                                <button className="add-button" onClick={addTask}>
                                    <Plus className="add-icon" />
                                    Add with Love
                                </button>
                            </div>
                        </div>
                    </div>
  )
}

export default AddNewTask
