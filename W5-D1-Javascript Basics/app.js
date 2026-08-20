
// Sample1
let shoppingList = [
    "Milk",
    "Eggs",
    "Bread",
    ["Apples", "Bananas", "Oranges"],
    ["Potatoes", "Tomatoes", "Onions"]
];
console.log(shoppingList)

// 1. Accessing Specific Value:
console.log(shoppingList[0])

// 2. Implementing push Method:
shoppingList.push("Carrots")
console.log(shoppingList)

// 3. Implementing pop Method:
shoppingList.pop()
console.log(shoppingList)

// 4. Implementing splice Method:
shoppingList[4].splice(1,2,"Cucumbers","BellPapers")
console.log(shoppingList)

//  Sample2
let student = {
    name: "Amit",
    age: 20,
    grade: "A",
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "India"
    }
};
console.log(student)

// 1. Fetching Specific Value:
console.log(student.name)

// 2. Adding Value:
student.phone="123-456-7890"
console.log(student)

// 3. Removing Value:
delete student.grade
console.log(student)

// 4. Modifying Value:
student.age=21
console.log(student)

// Conditionals assignment
// Task 1: Understanding if Statements:

let Car=20;

if (Car > 0)
    {console.log ("Positive")}
else if (Car < 0)
    {console.log("Negative")}
else       
    {console.log("Zero")}

// Task 2: Implementing else if Statements:

let score=85;

if (100 >= score && score >= 90)
    {console.log("A")}
else if (89 >= score && score >= 80)
    {console.log("B")}
else if (79 >= score && score >= 70)
    {console.log("C")}
else if (69 >= score && score >= 60)
    {console.log("D")}
else
    {console.log("F")}

// Task 3: Exploring Truthy/Falsy Concepts:
let word="";

if(word)
    {console.log("Truthy")}
else
    {console.log("Falsy")}


