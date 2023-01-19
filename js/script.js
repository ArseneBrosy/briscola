//#region CARDS
class Card {
    constructor() {
        this.src = "";
    }
}
var cards = [];
var famillys = ["baton", "coupe", "epee", "or"];
for (var familly = 0; familly < 4; familly ++) {
    var famillyObj = [];
    for (var card = 0; card < 10; card ++) {
        var newCard = new Card();
        newCard.src = "./images/cards/" + famillys[familly] + "/" + (card + 1).toString() + ".jpg";
        famillyObj.push(newCard);
    }
    cards.push(famillyObj);
}
var deck = [];
var remainingDeck = [];
for (var familly = 0; familly < 4; familly ++) {
    for (var card = 0; card < 10; card ++) {
        remainingDeck.push([familly, card]);
    }
}
for (var i = 0; i < 40; i ++) {
    var nextI = Math.floor(Math.random() * remainingDeck.length);
    deck.push(remainingDeck[nextI]);
    remainingDeck.splice(nextI, 1);
}
var cardsValue = [0, 0, 0, 0, 0, 2, 3, 4, 10, 11];
//#endregion

//#region VARIABLES
var player1cards = [deck[0], deck[1], deck[2]];
var player2cards = [deck[3], deck[4], deck[5]];
var player1deck = [];
var player2deck = [];
var player1score = 0;
var player2score = 0;

var playerID = 0;
var placer = 0;
var mainFamilly = deck[39][0];

var middleCards = [null, null];
//#endregion

deck.splice(0, 6);

//#region HTML OBJECTS
var myCards = [document.getElementById("card1"), document.getElementById("card2"), document.getElementById("card3")];
//#endregion

function DrawCards() {
    document.getElementById("main-familly").src = cards[deck[deck.length - 1][0]][deck[deck.length - 1][1]].src;
    myCards[0].src = cards[playerID === 0 ? player1cards[0][0] : player2cards[0][0]][playerID === 0 ? player1cards[0][1] : player2cards[0][1]].src;
    myCards[1].src = cards[playerID === 0 ? player1cards[1][0] : player2cards[1][0]][playerID === 0 ? player1cards[1][1] : player2cards[1][1]].src;
    myCards[2].src = cards[playerID === 0 ? player1cards[2][0] : player2cards[2][0]][playerID === 0 ? player1cards[2][1] : player2cards[2][1]].src;

    document.getElementById("my-deck-count").innerHTML = playerID === 0 ? player1score.toString() : player2score.toString();
    document.getElementById("ennemy-deck-count").innerHTML = playerID === 0 ? player2score.toString() : player1score.toString();

    if (middleCards[0] != null) {
        document.getElementById("first-card").src = cards[middleCards[0][0]][middleCards[0][1]].src;
        document.getElementById("first-card").style.display = "block";
    } else {
        document.getElementById("first-card").style.display = "none";
    }
    if (middleCards[1] != null) {
        document.getElementById("second-card").src = cards[middleCards[1][0]][middleCards[1][1]].src;
        document.getElementById("second-card").style.display = "block";
    } else {
        document.getElementById("second-card").style.display = "none";
    }
}

function WinTurn(player) {
    placer = player;
    playerID = player;
    if (player === 0) {
        player1deck.push(middleCards[0]);
        player1deck.push(middleCards[1]);
        player1cards.push(deck[0]);
        player2cards.push(deck[1]);
        deck.splice(0, 2);
        player1score += cardsValue[middleCards[0][1]] + cardsValue[middleCards[1][1]];
    } else {
        player2deck.push(middleCards[0]);
        player2deck.push(middleCards[1]);
        player1cards.push(deck[1]);
        player2cards.push(deck[0]);
        deck.splice(0, 2);
        player2score += cardsValue[middleCards[0][1]] + cardsValue[middleCards[1][1]];
    }
}

function PlaceCard(index) {
    // place the card in the middle
    middleCards[playerID] = playerID === 0 ? player1cards[index] : player2cards[index];
    if (middleCards === [null, null]) {
        if (playerID === 0) {
            document.getElementById("first-card").style.zIndex = -1;
            document.getElementById("second-card").style.zIndex = 0;
            document.getElementById("first-card").style.transform = "translateX(-50%) translateY(-50%) rotate(" + Math.floor(Math.random() * 360).toString() + ")";
        } else {
            document.getElementById("first-card").style.zIndex = 0;
            document.getElementById("second-card").style.zIndex = -1;
            document.getElementById("second-card").style.transform = "translateX(-50%) translateY(-50%) rotate(" + Math.floor(Math.random() * 360).toString() + ")";
        }
    }

    // remove the card
    if (playerID === 0) {
        player1cards.splice(index, 1);
    } else {
        player2cards.splice(index, 1);
    }

    // who played
    if (middleCards[0] != null && middleCards[1] != null) {
        document.getElementById("removable").style.display = "block";

        // next turn
        if (middleCards[0][0] === middleCards[1][0]) {
            // same familly
            if (middleCards[0][1] > middleCards[1][1]) {
                WinTurn(0);
            }
            if (middleCards[0][1] < middleCards[1][1]) {
                WinTurn(1);
            }
        } else {
            if (middleCards[Math.abs(placer - 1)][0] === mainFamilly) {
                WinTurn(Math.abs(placer - 1));
            } else {
                WinTurn(placer);
            }
        }
        middleCards = [null, null];
    } else {
        document.getElementById("removable").style.display = "none";
        playerID = Math.abs(placer - 1);
    }
    DrawCards();
}

DrawCards();