
// Assignment 1
let numbers = [2, 4, 6, 8, 10, 12];
for (let i=0;i<numbers.length; i++)
{console.log(numbers[i]*numbers[i])}



// Assignment 2
let prices = [500, 1200, 999, 2500, 750];
let calculateDiscount = (price) => price-(price*0.15)
for (let price of prices) {
    console.log(calculateDiscount(price))
}



// Assignment 3
let users = [
  { name: "Aman", age: 16 },
  { name: "Priya", age: 22 },
  { name: "Rahul", age: 18 },
  { name: "Neha", age: 14 },
  { name: "Karan", age: 27 }
];
users.forEach( user=>{
    if(user.age>=18)
        console.log(user.name)
})



// Assignment 4
let employees = [
  { name: "Aman", salary: 50000 },
  { name: "Priya", salary: 75000 },
  { name: "Rahul", salary: 62000 },
  { name: "Neha", salary: 48000 },
  { name: "Karan", salary: 90000 }
];

function calculateNetSalary(name, salary){
    let tds = salary*0.10
    let pf = salary*0.05
    let netsalary = salary-tds-pf
    console.log(name, netsalary);
}
calculateNetSalary("Aman", 50000);
calculateNetSalary("Priya", 75000);
calculateNetSalary("Rahul", 62000);
calculateNetSalary("Neha", 48000);
calculateNetSalary("Karan", 90000);



// Assignment 5 
let clients = [
  { name: "Aman", age: 16 },
  { name: "Priya", age: 22 },
  { name: "Rahul", age: 18 },
  { name: "Neha", age: 14 },
  { name: "Karan", age: 27 },
  { name: "Simran", age: 31 },
  { name: "Vikram", age: 45 },
  { name: "Riya", age: 19 }
];

// Total users
console.log(clients.length)

// Number of adults (18+)
clients.forEach( client =>{
    if(client.age >= 18)
        console.log(client.name)
})

// Number of minors (<18)
clients.forEach( client =>{
    if(client.age < 18)
        console.log(client.name)
})

// Name of the oldest user
let oldest = clients[0];
clients.forEach( client =>{
    if(client.age > oldest.age)
    {oldest=client;} 
})      
    console.log(oldest.name)

// Average age of all users
let totalage = 0;
clients.forEach( client =>{
    totalage = totalage + client.age;
})    
    
let averageage = totalage/clients.length
console.log(averageage)
