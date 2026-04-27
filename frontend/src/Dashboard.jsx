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

  //======Create Note======//

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
 
  
  //======Delete Note======//
  const deleteNote = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      { withCredentials: true }
    );
    fetchNotes();
  };

   //======Update Note======//

     const updateNote = async () => {
    await axios.put(
      `http://localhost:5000/api/notes/${editingNote.id}`,
      { title: editTitle, content: editContent },
      { withCredentials: true }
    );

    setEditingNote(null);
    fetchNotes();
  };

//======Logout======//

const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    window.location.href = "/";
  };


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
          </div>
        ))}
      </div>

     {/* EDIT MODAL */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            
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

          </div>
        </div>
      )}

    </div>
  );
}