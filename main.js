"use strict";
window.addEventListener("load", init);

// Defining global varibals from the dom
const colorInput = document.querySelector("body > div > input[type=color]");
const hexText = document.getElementById("hex");
const rgbText = document.getElementById("rgb");
const hslText = document.getElementById("hsl");
const board = document.querySelector(".color-board");

function init() {
  // Setting up a starting point values
  board.style.backgroundColor = colorInput.value;
  hexText.textContent = colorInput.value;
  showRgb(colorInput.value);
  showHsl(colorInput.value);

  // Calling get color when user is changing the input color
  colorInput.addEventListener("input", getColor);
}

function getColor() {
  //  Calling the different functions to set up the colors values
  showTextColor();
  showBoxColor();
  showRgb();
  showHsl();
}

function setHexColor() {
  let hexCode = colorInput.value;
  return hexCode;
}

function showTextColor() {
  hexText.textContent = setHexColor();
}

function showBoxColor() {
  board.style.backgroundColor = setHexColor();
}

function generateRgb() {
  let hex = setHexColor();
  let r = hex.substring(1, 3);
  let g = hex.substring(3, 5);
  let b = hex.substring(5, 7);
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  const rgbObj = { r, g, b };
  return rgbObj;
}

function showRgb() {
  let rgbObj = generateRgb();
  rgbText.textContent = rgbObj.r + " , " + rgbObj.g + " , " + rgbObj.b;
}

function generateHsl() {
  let hexCode = setHexColor();
  let rgbObj = generateRgb(hexCode);
  let r = rgbObj.r;
  let g = rgbObj.g;
  let b = rgbObj.b;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  return { h, s, l };
}

function showHsl() {
  let hslObj = generateHsl();
  hslText.textContent = `hsl(${Math.floor(hslObj.h)}%,${Math.floor(
    hslObj.s
  )}%,${Math.floor(hslObj.l)}%)`;
}
