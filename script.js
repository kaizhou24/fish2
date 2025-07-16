class Deck{
    constructor(){
        const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        const suits = ["♥", "♦", "♣", "♠"]; //Hearts, Diamonds, Clubs, Spades
        this.cards = ["w", "w"]; //Initialize the deck with Jokers

        for(const rank of ranks){
            for(const suit of suits){
                this.cards.push(rank + suit);
            }
        }

        console.log("deck created");
    }

    shuffle(){
        for (let i = this.cards.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }

        console.log("deck shuffled");
    }

    deal(){
        if(this.cards.length !== 0){
            return this.cards.pop();
        }else{
            console.log("no more cards");
            return undefined;
        }
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
    }

    draw(deck){
        const card = deck.deal();
        if(card){
            this.hand.push(card);
            console.log(`${this.name} drew ${card}`);
        }
    }
}

class Game{
    constructor(){
        this.deck = new Deck();
        this.deck.shuffle();
        this.players = [
            new Player("alice"),
            new Player("bob"),
            new Player("carol"),
            new Player("dave"),
            new Player("eduardo"),
            new Player("felicia")
        ];
        this.deal_all_cards();
    }

    deal_all_cards(){
        while(this.deck.cards.length > 0){
            for(const player of this.players){
                if(this.deck.cards.length === 0){
                    break;
                }
                player.draw(this.deck);
            }
        }

        this.displayPlayerHand();
    }

    displayPlayerHand(player = this.players[0]){
        // Create or get the display container
        let handDisplay = document.getElementById("player-hand");
        if (!handDisplay) {
            handDisplay = document.createElement("div");
            handDisplay.id = "player-hand";
            document.body.appendChild(handDisplay);
        }
        
        // Create the hand display HTML
        handDisplay.innerHTML = `
            <h2>${player.name.toUpperCase()}'S HAND</h2>
            <div class="hand-info">
                Cards (${player.hand.length}):
            </div>
            <div class="cards-container">
                ${player.hand.map(card => `
                    <span class="card ${this.getCardColorClass(card)}">${card}</span>
                `).join("")}
            </div>
        `;
    }
    
    getCardColorClass(card){
        if (card === "w") return "red"; // Jokers in red
        const suit = card.slice(-1);
        if (suit === "♥" || suit === "♦") {
            return "red"; // Hearts and diamonds in red
        } else {
            return "black"; // Clubs and spades in black
        }
    }
}

new Game();