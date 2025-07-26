const cells = document.querySelectorAll('#board img');
const reset_button = document.querySelector("#reset");
const winner_text = document.querySelector("#winner-text");
const current_player_display = document.querySelector("#current-player");

const o_score = document.querySelector("#o-score");
const x_score = document.querySelector("#x-score");

player_o = player("o");
player_x = player("x");

game_board = board();
let current_player = 'O';
let won = false;

function board() {
    const win_patterns = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Col 1
        [1, 4, 7], // Col 2
        [2, 5, 8], // Col 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    function clear_board() {
        cells.forEach((cell) => {
            cell.src = "images/blank.png";
        })

        winner_text.textContent = "";
        won = false;
    }

    function change_player() {
        if(current_player == 'O') {
            current_player = 'X';
            current_player_display.src = "images/x.png";
        } else {
            current_player = 'O';
            current_player_display.src = "images/o.png";
        }
    }   

    function check_full() {
        let blank = false;

        cells.forEach(cell => {
            if(cell.src.includes('blank.png')) {
                blank = true;
            }
        })

        if(blank === true) {
            return false;
        } else {
            return true;
        }
    }

    function check_win() {
        for(let pattern of win_patterns) {
            const [a, b, c] = pattern;

            const valA = cells[a].getAttribute('src');
            const valB = cells[b].getAttribute('src');
            const valC = cells[c].getAttribute('src');

            if(valA != "images/blank.png" && valA == valB && valB == valC) {
                return valA.includes('o.png') ? 'O' : 'X';
            }
        }

        return null;
    }

    return {
        clear_board,
        change_player,
        check_full,
        check_win
    };
}

function player(player_tag) {
    let wins = 0;

    const get_wins = () => wins;
    const add_win = () => wins++;

    return {
        get_wins,
        add_win
    }
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    // Change ID
    cell.id = `cell-${index}`;

    if (!cell.src.includes('blank.png')) return;
    if (won) return;

    // Change image
    if(current_player == 'O') {
        cell.src = 'images/o.png';
    } else {
        cell.src = 'images/x.png';
    }

    game_board.change_player();
    console.log(`Cell ${index} clicked`);
    const winner = game_board.check_win();

    if(winner) {
        won = true;
        winner_text.textContent = "Player " + winner + " wins!";
        
        if(winner == 'O') {
            player_o.add_win();
            o_score.textContent = "O: " + player_o.get_wins();
        } else {
            player_x.add_win();
            x_score.textContent = "X: " + player_x.get_wins();
        }
    }
  });
});

reset_button.addEventListener("click", game_board.clear_board);