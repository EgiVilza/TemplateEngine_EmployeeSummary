const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");

const test = new Manager("test","test","test","num")
const test2 = new Engineer("test","test","test","git")

let testArray = []
let test2Array = []

testArray.push(test)
testArray.push(test2)

test2Array.push(test2)

/*
test2Array.forEach(element => {
    if(element.officeNumber != null) {
        console.log("found it")
    }
    else {
        console.log("did not find it")
    }
});
*/

const found = test2Array.find(element => element.officeNumber != null)
console.log(found)

/*
if(testArray.find() != null) {
    console.log("found it")
}
else {
    console.log("did not find it")
}
*/

//console.log(testArray)
//console.log(test2Array)