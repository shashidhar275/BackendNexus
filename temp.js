const obj = {
    name : "Attu",
    address : "Betadur"
}

const jsonString = JSON.stringify(obj);
console.log(jsonString);
console.log(typeof jsonString);

const object = JSON.parse(jsonString);
console.log(object);

const numbers = [23,5,6,3,28,545,754,32];
const oddNumbers = numbers.filter(num=>{
    return num&1;
})
console.log(oddNumbers);

const oddNums = numbers.filter(num=>num&1)
console.log(oddNums);


const fruits = [
    { name: 'apple', quantity: 10 },
    { name: 'banana', quantity: 5 },
    { name: 'orange', quantity: 15 },
    { name : 'chiku', quantity: 20}
  ];

const foundFruit = fruits.find(fruit=>{
    return fruit.quantity > 10;
})
console.log(foundFruit);


//If positive change the position of 2 elements
//If negative and zero retain the exact positions
//The function inside is the comparator function that decides the sorting criteria
const nums = [324,3452,6,7432,345,63,2]
//Ascending order 
nums.sort((a,b)=> {
    return a-b>0?1:a-b<0?-1:0;
});
console.log(nums);

//Descending order 
const arr = [354,5,3,2,67,3,446];
arr.sort((a,b)=>{
    return a-b<0?1:a-b>0?-1:0;
})
console.log(arr);

//Simple positive swap or change the relative order of the two elements and if negative or zero no and nothing



const originalArray = [1,2,3,4,5,6];
const anotherArray = originalArray;
const clonedArray = [...originalArray]; //Spread operator 
originalArray.push(1000);
console.log(originalArray);
console.log(anotherArray);
console.log(clonedArray);


//Shallow copy
//clonedArray and originalArray are shallow copies=> arrays created using the spread operator creates a shallow copy 
const oA = [1,2,3,4,5];
const cA = [...oA];
console.log(cA);

const arra = [{id:1},{id:2},{id:3}];
const newArra = [...arra];

newArra[0].id = 100;
console.log(arra);


// In JavaScript, understanding the concepts of deep copy and shallow copy is crucial when dealing with objects and arrays.
 
// const originalArray = [1, 2, [3, 4]];
// const shallowCopyArray = [...originalArray];

// shallowCopyArray[2][0] = 100;
// console.log(originalArray); // Output: [1, 2, [100, 4]]

// Shallow Copy:
// Definition: A shallow copy creates a new object or array, but it only copies the references to the original elements. It doesn't create copies of nested objects or arrays; instead, it replicates only the top-level structure.
// Behavior: Modifying the nested elements within the copied object or array will affect the original object or array, and vice versa.

// Deep Copy:
// Definition: A deep copy, on the other hand, creates a completely independent copy of an object or array. It duplicates all nested objects and arrays, creating a new instance with no shared references to the original elements.
// Behavior: Modifications to the deep-copied object or array do not affect the original, and modifications to the original do not affect the deep copy.

// function deepCopy(obj) {
//     if (typeof obj !== 'object' || obj === null) {
//       return obj;
//     }
//     const newObj = Array.isArray(obj) ? [] : {};
//     for (let key in obj) {
//       if (Object.prototype.hasOwnProperty.call(obj, key)) {
//         newObj[key] = deepCopy(obj[key]);
//       }
//     }
//     return newObj;
//   }
  
//   const originalObj = { a: 1, b: { c: 2 } };
//   const deepCopyObj = deepCopy(originalObj);
  
//   deepCopyObj.b.c = 100;
//   console.log(originalObj); // Output: { a: 1, b: { c: 2 } }
// Differences:
// Shallow Copy: Copies the references to nested objects/arrays.
// Deep Copy: Creates new, independent copies of all nested objects/arrays.
// Creating a deep copy often requires custom code or libraries (like lodash's _.cloneDeep()) to recursively traverse and copy all nested structures. Shallow copies are simpler to create but might not provide the desired independence when dealing with nested objects or arrays.





