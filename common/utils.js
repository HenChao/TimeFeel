import { vibration } from "haptics";


/** @description Add zero in front of numbers < 10.
 * @param {number} num The number to pad.
 * @return {string}
 */
export function zeroPad(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

export function longBuzz() {
  vibration.start("nudge");
}

export function shortBuzz() {
  vibration.start("bump");
}

export function zeroBuzz() {
  vibration.start("confirmation");
}
