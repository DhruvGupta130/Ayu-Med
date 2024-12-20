import React from "react";
import "../Styles/NotFound.css"; 

function NotFound() {
  const deployedURL = window.location.href;

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-description">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <p className="notfound-url">
          The requested URL: <b>{deployedURL}</b> was not found on this server.
        </p>
        <p className="notfound-suggestion">
          You can go back to the <a href="/" className="notfound-link">home page</a> or explore other sections.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
