const clock = document.querySelector(".clock"),
  display = document.querySelector(".calc-display input"),
  displayResult = document.querySelector(".calc-display .result"),
  btns = document.querySelectorAll("button");

display.value = "";

function reloj() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  clock.innerText = `${hours}:${minutes}`;
}
setInterval(reloj, 1000);

let op;
let nums = [];

function writeOp(valor) {
  //if (valor == "." && displayResult.textContent.includes(".")) return;
  if (displayResult.textContent == "0") displayResult.textContent = "";

  switch (valor) {
    case "+":
    case "-":
    case "x":
    case "/":
      op = valor;
      nums.push(display.value);

      display.value = "";
      break;
    case "=":
      nums.push(display.value);
      display.value = "";

    default:
      display.value += valor;
      break;
  }
  displayResult.textContent += valor;

  return op;
}

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let valor = e.target.textContent;

    if (valor == "")return;
    switch (valor) {
      case "AC":
        return clean();

      case "+/-":
        return changeSign();

      case "%":
        return calcPercent();

      case ".":
        return writeOp(".");

      case "=":
        writeOp(valor);
        return equals(nums, writeOp(op));

      default:
        return writeOp(valor);
    }
  });
});
function equals(nums, op) {
  let [num1, num2] = nums;
  num1 = Number(num1);
  num2 = Number(num2);
  switch (op) {
    case "+":
      return (
        (displayResult.textContent = num1 + num2),
        (display.value = displayResult.textContent)
      );

    case "-":
      return (
        (displayResult.textContent = num1 - num2),
        (display.value = displayResult.textContent)
      );

    case "x":
      return (
        (displayResult.textContent = num1 * num2),
        (display.value = displayResult.textContent)
      );

    case "/":
      if (num2 == 0) return (displayResult.textContent = "Error");
      return (
        (displayResult.textContent = (num1 / num2).toFixed(8)),
        (display.value = displayResult.textContent)
      );

    default:
      console.log("operador no valido");
  }
}
function calcPercent() {
  //revisar
  displayResult.textContent = Number(display.value) / 100;
}
function clean() {
  displayResult.textContent = "";
  display.value = "";
  nums = [];
}
function changeSign() {
  if (display.value.includes("-")) {
    display.value = display.value.slice(1, display.value.length);

    displayResult.textContent = display.value;
  } else {
    display.value = "-" + display.value;
    displayResult.textContent = display.value;
  }
}
