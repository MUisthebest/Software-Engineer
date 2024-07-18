let day_night_1 = document.getElementById('moon');

let day_night_2 = document.getElementById('sun');

day_night_1.style.display = "none";

document.addEventListener("DOMContentLoaded", function() {

    const changeMode = localStorage.getItem("changeMode");

    updateMode(changeMode);

    day_night_2.addEventListener('click', ()=> {
        localStorage.setItem("changeMode","white");
        updateMode("white");
    })
    
    day_night_1.addEventListener('click', ()=> {
        localStorage.setItem("changeMode","black");
        updateMode("black");
    })

    function updateMode(choose){
        if(choose === "white"){
            document.documentElement.style.setProperty('--color-1','#3C5B6F');
            document.documentElement.style.setProperty('--color-2','#153448');
            day_night_2.style.display = "none";      
            day_night_1.style.display = "unset"; 
        }
        else{
            document.documentElement.style.setProperty('--color-1','#45586b');
            document.documentElement.style.setProperty('--color-2','#9AC8CD');
            day_night_1.style.display = "none";      
            day_night_2.style.display = "unset"; 
        }
    }
    
    let active_battery  = document.getElementById('active_battery');
    let battery_level = document.getElementById('battery_level');
    let battery_icon = document.getElementById('battery_icon');
        
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
                    break;
                case false:
                    battery_icon.className = "fas fa-battery-three-quarters";
                    active_battery.classList.remove('active_battery');
                    battery_icon.style.color = "unset";
                    break;              
    
            }
        })
        ChangeBattery(battery);
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

        function ChangeBattery(battery) {
            if (battery.charging) {
                battery_icon.className = "bx bxs-battery-charging";
                active_battery.classList.add('active_battery');
                battery_icon.style.color = "#fff";
            } 
            else{
                battery_icon.className = "fas fa-battery-three-quarters";
                active_battery.classList.remove('active_battery');
                battery_icon.style.color = "unset";
            }
        }

})



