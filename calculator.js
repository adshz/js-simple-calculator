const readline = require("readline-sync");
const msg_list = require("./calculator_messages.json");

function  programPrompt(msg) {
  console.log(`=> ${msg}`);
}

function  isInvalid(num) {
  return (Number.isNaN(Number(num)) || num.trimStart() === "");
}

function  calculation() {

  programPrompt(msg_list["prompt1"]);
  let number1 = readline.question();
  
  while (isInvalid(number1)) {
    programPrompt(msg_list["warn"]);
    number1 = readline.question();
  }
  number1 = Number(number1);

  programPrompt(msg_list["prompt2"]);
  let number2 = readline.question();
  while (isInvalid(number2)) {
    programPrompt(msg_list["warn"]);
    number2 = readline.question();
  }
  number2 = Number(number2);

  programPrompt(msg_list["confirm1"] + ` ${number1} and ${number2}\n`);
  programPrompt(msg_list["operation"]);
  let opt = readline.question();

  while (!["1", "2", "3", "4"].includes(opt)) {
    programPrompt(msg_list["warn"]);
    opt = readline.question();
  }

  let msg = "";
  if (opt === "1") {
    msg += "Addition";
  } else if (opt === "2") {
    msg += "Subtraction";
  } else if (opt === "3") {
    msg += "Multification";
  } else if (opt === "4") {
    msg += "Division";
  }
  programPrompt(msg_list["confirm2"] + ` ${msg}\n`);

  opt = Number(opt);
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
  return (programPrompt(msg_list["output"] + ` ${output}\n`));
}

programPrompt(msg_list["welcome"]);
let again;
while (1)
{
  calculation();
  again = readline.question(msg_list["again"]);
  if (again.trimStart()[0] !== "y") break;
}
programPrompt(msg_list["end"]);
