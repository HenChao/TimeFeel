import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad, longBuzz, shortBuzz, zeroBuzz, delay } from "../common/utils";
import document from "document";

// Define constants
clock.granularity = "minutes";
const vibTimeMS = 700;
const vibHashMap = {
  0: 1,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 1,
  6: 2,
  7: 3,
  8: 4,
  9: 5,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 6,
  15: 3,
  16: 4,
  17: 5,
  18: 6,
  19: 7,
  20: 4,
  21: 5,
  22: 6,
  23: 7
}; // The number of vibrations for each number

// Set up combo button functionality
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
    }, (vibHashMap[Math.floor(mins/10)] + 1) * vibTimeMS);
  }, (vibHashMap[hours] + 1) * vibTimeMS);
}

// Update the clock display
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
      }, vibTimeMS);
    };
  } else {
    shortBuzz();
    setTimeout(function(){
      vibrate(num - 1);
    }, vibTimeMS);
  }
}
