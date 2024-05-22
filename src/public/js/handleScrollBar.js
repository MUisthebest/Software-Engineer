
let game_bx_1 = document.getElementById('game_bx_1');

let game_bx_1_left_bt = document.getElementById('game_bx_1_left_bt');
let game_bx_1_right_bt = document.getElementById('game_bx_1_right_bt');

game_bx_1_left_bt.addEventListener('click', ()=>{
    game_bx_1.scrollLeft = game_bx_1.scrollLeft - 250;
});

game_bx_1_right_bt.addEventListener('click', ()=>{
    game_bx_1.scrollLeft = game_bx_1.scrollLeft + 250;
});

let day_night_1 = document.getElementById('day_night_1');

let day_night_2 = document.getElementById('day_night_2');

day_night_1.style.display = "none";

day_night_2.addEventListener('click', ()=> {
    document.documentElement.style.setProperty('--color-1','#3C5B6F');
    document.documentElement.style.setProperty('--color-2','#153448');
    day_night_2.style.display = "none";      
    day_night_1.style.display = "unset"; 
})

day_night_1.addEventListener('click', ()=> {
    document.documentElement.style.setProperty('--color-1','#45586b');
    document.documentElement.style.setProperty('--color-2','#9AC8CD');
    day_night_1.style.display = "none";      
    day_night_2.style.display = "unset"; 
})

let active_battery  = document.getElementById('active_battery');
let battery_level = document.getElementById('battery_level');
let battery_icon = document.getElementById('battery_icon');
let audio1 = new Audio('./Media/charging.mp3');


navigator.getBattery().then(battery =>{
    const change_battery = () => {
        battery_level.innerText = Math.round(battery.level*100)+"%";
    }
    setInterval(change_battery, 1000);
    change_battery()

    battery.addEventListener('chargingchange', () => {
        switch (battery.charging){
            case true:
                battery_icon.className = "bx bxs-battery-charging";
                active_battery.classList.add('active_battery');
                battery_icon.style.color = "#fff";
                audio1.play();
                break;
            case false:
                battery_icon.className = "fas fa-battery-three-quarters";
                active_battery.classList.remove('active_battery');
                battery_icon.style.color = "unset";
                audio1.play();
                break;              

        }
    })
    });

    let wifi = document.getElementById('wifi');
    const wifi_change =() =>{
        if(navigator.onLine){
            wifi.style.color = "green";
        }
        else {
            wifi.style.color = "#fff";
        }
    }

    setInterval(wifi_change, 100);

    wifi_change();

