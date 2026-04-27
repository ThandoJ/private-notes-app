import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes", {
      withCredentials: true,
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    await axios.post(
      "http://localhost:5000/api/notes",
      { title, content },
      { withCredentials: true }
    );

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      { withCredentials: true }
    );
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
      </div>

      {/* CREATE NOTE */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-2 p-2 border rounded"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createNote}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
        >
          Add Note
        </button>
      </div>

      {/* NOTES GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-bold text-lg mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4">{note.content}</p>

             
   

            <button
              onClick={() => deleteNote(note.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}