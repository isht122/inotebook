# iNotebook

A simple and safe notes app where every user keeps their own private notes. Built with the MERN stack.

## Features

- Sign up and log in with email and password
- Add notes with a title, description and tag
- Edit and delete notes
- Each user sees only their own notes
- Alert messages for actions
- Dark mode switch
- Sticky navbar and an About page

## Built with

- **MongoDB** for the database
- **Express and Node.js** for the server
- **React** for the pages
- **Bootstrap** for the design

## How to run it on your computer

1. Install Node.js and MongoDB, and start MongoDB.
2. In the main folder, run:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```
3. Create a file named `.env` inside the `backend` folder and add one line with your own secret word:
   ```
   JWT_SECRET=your_secret_word_here
   ```
4. Start the app from the main folder:
   ```
   npm run both
   ```
5. Open http://localhost:3000 in your browser.

## Author

Nutan Singh
