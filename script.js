const cells = document.querySelectorAll('#board img');
const reset_button = document.querySelector("#reset");
const winner_text = document.querySelector("#winner-text");
const current_player_display = document.querySelector("#current-player");

game_board = board();
let current_player = 'O';
let won = false;

function board() {
    function clear_board() {
        cells.forEach((cell) => {
            cell.src = "images/blank.png";
        })

        winner_text.textContent = "";
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

    return {
        clear_board,
        change_player
    };
}

function player(player_tag) {
    let wins;
    let turns;

    return {
        wins,
        turns
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
  });
});

reset_button.addEventListener("click", game_board.clear_board);