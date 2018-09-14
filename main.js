let buttons = document.querySelectorAll('.button');
let display = document.querySelector('.display');
let equation = document.querySelector('.equation');
let store = new Array();
let result = new Number();
let negative = false;
let clearDisplay = false;

Array.from(buttons).forEach(button => {
  button.addEventListener('click', function () {
    if(clearDisplay) {
      display.innerHTML = "";
      clearDisplay = false;
    };
    let content = this.innerHTML;
    let digit = parseInt(content);
    let number = parseFloat(display.innerHTML);
    if(!isNaN(digit)) {
      return display.innerHTML += digit;
    }
    switch (content) {
      case ",":
        
        display.innerHTML += ".";
        break;
      case "=":
        equation.innerHTML = "";
        display.innerHTML = doTheMath(store, number, content);
        result = new Number();
        store = new Array();
        clearDisplay = true;
        break;
      case "+/-":
        if(display.innerHTML != "") {
          negative = !negative;
          if(negative) {
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
        equation.innerHTML += " " + display.innerHTML + " " + content;
        display.innerHTML = doTheMath(store, number, content);
        break;
    }
  })
})

function doTheMath (storeArr, number, sign) {
  if (storeArr.length == 0) {
    storeArr[0] = number; // number to work with
    storeArr[1] = sign; //equation type
    return "";
  } else {
    switch (storeArr[1]) {
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
  return x.toFixed(6).replace(/\.?0*$/, ''); //thnaks to stackoverflow 
}