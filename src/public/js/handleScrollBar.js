
let game_bx_1 = document.getElementById('game_bx_1');

let game_bx_1_left_bt = document.getElementById('game_bx_1_left_bt');
let game_bx_1_right_bt = document.getElementById('game_bx_1_right_bt');

game_bx_1_left_bt.addEventListener('click', ()=>{
    game_bx_1.scrollLeft = game_bx_1.scrollLeft - 250;
});

game_bx_1_right_bt.addEventListener('click', ()=>{
    game_bx_1.scrollLeft = game_bx_1.scrollLeft + 250;
});

