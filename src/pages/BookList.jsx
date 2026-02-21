import React from "react";

const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    price: 12.99,
    cover: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    price: 10.99,
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    price: 11.99,
    cover: "https://covers.openlibrary.org/b/id/10582258-L.jpg",
  },
];

const BookList = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2>Available Books</h2>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        {sampleBooks.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              width: "200px",
              padding: "16px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={book.cover}
              alt={book.title}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
            <h3 style={{ margin: "12px 0 4px 0" }}>{book.title}</h3>
            <p style={{ margin: "0", color: "#888" }}>by {book.author}</p>
            <p style={{ margin: "8px 0", fontWeight: "bold" }}>
              ${book.price.toFixed(2)}
            </p>
            <p style={{ margin: "0", color: "#52C41A" }}>{book.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
