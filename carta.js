class Carta {
    constructor(code, value, suit, image) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Carta(data.code, data.value, data.suit, data.image);
    }

    createHtmlElement() {
        const container = document.createElement('div');
        container.className = 'carta-container';

        const linkElement = document.createElement('a');
        linkElement.href = this.image;
        linkElement.target = '_blank';

        const imgElement = document.createElement('img');
        imgElement.src = this.image;
        imgElement.className = 'carta-img';

        linkElement.appendChild(imgElement);

        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'guardar';
        buttonElement.className = 'btn-guardar';

        buttonElement.addEventListener('click', () => {
            this.guardarCarta();
        });

        const infoElement = document.createElement('div');
        infoElement.className = 'carta-info';
        infoElement.innerHTML = `
            <span><strong>Codigo:</strong> ${this.code}</span>
            <span><strong>Palo:</strong> ${this.suit}</span>
            <span><strong>Valor:</strong> ${this.value}</span>
        `;

        container.appendChild(linkElement);
        container.appendChild(infoElement);
        container.appendChild(buttonElement);

        return container;
    }

    guardarCarta() {
        const storedCards = localStorage.getItem('storedCards');
        let cardList = [];

        if (storedCards) {
            cardList = JSON.parse(storedCards);
        }

        const alreadyExists = cardList.some(carta => carta.code === this.code);

        if (alreadyExists) {
            alert(`La carta con codigo ${this.code} ya se encuentra guardada`);
            return;
        }

        const cardData = {
            code: this.code,
            value: this.value,
            suit: this.suit,
            imagen: this.imagen
        };

        cardList.push(cardData);
        localStorage.setItem('storedCards', JSON.stringify(cardList));

        alert(`Carta ${this.value} de ${this.suit} guardada con exito`);
    }
}