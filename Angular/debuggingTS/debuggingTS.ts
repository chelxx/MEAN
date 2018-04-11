// ****************************** //
// 1. SETTING TYPES
var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
// ANSWER: var myString is declared as a string but a number is being assigned below

// ORIGINAL CODE:
// myString = 9;

// FIXED CODE:
myString = "9";
// ****************************** //


// ****************************** //
// 2. SETTING THE TYPES FOR FUNCTION PARAMETERS
function sayHello(name: string){
    return `Hello, ${name}!`;
 }
 // This is working great:
 console.log(sayHello("Kermit"));
 // Why isn't this working? I want it to return "Hello, 9!"
 // ANSWER: A number is not assignable where a type string should be

 // ORIGINAL CODE:
//  console.log(sayHello(9));

 // FIXED CODE:
 console.log(sayHello("9"));
// ****************************** //


// ****************************** //
// 3. OPTIONAL PARAMETERS
function fullName(firstName: string, lastName: string, middleName?: string){
    let fullName = `${firstName} ${middleName} ${lastName}`;
    return fullName;
 }

 // This works:
 // ANSWER: This works because the function requires 3 parameters
 console.log(fullName("Mary", "Moore", "Tyler"));

 // What do I do if someone doesn't have a middle name?
 // ANSWER & FIX : Add ? to the middle Name parameter!
 console.log(fullName("Jimbo", "Jones"));
// ****************************** // 
 

// ****************************** //
// 4. INTERFACES AND FXN PARAMETERS
interface Student {
    firstName: string;
    lastName: string;
    belts: number;
 }
 function graduate(ninja: Student){
    return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
 }
 const christine = {
    firstName: "Christine",
    lastName: "Yang",
    belts: 2
 }

 // This seems to work fine:
 console.log(graduate(christine));
 // This one has problems:
 // ANSWER: Jay has a field name called 'belt' and the class Student requires a field called 'belts'

 // ORIGINAL CODE:
//  const jay = {
//     firstName: "Jay",
//     lastName: "Patel",
//     belt: 4
//  }
//  console.log(graduate(jay));

// FIXED CODE:
const jay = {
    firstName: "Jay",
    lastName: "Patel",
    belts: 4
 }
console.log(graduate(jay));
// ****************************** //
 
 
// ****************************** //
// 5. CLASSES AND FXN PARAMETERS
class Ninja {
    fullName: string;
    constructor(
       public firstName: string,
       public lastName: string){
          this.fullName = `${firstName} ${lastName}`;
       }
    debug(){
       console.log("Console.log() is my friend.")
    }
 }
 // This is not making an instance of Ninja, for some reason:
 // ANSWER: This should be setting a NEW instance of Ninja(), not just calling on Ninja() directly
 // ANSWER: Also Ninja() requires 2 parameters: firstName, and lastName

 // ORIGINAL CODE:
//  const shane = Ninja();

// FIXED CODE:
const shane = new Ninja("Lord", "Flies");

// Since I'm having trouble making an instance of Ninja, I decided to do this:
// ANSWER: In the original class Ninja, the parameters don't require a fullName field

// ORIGINAL CODE:
// const turing = {
// fullName: "Alan Turing",
// firstName: "Alan",
// lastName: "Turing"
// }

// FIXED CODE:
const turing = new Ninja("Alan", "Turing");

// Now I'll make a study function, which is a lot like our graduate function from above:
function study(programmer: Ninja){
    return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
}

// Now this has problems:
console.log(study(turing));
// ****************************** //
 
 
// ****************************** //
// 6. ARROW FXNS
var increment = x => x + 1;
// This works great:
console.log(increment(3));
var square = x => {
    return x * x
};
// This is not showing me what I want:
console.log(square(4));
// This is not working:
// ANSWER: Needs parenthesis!

// ORIGINAL CODE:
// var multiply = x,y => x * y;

// FIXED CODE:
var multiply = (x,y) => {
    return x * y
};

// Nor is this working:
// ANSWER: Needs curlies!

// ORIGINAL CODE:
// var math = (x, y) => let sum = x + y;
//    let product = x * y;
//    let difference = Math.abs(x-y);
//    return [sum, product, difference];

// FIXED CODE:
var math = (x, y) => {
    var sum = x + y;
    let product = x * y;
    let difference = Math.abs(x-y);
    return [sum, product, difference];
    }
console.log(math(2,2));
// ****************************** //


// ****************************** //
// 7. ARROW FXNS AND 'THIS'
class Elephant {
    constructor(public age: number){}
    birthday = () => {
       this.age++;
    }
 }
 const babar = new Elephant(8);
 setTimeout(babar.birthday, 1000)
 setTimeout(function(){
    console.log(`Babar's age is ${babar.age}.`)
    }, 2000)
 // Why didn't babar's age change? Fix this by using an arrow function in the Elephant class.
 // ANSWER: Needed a lambda to call another function
// ****************************** // 

// Notes:
// I did the following to run this file...
// sudo npm install -g typescript
// tsc debuggingTS.ts
// This will create a .js file
// nodemon the .js file

// OR 
// EVEN SIMPLER

// Use Typescript Playground
// https://www.typescriptlang.org/play/