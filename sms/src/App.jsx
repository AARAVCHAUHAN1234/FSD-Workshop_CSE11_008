import { useState } from 'react';
import BookCard from './BookCard';
import './App.css';

// Initial dataset containing books, authors, and publication info
const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publisher: "J. B. Lippincott & Co.",
    yearPublished: 1960,
    genre: "Classic Fiction",
    isbn: "978-0061120084",
    pages: 281
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    publisher: "Secker & Warburg",
    yearPublished: 1949,
    genre: "Dystopian",
    isbn: "978-0451524935",
    pages: 328
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Charles Scribner's Sons",
    yearPublished: 1925,
    genre: "Tragedy",
    isbn: "978-0743273565",
    pages: 180
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter list by title or author
  const filteredBooks = initialBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>📚 Book & Publication Directory</h1>
        <p>Explore books, authors, and publication details</p>
      </header>

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <p className="no-results">No books found matching your search.</p>
          )}
        </div>
      </main>
    </div>
  );
}