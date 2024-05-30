const joinData = [
    {
        img: "/Media/mon1.png",
        name: "Bằng very handsome",
        describe: "abc",
        cost: "10000"
    },
    {
        img: "/Media/mon2.png",
        name: "Monster",
        describe: "oia",
        cost: "12000"
    },
    {
        img: "/Media/mon3.png",
        name: "Oggy",
        describe: "haha",
        cost: "100000"
    },
    {
        img: "/Media/mon4.png",
        name: "Xì trum",
        describe: "haha",
        cost: "100000"
    },
    {
        img: "/Media/mon5.png",
        name: "Hunter",
        describe: "haha",
        cost: "100000"
    },
    {
        img: "/Media/mon6.png",
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
       `<a href="/boxItem" class="chooseCard"><img src="${img}"><div class="content"><div class="left"><h5>${name}</h5> <p> ${describe}</p></div><h6>${cost}</h6></div><a>` 
        importlistUser.appendChild(card);
    },1);
}

document.addEventListener('DOMContentLoaded', () => {
    UpdateDiv();
})



