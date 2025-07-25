const cells = document.querySelectorAll('#board img');

let current_player = 'O';
let won = false;

function board() {
    function clear_board() {
        cells.forEach((cell) => {
            cell.src = "images/blank.png";
        })
    }

    function change_player() {
        if(current_player == 'O') {
            current_player = 'X';
        } else {
            current_player = 'O';
        }
    }   

    return {
        clear_board,
        change_player
    };
}

function player(player_tag) {

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

game_board = board();