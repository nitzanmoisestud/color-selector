"use strict";

const colorInput = document.querySelector("body > div > input[type=color]");
const hexText = document.getElementById("hex");
const rgbText = document.getElementById("rgb");
const hslText = document.getElementById("hsl");

const board = document.querySelector(".color-board");
board.style.backgroundColor = colorInput.value;
hexText.textContent = colorInput.value;
generateRgb(colorInput.value);

colorInput.addEventListener("input", getColor);

function getColor(e) {
  console.log(colorInput.value);
  let hexCode = e.target.value;
  showTextColor(hexCode);
}

function showTextColor(hexCode) {
  hexText.textContent = hexCode;
  showBoxColor(hexCode);
}

function showBoxColor(hexCode) {
  board.style.backgroundColor = hexCode;
  generateRgb(hexCode);
}

function generateRgb(hex) {
  let r = hex.substring(1, 3);
  let g = hex.substring(3, 5);
  let b = hex.substring(5, 7);
  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  showRgb(r, g, b);
}

function showRgb(r, g, b) {
  rgbText.textContent = r + " , " + g + " , " + b;
  generateHsl(r, g, b);
}

function generateHsl(r, g, b) {
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
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  showHsl(h, s, l);
}

function showHsl(h, s, l) {
  hslText.textContent = `hsl(${Math.floor(h)}%,${Math.floor(s)}%,${Math.floor(
    l
  )}%)`;
}
