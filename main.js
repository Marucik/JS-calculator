let buttons = document.querySelectorAll('.button');
let display = document.querySelector('.display');
Array.from(buttons).forEach(button => {
  button.addEventListener('click', function(e) {
    var content = this.innerHTML;
    var number = parseInt(content);
    if(!isNaN(number)) {
      return display.innerHTML += number;
    }
    switch (content) {
      case ",":
        display.innerHTML += ".";
        break;
      case "=":
        break;
      case "+":
        break;
      case "-":
        break;
      case "x":
        break;
      case "/":
        break;
      case "+/-":
        break;
      case "DEL":
        display.innerHTML = display.innerHTML.slice(0, -1);
        break;
      case "C":
        display.innerHTML = ""
        break;
      default:
        break;
    }
  })
})