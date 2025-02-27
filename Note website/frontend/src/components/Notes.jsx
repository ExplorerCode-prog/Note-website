import { useEffect, useState } from "react";
import api from "../api";
import { useNotes } from "./NoteProvider";
import "../styles/Note.css"

function Note({ note }) {
  const [date, setDate] = useState("");
  const { deleteNote } = useNotes();

  const handleClick = (e) => {
    e.preventDefault();
    const id = note.id;
    deleteNote(id);
  };
  useEffect(() => {
    const setTime = () => {
      const formatteddate = new Date(note.created_at).toLocaleDateString(
        "en-US"
      );

      setDate(formatteddate);
    };
    setTime();
  }, []);

  return (
    <div className="note-item">
      <h4>TITLE</h4>
      <span>{note.title}</span>
      <br />
      <h5>Date</h5>
      {date}
      <p>{note.content}</p>
      <button onClick={handleClick} className="delete-button">X</button>
      <br />
      <br />
    </div>
  );
}

export default Note;
