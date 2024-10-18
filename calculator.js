const readline = require("readline-sync");
const msgList = require("./calculator_messages.json");

function  programPrompt(msg) {
  console.log(`=> ${msg}`);
}

function  isInvalid(num) {
  return (Number.isNaN(Number(num)) || num.trimStart() === "");
}

function  getOperand(prompt) {
  programPrompt(msgList[prompt]);
  let num = readline.question();
  while (isInvalid(num)) {
    programPrompt(msgList["warn"]);
    num = readline.question();
  }
  num = Number(num);
  return (num);
}

function  getOperation(prompt) {
  let opt = readline.question();
  while (!["1", "2", "3", "4"].includes(opt)) {
    programPrompt(msgList[prompt]);
    opt = readline.question();
  }
  opt = Number(opt);
  return (opt);
}

function  confirmInput(opt = undefined, num1 = undefined, num2 = undefined) {
  if (typeof num1 === 'undefined' && typeof num2 === 'undefined') {
    let msg = "";
    if (opt === 1) {
      msg += "Addition";
    } else if (opt === 2) {
      msg += "Subtraction";
    } else if (opt === 3) {
      msg += "Multification";
    } else if (opt === 4) {
      msg += "Division";
    }
    programPrompt(msgList["confirm1"] + ` ${msg}\n`);
  } else {
    programPrompt(msgList["confirm2"] + ` ${num1} and ${num2}\n`);
  }
}

function  calculation(number1, opt, number2) {
  let output;
  switch (opt) {
    case 1:
      output = number1 + number2;
      break;
    case 2:
      output = number1 - number2;
      break;
    case 3:
      output = number1 * number2;
      break;
    case 4:
      output = number1 / number2;
      break;
  }
  return (output);
}

function  calculator() {
  let number1 = getOperand("prompt1");
  let number2 = getOperand("prompt2");
  confirmInput(undefined, number1, number2);
  programPrompt(msgList["operation"]);
  let opt = getOperation("warn");
  confirmInput(opt);
  let output = calculation(number1, opt, number2);
  return (programPrompt(msgList["output"] + ` ${output}\n`));
}

programPrompt(msgList["welcome"]);
let again;
while (1) {
  calculator();
  again = readline.question(msgList["again"]);
  if (again.trimStart()[0] !== "y") break;
}
programPrompt(msgList["end"]);
