import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad, longBuzz, shortBuzz, zeroBuzz, delay } from "../common/utils";
import document from "document";


clock.granularity = "minutes";

let btnTR = document.getElementById("btn-tr");
btnTR.onactivate = function(evt) {
  const now = new Date();
  const hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }
  const mins = now.getMinutes();
  
  // Vibrate for number of hours first
  vibrate(hours);
  
  // Vibrate for tens digit of minutes
  setTimeout(function(){
    vibrate(Math.floor(mins/10));
    
    // Vibrate for singles digit of minutes
    setTimeout(function(){
      vibrate(mins % 10);
    }, 2000);
  }, 2000);
}

clock.ontick = (evt) => {
  const today = evt.date;
  const hours = today.getHours();
  const mins = zeroPad(today.getMinutes());
    
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12; // 12h format
  } else {
    hours = zeroPad(hours); // 24h format
  }
  
  let lblClock = document.getElementById("lblClock");
  lblClock.text = `${hours}:${mins}`;
}

// Define vibration events
// Long vibrations signifies a unit of 5
// Short vibration signifies a unit of 1
// E.G. 8 would produce one long, then three short vibrations
function vibrate(num) {
  if (num == 0){
    zeroBuzz();
    return;
  } else if (num == 1){
    shortBuzz();
    return;
  }
  
  if (num - 5 >= 0) {
    longBuzz();
    
    if (num - 5 == 0){
      return;
    } else {
      setTimeout(function(){
        vibrate(num - 5);
      }, 500);
    };
  } else {
    shortBuzz();
    setTimeout(function(){
      vibrate(num - 1);
    }, 500);
  }
}
