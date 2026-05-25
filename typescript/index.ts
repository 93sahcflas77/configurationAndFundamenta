// primitive type

// const username: string = "chandan";

const firstName: string = "chandan";
const lastName: string = "kumar";

console.log(`My name is ${firstName} ${lastName}`);

const msg: string = "Hello, World!";
console.log(msg.toUpperCase());
console.log(msg.length);


const age: number = 30;
const pi: number = 3.14159;
const temperature: number = -5;
console.log(pi.toFixed(2));



const isLoggedIn: boolean = true;
const isAdmin: boolean = false;

const manAge: number = 30;
const adult: boolean = manAge >= 20;
console.log(`Is the person an adult? ${adult}`);

let active: boolean = true;

if (!active) {
  console.log("The user is not active.");
} else {
  console.log("The user is active.");
}


let value: null = null;
// value = 15; // This is valid  // throw error
console.log(value);



// null with Union Types (Very Common)

let username: string | null;
username = "chandan"; // This is vaild
username = null; // This is valid


type User = {
  id: number;
  name: string;
  email: string;
};
let currentUser: User | null = null;

currentUser = {
    id: 1,
    name: "chandan",
    email: "chandan@gmail.com"
}

console.log(currentUser);



let val: undefined = undefined;
// val = undefined; // This is valid
// val = 10; // This is valid

let xyz: string | undefined;
xyz = "chandan"; // This is valid
// xyz = undefined; // This is valid
console.log(xyz);




let value1: any;
value1 = "Hello";
value1 = 42;
value1 = true;
console.log(value1);


let arr: any[] = [];
arr.push("Hello");
arr.push(42);
arr.push(true);
console.log(arr);


let obj: any = {
    name: "chandan",
}
obj.age = 30;
console.log(obj);


function print(data: any){
    console.log(data);
}
print("Hello");
print(42);
print(true);


function add(a: any, b: any): any {
    return a + b;
}
console.log(add(5, 10)); // 15
console.log(add("Hello, ", "World!")); // "Hello, World!"


// string, number. boolean, null, undefine, any, unknow, as, typeof, instanceof, object, type

// void and never :- function ke sath


// let value2: unknown = 100;
// const result = value2.toUpperCase(); 

let value2: unknown = "hello   world";
if(typeof value2 === "string"){
    console.log(value2.toUpperCase());
}

value2 = 123.456;
if(typeof value2 === "number"){
    console.log(value2 * 10);
}


function processValue(value: unknown) {
    if (typeof value === "string") {
        console.log("String value:", value.toUpperCase());
    } else if (typeof value === "number") {
        console.log("Number value:", value * 10);
    } else if (typeof value === "boolean") {
        console.log("Boolean value:", value ? "True" : "False");
    } else {
        console.log("Unknown type");
    }
}

processValue("hello world");
processValue(123.456);
processValue(true);



class User1 {
    login(){
        console.log("User logged in");
    }
}

const obj1: unknown = new User1();

if(obj1 instanceof User1){
    obj1.login();
}

const arrValue: unknown[] = [1, 2, 3, 4, 5];


let valu: unknown = "Hello, World!";
const str = (valu as string).toUpperCase();
console.log(str);


const alt: unknown = 42;
const num = <number>alt;
console.log(num.toFixed(1));
console.log(<number>alt * 2);


let user: object;
user = {
    name: "chandan",
    age: 25,
    email: "chandan@gmail.com"
}
console.log(user);

let use1: {
    readonly id: number,
    name: string,
    age: number,
    email: string,
    password?: string
} = {
    id: 1,
    name: "chandan",
    age: 25,
    email: "chandan7073251686@gmail.com"
}

// use1.id = 2; // This will throw an error because id is readonly
console.log(use1);

const  profile: {
    name: string,
    age: number,
    email: string,
    address: {
        city: string,
        country: string
    }
} = {
    name: "chandan",
    age: 25,
    email: "asf@gmail.com",
    address: {
        city: "patna",
        country: "india"
    }
}
console.log(profile.address.city);

// array of object
const user2: {
    name: string,
    password: string
}[] = [
    {
        name: "chandan",
        password: "password123"
    },
    {
        name: "kumar",
        password: "password456"
    }
]
console.log(user2);


let score: {
    [key: string]: number
} = {
    math: 90,
    science: 85,
    english: 92
}
console.log(score["math"]);

type Address = {
    city: string,
    country: string
}

type User3 = {
    name: string,
    age: number,
    email: string,
    isAdmin: boolean,
    address: Address
}

let chandan: User3 = {
    name: "chandan",
    age: 25,
    email: "xyz@gmail.com",
    isAdmin: true,
    address: {
        city: "patna",
        country: "india"
    }
}

let ravi: User3 = {
    name: "ravi",
    age: 30,
    email: "ravi@gmail.com",
    isAdmin: false,
    address: {
        city: "delhi",
        country: "india"
    }
}

console.log(chandan);
console.log(ravi);

type User4 = User3 | Address;

let ex: User4 = {
    name: "chandan",
    age: 25,
    email: "jffjfj@gmail.com",
    isAdmin: true,
    address: {
        city: "patna",
        country: "india"
    }
}

console.log(ex);

type Number = number[];

const num123: Number = [1, 2, 3, 4, 5];
console.log(num123);


type Add =  (a: number, b: number) => number;

const addNumbre: Add = (a, b) => a + b;
console.log(addNumbre(5, 10)); // 15

// A | B
type ID = string | number
const a: ID = "chandan";
const b: ID = 12345;
console.log(a);
console.log(b);


type status = "success" | "error" | "loading" | "success";
let status: status = "success";
console.log(status);


// A &

type Persion = {
    name: string,
    phone: number
}

type Employee = {
    id: number,
    department: string,
    salary: number
}


type staff = Persion & Employee;

const staff1: staff = {
    name: "chandan",
    phone: 1234567890,
    id: 1,
    department: "IT",
    salary: 50000
}

// function identity(name: string): string {
//     return name;
// }
// console.log(identity("hii"))
// console.log(identity(58)) this error slove this error use <T>


function identity<T>(value: T): T {
    return value
}
console.log(identity("hii"))
console.log(identity(58)) // this error slove this error use <T>


function Sum<T, U>(a: T, b: U){
    return [a, b]
}
console.log(Sum(10, "chandan"));



type ApiResponce<T> = {
    success: boolean,
    data: T
}

type User45 = {
    name: string
}

const response: ApiResponce<User45> = {
    success: true,
    data: {
        name: "chandan"
    }
}

// async function fetchData<T>():

// Promise<T>{

// }