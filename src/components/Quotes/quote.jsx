import React, { useState, useEffect } from "react";
import {GetQuote } from "./quote";
import "./quote.css";

const Quote = () => {
  // Estado para la cita y el autor
  const [Quote, setQuote] = useState("");
  const [Author, setAuthor] = useState("");

  // Efecto para obtener una cita cuando el componente se monta
  const fetchQuote = async () => {
    const { quote, author } = await GetQuote();
    setQuote(quote);
    setAuthor(author);
  };
  
   // Efecto para obtener una cita cuando el componente se monta
   useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <div className="quote">
        <p>{Quote}</p>
        <p>- {Author}</p>
      </div>
    </div>
  );
};

export default Quote;