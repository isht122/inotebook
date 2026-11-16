import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3 mb-3">
            <div className="card my-3 h-100">
                <div className="card-body d-flex flex-column">
                    <h3 className="card-title">{note.title}</h3>
                    <p className="card-text">{note.description}</p>
                    <div className="mt-auto">
                        <span onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }} style={{ cursor: "pointer" }}>
                            <i className="fa-regular fa-trash-can mx-2"></i>
                        </span>
                        <span onClick={() => { updateNote(note) }} style={{ cursor: "pointer" }}>
                            <i className="fa-solid fa-pen-to-square mx-2"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
