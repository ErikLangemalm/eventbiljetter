const fs = require('fs');
const prompt = require('prompt-sync')();

class EventTicket {
  constructor(id, name, price, time) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.time = time;
  }
}


function main() {
  console.log("välkommen till event biljetter!");
  bo = true;

  while (bo) {
    console.log("Vad vill du göra?");
    console.log("1: skapa konto");
    console.log("2: logga in");
    console.log("3: avsluta");
    choice = parseInt(prompt());

    switch (choice) {
      case 1:

        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  }

}