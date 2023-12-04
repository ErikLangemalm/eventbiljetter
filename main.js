const fs = require('fs');
const prompt = require('prompt-sync')();
const data1 = fs.readFileSync('data.json');
const data = JSON.parse(data1);
const users1 = fs.readFileSync('users.json');
const users = JSON.parse(users1);
let currentUser;
let loggedIn = false;

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
  }

  viewTickets() {
    console.log(`Biljetter köpta av användare "${this.username}":`);
    this.tickets.forEach(event => {
      console.log(`Event: ${event.name}, Pris: ${event.price}, Tid: ${event.time}`);
    });
  }
}

function createAccount() {
  const userName = prompt("Användarnamn: ");
  const password = prompt("Lösenord: ", { hideEchoBack: true });
  const role = prompt("Är du administratör eller köpare? svara med 'a' för administratör och 'k' för köpare").toLowerCase();
  if (role != "a" || role != "k") {
    b = true;
    while (b) {
      console.log("Du har matat in en felaktig roll");
      const role = prompt("Är du administratör eller köpare? svara med 'a' för administratör och 'k' för köpare").toLowerCase();
      if (role == "a" || role == "k") {
        b = false;
      }
    }
  }
  const user = new User(users.length + 1, userName, password, role)
  console.log("Ditt Konto har skapats");

  users.push(user);
  currentUser = user
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
  console.clear();
  return user
}

function logIn() {
  const username = prompt('Användarnamn: ');
  const password = prompt('Lösenord: ');
  const userData = users.find(u => u.username === username && u.password === password);

  if (!userData) {
    console.log('Användaren hittades inte. Vänligen försök igen.');
    return null;
  } else {
    const user = new User(userData.id, userData.username, userData.password, userData.role);
    user.tickets = userData.tickets
    loggedIn = true;
    return user;
  }
}

function main() {
  console.log("välkommen till event biljetter!");
  let bo = true;

  while (bo) {
    if (!loggedIn) {
      console.log("Vad vill du göra?");
      console.log("1: skapa konto");
      console.log("2: logga in");
      console.log("3: avsluta");
    }
    let choice
    try {
      choice = parseInt(prompt());
    } catch (error) {
      error.message;
    }

    switch (choice) {
      case 1:
        currentUser = createAccount();
        break;
      case 2:
        currentUser = logIn()
        if (currentUser && loggedIn) {
          console.clear();
          if (currentUser.role === "k") {
            console.log("Vad vill du göra?");
            console.log("1: skapa konto");
            console.log("2: logga in");
            console.log("3: avsluta");
            console.log("4: lägg till biljetter");
            console.log("5: se mina biljetter");
            console.log("6: köp biljetter");
          }
          else {
            console.log("Vad vill du göra?");
            console.log("1: skapa konto");
            console.log("2: logga in");
            console.log("3: avsluta");
            console.log("4: se användare som har köpt biljetter");
          }
        }
        break;
      case 3:
        bo = false;
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
        break;
      case 4:
        if (loggedIn && currentUser.role === "k") {
          const eventName = prompt("vad heter eventet du vil lägga till? ");
          const eventPrice = parseInt(prompt("Ange biljett kostnad"));
          if (Number.isInteger(eventPrice)) {
            b = true;
            while (b) {
              console.log("Du har matat in en felaktig roll");
              const eventPrice = parseInt(prompt("Ange biljett kostnad"));
              if (Number.isInteger(eventPrice)) {
                b = false;
              }
            }
          }
          const eventTime = Date(prompt("Tiden eventet sker"));

          const newEvent = new EventTicket(data.length + 1, eventName, eventPrice, eventTime)
          currentUser.
            data.push(newEvent);
          fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
        }
        else if (loggedIn) {
          console.log(currentUser);
          currentUser.viewTickets();
        }
        else {
          console.log("användaren finns inte");
        }

        break;
      case 5:
        if (loggedIn && currentUser.role === 'k') {
          currentUser.viewTickets()
        }
        break;
      case 6:
        if (loggedIn && currentUser.role === "k") {
          data.forEach(event => {
            console.log(`ID: ${event.id}, Event: ${event.name}, Price: ${event.price}, Time: ${event.time}\n`)
          });
          const eventId = parseInt(prompt("Enter the ID of the event you want to buy a ticket for: "));
          const selectedEvent = data.find(event => event.id === eventId);

          if (selectedEvent) {
            currentUser.buyTicket(selectedEvent);
            fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
            fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
          } else {
            console.log("Eventet kunde inte hittas. Vänligen se över Id nummret du har anget.");
          }
        }
        break;
      default:
        break;
    }
  }
}

main();