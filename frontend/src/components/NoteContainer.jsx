import React from 'react'
import { StickyNote, Pencil, X } from 'lucide-react';
const NoteContainer = ({notes,startEditingNote,deleteNotes,noteEditingid,handleEditChange,saveEditedNote,noteEditingData}) => {
    return (
        <div className="notes-wrapper">
            <div className="notes-header">
                <StickyNote className="w-6 h-6 text-purple-500" />
                <h2 className="notes-title">My Notes</h2>
                <div className="text-xl">📝</div>
            </div>
            {notes.length==0?(
<div className="no-notes-message"><p>No notes yet!</p></div>
            ):(notes.map((note) => (

<div className="notes-grid">
    <div className="note-card note-yellow">
        <button className='note-edit-btn' onClick={() => startEditingNote(note)}>
            <Pencil className="icon-edit" />

        </button>
        <button className="note-close-btn" onClick={() => deleteNotes(note.id)}>
            <X className="icon-close" />
        </button>
        {noteEditingid === note.id ? (
            <>
                <input
                    type="text"
                    name="title"
                    value={noteEditingData.title}
                    onChange={handleEditChange}
                    className="note-edit-input"
                />
                <textarea
                    name="description"
                    value={noteEditingData.description}
                    onChange={handleEditChange}
                    className="note-edit-textarea"
                />
                <button className="note-save-btn" onClick={() => saveEditedNote(noteEditingid)}>💾 Save</button>
            </>
        ) : (
            <>
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.description}</p>
            </>
        )}
    </div>
</div>
)))}
        </div>
    )
}

export default NoteContainer
