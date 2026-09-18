import { useState } from 'react';



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