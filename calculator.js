const readline = require("readline-sync");
const MSG = require("./calculator_messages.json");


function  programPrompt(msg) {
  console.log(`=> ${msg}`);
}

function  isInvalid(num) {
  return (Number.isNaN(Number(num)) || num.trimStart() === "");
}

function  getOperand(prompt) {
  programPrompt(MSG[LANG][prompt]);
  let num = readline.question();
  while (isInvalid(num)) {
    programPrompt(MSG[LANG]["warn"]);
    num = readline.question();
  }
  num = Number(num);
  return (num);
}

function  getOperation(prompt) {
  let opt = readline.question();
  while (!["1", "2", "3", "4"].includes(opt)) {
    programPrompt(MSG[LANG][prompt]);
    opt = readline.question();
  }
  opt = Number(opt);
  return (opt);
}

function  confirmInput(opt = undefined, num1 = undefined, num2 = undefined) {
  if (typeof num1 === 'undefined' && typeof num2 === 'undefined') {
    let msg = "";
    if (opt === 1) {
      msg += MSG[LANG].opt["1"];
    } else if (opt === 2) {
      msg += MSG[LANG].opt["2"];
    } else if (opt === 3) {
      msg += MSG[LANG].opt["3"];
    } else if (opt === 4) {
      msg += MSG[LANG].opt["4"];
    }
    programPrompt(MSG[LANG]["confirm2"] + ` ${msg}\n`);
  } else {
    programPrompt(MSG[LANG]["confirm1"] + ` ${num1} ${MSG[LANG]["and"]} ${num2}\n`);
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

function  getLanguage() {
  let lang = readline.question(MSG["lang"]);

  let output;
  while (isInvalid(lang)) {
    programPrompt(MSG["en"]["warn"]);
    lang = readline.question(MSG["lang"]);
  }
  
  switch (lang) {
    case "1":
      output = "en";
      break;
    case "2":
      output = "zh-CN";
      break;
    case "3":
      output = "de";
      break;
    case "4":
      output = "es";
      break;
    case "5":
      output = "fr";
      break;
    case "6":
      output = "sw";
      break;
    case "7":
      output = "pt";
      break;
    case "8":
      output = "it";
      break;
  }
  return (output);
}

function  calculator() {
  let number1 = getOperand("prompt1");
  let number2 = getOperand("prompt2");
  confirmInput(undefined, number1, number2);
  programPrompt(MSG[LANG]["operation"]);
  let opt = getOperation("warn");
  confirmInput(opt);
  let output = calculation(number1, opt, number2);
  return (programPrompt(MSG[LANG]["output"] + ` ${output}\n`));
}

let LANG = getLanguage();
programPrompt(MSG[LANG]["welcome"])
while (1) {
  calculator();
  let again = readline.question(MSG[LANG]["again"]);
  if (again.trimStart()[0] !== "y") break;
}
programPrompt(MSG[LANG]["end"]);
