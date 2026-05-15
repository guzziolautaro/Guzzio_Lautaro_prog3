document.addEventListener('DOMContentLoaded', async () => {
    const contenedorCartas = document.getElementById('cartas');
    try {
        const cartasData = await getCartas();

        cartasData.forEach(cardData => {
            const nuevaCarta = new Carta(
                cardData.code,
                cardData.value,
                cardData.suit,
                cardData.image
            );

            const elementoHtml = nuevaCarta.createHtmlElement();
            contenedorCartas.appendChild(elementoHtml);
        });

    } catch (error) {
        console.error('error:', error);
        contenedorCartas.innerHTML = `<p>Hubo un problema al procesar las cartas: ${error}</p>`;
    }
});

async function getCartas() {
    const urlApi = 'https://deckofcardsapi.com/api/deck/new/draw/?count=6';
    
    const response = await fetch(urlApi);
    
    if (!response.ok) {
        throw new Error('Error al obtener las cartas de la API');
    }

    const data = await response.json();
    return data.cards;
}