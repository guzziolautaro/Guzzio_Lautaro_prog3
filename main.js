let deckId = null;

const pageHistory = [];
let pageNum = 0;

document.addEventListener('DOMContentLoaded', async () => {
    const contenedorCartas = document.getElementById('cartas');
    try {
        const cardsData = await getCartas();
        insertCards(cardsData) 

    } catch (error) {
        console.error('error:', error);
        contenedorCartas.innerHTML = `<p>Hubo un problema al procesar las cartas: ${error}</p>`;
    }
});

async function getCartas(deckid = "new") {
    const urlApi = `https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=6`;
    
    const response = await fetch(urlApi);
    
    if (!response.ok) {
        throw new Error('Error al obtener las cartas de la API');
    }

    
    const data = await response.json();
    deckId = data.deck_id;
    return data.cards;
}

function insertCards(cardsData) {
    const cardContainer = document.getElementById('cartas');
    
    cardContainer.innerHTML = '';
    
    const cardInstances = [];

    cardsData.forEach(cardData => {
        const newCard = new Carta(
            cardData.code,
            cardData.value,
            cardData.suit,
            cardData.image
        );
        
        cardInstances.push(newCard);

        const htmlElement = newCard.createHtmlElement();
        cardContainer.appendChild(htmlElement);
    });

    if (pageNum === pageHistory.length) {
        pageHistory.push(cardInstances);
    }
}