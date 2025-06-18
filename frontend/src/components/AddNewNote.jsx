import React from 'react'

const AddNewNote = ({noteForm,handlenoteInput,addNotes}) => {
    return (
        <div className="add-note-container">
            <div className="add-note-header">
                <div className="emoji">💭</div>
                <h2 className="add-note-title">Add New Note</h2>
                <p className="add-note-subtitle">Capture your thoughts!</p>
            </div>

            <div className="add-note-fields">
                <div className="field">
                    <label>🏷️ Note Title</label>

                    <input type="text" name='title' value={noteForm.title} placeholder="Give it a cute title..." onChange={handlenoteInput} />
                </div>

                <div className="field">
                    <label>✨ Content</label>
                    <textarea name='description' value={noteForm.description} placeholder="Write your thoughts here..." onChange={handlenoteInput} rows="4" />
                </div>
                <button className="add-note-button" onClick={addNotes} >➕ Add Note</button>
            </div>
        </div>
    )
}

export default AddNewNote
