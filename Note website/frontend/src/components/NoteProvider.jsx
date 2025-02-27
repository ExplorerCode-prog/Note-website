import React, { useContext, useState, createContext, Children } from "react";
import api from "../api";

const NotesContext = createContext();

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      api.get("/api/notes/").then((resp) => {
        setNotes(resp.data);
        console.log(resp.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createNote = async (title, content) => {
    try {
      const resp = await api.post("/api/notes/", { title, content });
      if (resp.status === 201) {
        console.log(resp.data);
        await getNotes();
        alert("Note Created!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create Note");
    }
  };

  const deleteNote = async (id) => {
    try {
      const resp = await api.delete(`/api/notes/delete/${id}/`);
      if (resp.status === 204) {
          await getNotes();
          alert("Note Deleted!");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete Note");
    }
  };



  return (
    <NotesContext.Provider value={{
        notes,
        getNotes,
        createNote,
        deleteNote,
      }}>{children}</NotesContext.Provider>
  );
};
