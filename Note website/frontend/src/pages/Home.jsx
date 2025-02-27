import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Notes";
import { useNotes } from "../components/NoteProvider";
import "../styles/Home.css"


const Home = () => {
  const { notes, getNotes, createNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const noteLoad = () => {
      getNotes();
    };
    noteLoad();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    createNote(title, content);
  };

  return (
    <div>
      <h2>Notes</h2>
      <div className="notes">
        {notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </div>
      <div className="form-note">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className="form-input"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label htmlFor="content">content</label>
          <input
            className="form-input"
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <br />
          <button type="submit" value="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
export default Home;
