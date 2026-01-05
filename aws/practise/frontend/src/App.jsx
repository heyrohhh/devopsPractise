import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data.data);
    } catch (err) {
      console.error("Failed to fetch books", err);
      setBooks([]);
    }
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/books", form);
      setForm({ title: "", author: "", description: "" });
      fetchBooks();
    } catch (err) {
      console.error("Failed to add book", err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Management</h1>

      <form onSubmit={addBook}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {Array.isArray(books) &&
          books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
              <button
                onClick={() => deleteBook(book.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
