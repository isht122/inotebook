import React from 'react'

const About = () => {
  return (
    <div className="container my-4">
      <h1 className="mb-3">About iNotebook</h1>
      <p className="lead">
        iNotebook is a simple and safe place to keep your notes, so you never
        forget anything important.
      </p>

      <h4 className="mt-4">What you can do</h4>
      <ul>
        <li>Create an account and log in with your email and password.</li>
        <li>Add a note with a title, a description and a tag.</li>
        <li>Edit any note whenever you need to change it.</li>
        <li>Delete notes you no longer need.</li>
      </ul>

      <h4 className="mt-4">Your notes are private</h4>
      <p>
        Every user sees only their own notes. Your notes are saved in a
        database, so they are still there when you come back and log in again.
      </p>

      <h4 className="mt-4">How it is built</h4>
      <p>
        This app is built with the MERN stack: MongoDB to store the notes,
        Express and Node.js for the server, and React for the pages you see.
      </p>
    </div>
  )
}

export default About