import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // ================= FETCH NOTES =================
  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://private-notes-app-1-6q2h.onrender.com/api/notes", {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ================= CREATE NOTE =================
  const createNote = async () => {
    if (!title || !content) return;

    await axios.post(
      "https://private-notes-app-1-6q2h.onrender.com/api/notes",
      { title, content },
      { withCredentials: true }
    );

    setTitle("");
    setContent("");
    fetchNotes();
  };

  // ================= DELETE NOTE =================
  const deleteNote = async (id) => {
    await axios.delete(`https://private-notes-app-1-6q2h.onrender.com/api/notes/${id}`, {
      withCredentials: true,
    });
    fetchNotes();
  };

  // ================= UPDATE NOTE =================
  const updateNote = async () => {
    await axios.put(
      `https://private-notes-app-1-6q2h.onrender.com/api/notes/${editingNote.id}`,
      { title: editTitle, content: editContent },
      { withCredentials: true }
    );

    setEditingNote(null);
    fetchNotes();
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await axios.post(
      "https://private-notes-app-1-6q2h.onrender.com/api/auth/logout",
      {},
      { withCredentials: true }
    );
    window.location.href = "/";
  };

  // ================= SEARCH FILTER =================
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* CREATE NOTE */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-2">Create Note</h2>

        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-2 p-2 border rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createNote}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full mb-4 p-2 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* NOTES GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-bold text-lg mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4">{note.content}</p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingNote(note);
                  setEditTitle(note.title);
                  setEditContent(note.content);
                }}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredNotes.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No notes found...
        </p>
      )}

      {/* EDIT MODAL */}
      {editingNote && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg w-96"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>

            <input
              className="w-full mb-2 p-2 border rounded"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="w-full mb-4 p-2 border rounded"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingNote(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateNote}
                className="bg-black text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}