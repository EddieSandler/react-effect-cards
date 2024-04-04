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
      try {
        const drawCardUrl = `${BASE_URL}/${deckId}/draw/?count=1`;
        // Assuming you want to do something with the response
        const res = await axios.get(drawCardUrl);
        console.log(res.data.deck_id);
        console.log(`${res.data.cards[0].value} of  ${res.data.cards[0].suit}`); // Log or set state with the drawn card data
        let img = res.data.cards[0].image;
        console.log(img);
      }
      catch {
        console.log('Game Over');
      }
    };
  };

  const shuffleDeck = async () => {
    //remove all cards from screen
    //call api to shuffle deck with existing deckId

    const shuffleUrl = `${BASE_URL}/${deckId}/shuffle`;
    // Assuming you want to do something with the response
    const res = await axios.get(shuffleUrl);
    console.log(res.data.deck_id); // Log or set state with the drawn card data
  };
  //button can't be clickable during shuffle


  return (
    <div>
      <div>Draw Cards</div>
      {/* Ensure drawCard is called without passing event arguments */}
      <button onClick={drawCard}>Draw Card</button>
      <button onClick={shuffleDeck}>Shuffle Deck</button>
    </div>
  );
};

export default Cards;
