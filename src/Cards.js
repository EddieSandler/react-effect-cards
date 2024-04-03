import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

function Cards() {
  // State to store the deckId
  const [deckId, setDeckId] = useState('');

  // Fetch the deck ID when the component mounts
  useEffect(() => {
    async function fetchDeckId() {
      const res = await axios.get(`${BASE_URL}/new/`);
      setDeckId(res.data.deck_id);
    }
    fetchDeckId();
  }, []);

  // Function to draw a card using the deckId
  const drawCard = async () => {
    if (deckId) {
      const drawCardUrl = `${BASE_URL}/${deckId}/draw/?count=1`;
      // Assuming you want to do something with the response
      const res = await axios.get(drawCardUrl);
      console.log(res.data); // Log or set state with the drawn card data
    } else {
      console.log('Game Over');
    }
  };

  return (
    <div>
      <div>Test</div>
      {/* Ensure drawCard is called without passing event arguments */}
      <button onClick={drawCard}>Draw Card</button>
    </div>
  );
}

export default Cards;
