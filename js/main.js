let buttons = document.querySelectorAll('.button');
let clearBtn = document.querySelector('.clear');
let display = document.querySelector('.display');
let equation = document.querySelector('.equation');
let store = new Array(); //[0] - number, [1] - sign
let result = new Number();
let commed = false;
let negative = false;
let clearDisplay = false;

Array.from(buttons).forEach(button => {
  button.addEventListener('click', function () {
    if ( clearDisplay ) {
      display.innerHTML = "";
      commed = false;
      clearDisplay = false;
    };
    let content = this.innerHTML;
    let digit = parseInt(content);
    let number = parseFloat(display.innerHTML);
    let lastPosition = display.innerHTML.slice(-1);
    
    if ( !isNaN(digit) ) {
      if ( digit == 0 && display.innerHTML == "0" ) { return };
      display.innerHTML += digit;
      return checkNumber();
    }

    switch ( content ) {
      case ",":
        if ( commed ) {break};
        if ( display.innerHTML == "" ) { display.innerHTML += "0" };
        display.innerHTML += ".";
        commed = true;
        break;
      case "=":
        if ( lastPosition == "." ) { break };
        equation.innerHTML = "";
        display.innerHTML = doTheMath(store, number, content);
        result = new Number();
        store = new Array();
        clearDisplay = true;
        break;
      case "+/-":
        if ( display.innerHTML != "" ) {
          negative = !negative;
          if ( negative ) {
            display.innerHTML = "-" + display.innerHTML;
          } else {
            display.innerHTML = display.innerHTML.substring(1);
          }
        }
        break;
      case "DEL":
        display.innerHTML = display.innerHTML.slice(0, -1);
        break;
      case "C":
        display.innerHTML = ""
        break;
      default:
        if ( lastPosition == "." ) { break };
        equation.innerHTML += ` ${display.innerHTML} ${content}`;
        display.innerHTML = doTheMath(store, number, content);
        commed = false;
        clearDisplay = true;
        break;
    }
    checkNumber();
  })
})

function doTheMath (storeArr, number, sign) {
  if ( storeArr.length == 0 ) {
    storeArr[0] = number; // number to work with
    storeArr[1] = sign; //equation type
    return "";
  } else {
    switch ( storeArr[1] ) {
      case "+":
        storeArr[0] += number;
        storeArr[1] = sign;
        result = storeArr[0];
        break;
      case "-":
        storeArr[0] -= number;
        storeArr[1] = sign;
        result = storeArr[0];
        break;
      case "x":
        storeArr[0] *= number;
        storeArr[1] = sign;
        result = storeArr[0];
        break;
      case "/":
        storeArr[0] /= number;
        storeArr[1] = sign;
        result = storeArr[0];
        break;
    }
    return humanize(result);
  }
}

function humanize(x) {
  return x.toFixed(6).replace(/\.?0*$/, ''); //thnaks to Stackoverflow 
}

//Handling holding clear button *again thanks Stack*
let isDown = false;
let isLong = false;
let longTID;

clearBtn.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);

function handleMouseDown() {
  isDown = true;
  isLong = false;
  clearTimeout(longTID);
  longTID = setTimeout(longPress.bind(this), 500);
};

function handleMouseUp(e) {
  if ( isDown && isLong ) {
    isDown = false;
    e.preventDefault();
    return
  }

  if (isDown) {         
    clearTimeout(longTID); 
    isDown = false;
  }
};

function longPress() {
  isLong = true;
  clearCalc();
}

function clearCalc() {
  display.innerHTML = "";
  equation.innerHTML = "";
  store = new Array();
  result = new Number();
  negative = false;
  clearDisplay = false;
  commed = false;
}