export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">By {book.author}</p>
      <hr className="divider" />
      <p className="detail-item"><strong>Publisher:</strong> {book.publisher}</p>
      <p className="detail-item"><strong>Year:</strong> {book.yearPublished}</p>
      <p className="detail-item"><strong>Pages:</strong> {book.pages}</p>
      <p className="detail-item"><strong>ISBN:</strong> {book.isbn}</p>
      <span className="badge">{book.genre}</span>
    </div>
  );
}