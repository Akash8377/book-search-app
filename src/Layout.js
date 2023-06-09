import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

const temp = 'https://www.pixelstalk.net/wp-content/uploads/images5/Tan-Aesthetic-Wallpaper-HD.jpg';

export default function Layout() {
  const [book, setBook] = useState("");
  const [details, setDetails] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
      .then(response => response.json())
      .then(data => {
        setDetails(data.items);
      })
      .catch(error => {
        setDetails([]);
      });
  }

  return (
    <div>
      <div id="nav">
        <h1 id="heading">BOOK SEARCH</h1>
      </div>
      <div id="home">
        <form onSubmit={handleSearch}>
          <input type="text" id="search-field" value={book} onChange={e => setBook(e.target.value)} />
          <button type="submit" id="search-btn">Search</button>
        </form>
        <div id="container">
          {details && details.map((item) => (
            <a href={item.volumeInfo.infoLink} key={item.id} target="_blank" rel="noopener noreferrer" className="book">
              <div className="item">
                <div className="overlay"></div>
                <div className="infos">
                  <h4 className="book-title">{item.volumeInfo.title}</h4>
                  <p className="book-author">{item.volumeInfo.authors}</p>
                  <p className="book-page-count">{item.volumeInfo.pageCount}</p>
                </div>
                <a href={item.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                  <img src={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : temp} alt="Book Cover" />
                </a>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
