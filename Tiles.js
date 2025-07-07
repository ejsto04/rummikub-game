var tiles = [];
function makeTiles() {
    tiles = [];
    for (var i = 1; i < 14; i++) {
        tiles.push({
            value: i,
            color: "black"
        });
        tiles.push({
            value: i,
            color: "blue"
        });
        tiles.push({
            value: i,
            color: "orange"
        });
        tiles.push({
            value: i,
            color: "red"
        });
        tiles.push({
            value: i,
            color: "black"
        });
        tiles.push({
            value: i,
            color: "blue"
        });
        tiles.push({
            value: i,
            color: "orange"
        });
        tiles.push({
            value: i,
            color: "red"
        });
    }
    tiles.push({
        value: 0,
        color: "joker"
    });
    tiles.push({
        value: 0,
        color: "joker"
    });
}


const playerRack = document.getElementById("playerRack");
const board = document.getElementById("board");
var playerHand = [];

const colors = ['red', 'blue', 'orange', 'black'];
const values = Array.from({ length: 13 }, (_, i) => i + 1);

function generateTile() {
    var ran = Math.floor(Math.random() * tiles.length);
    console.log(ran);
    //const color = colors[Math.floor(Math.random() * colors.length)];
    //const value = values[Math.floor(Math.random() * values.length)];
    const tile = document.createElement("div");
    tile.className = "w-12 h-16 border rounded bg-white flex items-center justify-center font-bold shadow cursor-pointer select-none";
    if (tiles[ran].value == 0) {
        tile.style.color = "purple";
        tile.textContent = "J";
    } else {
        tile.style.color = tiles[ran].color;
        tile.textContent = tiles[ran].value;
    }
    const value = tile.textContent;
    const color = tile.style.color
    tiles.splice(ran, 1);
    return { value, color };
}

function drawTileForCurrentPlayer() {
    const tile = generateTile();
    players[currentPlayerIndex].tiles.push(tile);
    renderCurrentPlayer();
    nextPlayer();
}

function organizeByRunsForCurrentPlayer() {
    let temp = [];
    let joker = [];
    for (let z = 0; z < colors.length; z++) {
        for (let x = 0; x <= 14; x++) {
            for (let y = 0; y < players[currentPlayerIndex].tiles.length; y++) {
                if (players[currentPlayerIndex].tiles[y].color == colors[z] && players[currentPlayerIndex].tiles[y].value == x) {
                    temp.push(players[currentPlayerIndex].tiles[y]);
                }
                if (players[currentPlayerIndex].tiles[y].value == 'J' && z == 0 && x == 0) {
                    joker.push(players[currentPlayerIndex].tiles[y]);
                }
            }
        }
    }
    for (let x = 0; x < joker.length; x++) {
        temp.push(joker[x]);
    }
    players[currentPlayerIndex].tiles = temp;
    renderCurrentPlayer();
}

function organizeBySetsForCurrentPlayer() {
    let temp = [];
    for (let x = 1; x <= 15; x++) {
        for (let y = 0; y < players[currentPlayerIndex].tiles.length; y++) {
            let val;
            if (x == 15) {
                val = 'J';
            } else {
                val = x;
            }
            if (players[currentPlayerIndex].tiles[y].value == val) {
                temp.push(players[currentPlayerIndex].tiles[y]);
            }
        }
    }
    players[currentPlayerIndex].tiles = temp;
    renderCurrentPlayer();

}

function submitMove() {
    alert("Move submitted!");
}

let players = [];
let currentPlayerIndex = 0;

function startGame() {
    makeTiles();
    const count = parseInt(document.getElementById("playerCount").value);
    if (isNaN(count) || count < 1 || count > 4) {
        alert("Enter a valid number of players (1–4)");
        return;
    }

    // Reset state
    players = [];
    currentPlayerIndex = 0;
    document.getElementById("playerArea").innerHTML = "";

    // Create players and draw 14 tiles each
    for (let i = 0; i < count; i++) {
        const player = {
            id: i + 1,
            tiles: []
        };

        for (let j = 0; j < 14; j++) {
            player.tiles.push(generateTile());
        }

        players.push(player);
    }

    // Show first player
    renderCurrentPlayer();
    document.getElementById("nextPlayerBtn").classList.remove("hidden");
    document.getElementById("turnIndicator").classList.remove("hidden");
    document.getElementById("nextPlayerBtn").classList.remove("hidden");
    document.getElementById("turnIndicator").classList.remove("hidden");
    document.getElementById("actionButtons").classList.remove("hidden");
}


function renderCurrentPlayer() {
    const player = players[currentPlayerIndex];
    const area = document.getElementById("playerArea");
    area.innerHTML = ""; // Clear previous rack

    document.getElementById("turnIndicator").textContent = `Player ${player.id}'s Turn`;

    const rack = document.createElement("div");
    rack.className = "flex flex-wrap justify-center gap-2";

    player.tiles.forEach(tile => {
        const tileDiv = document.createElement("div");
        tileDiv.className = "w-12 h-16 border rounded bg-white flex items-center justify-center font-bold shadow";
        tileDiv.style.color = tile.color;
        tileDiv.textContent = tile.value;
        rack.appendChild(tileDiv);
    });

    area.appendChild(rack);
}

async function nextPlayer() {
    console.log("Changing players...");
    await sleep(500);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    renderCurrentPlayer();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
