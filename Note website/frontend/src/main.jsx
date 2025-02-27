import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NotesProvider } from "./components/NoteProvider.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </StrictMode>
);
