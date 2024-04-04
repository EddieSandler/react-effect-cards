import React, { useState, useEffect } from "react";
import axios from "axios";
import './Cards.css'


const BASE_URL = 'https://deckofcardsapi.com/api/deck';

function Cards() {
  // State to store the deckId
  const [deckId, setDeckId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

        setImageUrl(res.data.cards[0].image);

      }
      catch (error) {
        console.error('error drawing card ', error);
        alert("Error: no cards remaining!");
      }
    };
  };

  const shuffleDeck = async () => {


    const shuffleUrl = `${BASE_URL}/${deckId}/shuffle`;

    const res = await axios.get(shuffleUrl);
    setImageUrl('')
     };



  return (
    <div>
      <div>
        <h1>Draw Cards</h1>
        </div>

      <div>
        {imageUrl && <img src={imageUrl} alt="Card" />}
      </div>
      <button onClick={drawCard}>Draw Card</button>
      <button onClick={shuffleDeck}>Shuffle Deck</button>
    </div>
  );
};

export default Cards;
