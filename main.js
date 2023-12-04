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

class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.tickets = [];
  }

  buyTicket(event) {
    this.tickets.push(event);
    console.log(`Ticket bought for event "${event.name}" by user "${this.username}".`);
  }

  viewTickets() {
    console.log(`Tickets bought by user "${this.username}":`);
    this.tickets.forEach(event => {
      console.log(`Event: ${event.name}, Price: ${event.price}, Time: ${event.time}`);
    });
  }
}
/*
function loadFromJson(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);

}

let events = loadFromJson('data.json');
let users = loadFromJson('users.json');
*/
function createAccount() {
  const userName = prompt("Användarnamn: ");
  const pswrd = prompt("Lösenord: ", { hideEchoBack: true });
  const type = prompt("Är du säljare eller köpare? svara med 's' för säljare och 'k' för köpare");
}

function main() {
  console.log("välkommen till event biljetter!");
  let bo = true;

  while (bo) {
    console.log("Vad vill du göra?");
    console.log("1: skapa konto");
    console.log("2: logga in");
    console.log("3: avsluta");
    let choice
    try {
      choice = parseInt(prompt());
    } catch (error) {
      error.message;
    }
    switch (choice) {
      case 1:
        createAccount();
        break;
      case 2:
        break;
      case 3:
        bo = false;
        break;
      default:
        break;
    }
  }

}

main();