import NoteContext from './noteContext';
import { useState } from 'react';


const NoteState = (props) => {
  const host = "http://localhost:5000"
  // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmFmNTVhZDgxMjRiZTYxODk2NjU3OGFiIn0sImlhdCI6MTc5NDQ2NDQ3Mn0.FPlwe5LJPFXR0tVf21Kj-PZ3vnlQWe0eJ77Pp88GCDo"

  // Sample note data
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  //    Get all Note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json()
    console.log(json)
    if (Array.isArray(json)) {
      setNotes(json)
    } else {
      setNotes([])
    }
  }
  //    Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },

      body: JSON.stringify({ title, description, tag })
    });


    const note = await response.json();
    setNotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });

    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit in client
    const newNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;