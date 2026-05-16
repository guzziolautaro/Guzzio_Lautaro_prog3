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

        const infoElement = document.createElement('div');
        infoElement.className = 'carta-info';
        infoElement.innerHTML = `
            <span><strong>Codigo:</strong> ${this.code}</span>
            <span><strong>Palo:</strong> ${this.suit}</span>
            <span><strong>Valor:</strong> ${this.value}</span>
        `;

        container.appendChild(linkElement);
        container.appendChild(infoElement);

        return container;
    }
}