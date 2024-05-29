const joinData = [
    {
        img: "/Media/background.jpg",
        name: "Bằng very handsome",
        describe: "abc",
        cost: "10000"
    },
    {
        img: "/Media/background.jpg",
        name: "Monster",
        describe: "oia",
        cost: "12000"
    },
    {
        img: "/Media/background.jpg",
        name: "Oggy",
        describe: "haha",
        cost: "100000"
    },
    {
        img: "/Media/background.jpg",
        name: "Xì trum",
        describe: "haha",
        cost: "100000"
    },
    {
        img: "/Media/background.jpg",
        name: "Hunter",
        describe: "haha",
        cost: "100000"
    },
    {
        img: "/Media/background.jpg",
        name: "Meo Meo",
        describe: "haha",
        cost: "100000"
    }
]

let index = 0;

let importlistUser = document.getElementById('game_bx_1');


function UpdateDiv(){
    const intervalID = setInterval(()=>{
        let card = document.createElement('div');
        card.classList.add('card');
        if(index == joinData.length){
            clearInterval(intervalID);
            return;
        }
        else{
            index++;
        }
        const {img, name, describe, cost} = joinData[index-1];
        card.innerHTML 
        = 
       `<img src="${img}"><div class="content"><div class="left"><h5>${name}</h5> <p> ${describe}</p></div><h6>${cost}</h6>` 
        importlistUser.appendChild(card);
    },1)
}

document.addEventListener('DOMContentLoaded', () => {
    UpdateDiv();
})