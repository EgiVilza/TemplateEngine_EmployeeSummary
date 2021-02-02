const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array of objects for each employee
let employeeData = []

addEmployee()

//Function to initiate questionare to add employee
function addEmployee() {
    inquirer
    .prompt([
        {
        type: 'list',
        message: 'Please choose a role to add or select quit to end',
        name: 'role',
        choices: ['Engineer', 'Manager', 'Intern', `Quit`],
        },
    ])
    .then((data) => {
        //Depending on the initial response, different questions will be asked
        //based on the employee role
        switch (`${data.role}`) {
            case 'Engineer':
                engineerInfo()
                break;

            case 'Manager':
                //Function to check if a manager is already listed in the data
                checkManager()
                break;
            
            case 'Intern':
                internInfo()
                break;

            case 'quit':
                break;
        }
        //Creates and updates the team.html file in the output folder
        fs.writeFile('output/team.html', render(employeeData), function(err){
            if(err) throw err;
        })

    });
}

//Questionare for engineer employee
function engineerInfo() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username?',
        },
    ])
    .then((data) => {
        //create engineer object based on the class
        const engineerEmployee = new Engineer(
            `${data.name}`,`${data.id}`,`${data.email}`,`${data.github}`
            )
         
       pushToObjectArray(engineerEmployee)
       //Goes back to the original quesiton to add more employees
       addEmployee()
    });
}

//Questionare for intern employee
function internInfo() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school are you currently attending?',
        },
    ])
    .then((data) => {
        //create intern object based on the class
        const internEmployee = new Intern(
            `${data.name}`,`${data.id}`,`${data.email}`,`${data.school}`
            )
        
       pushToObjectArray(internEmployee)
       addEmployee()
    });
}

//Function to check if there is already a manager employee (limit to 1 manager)
function checkManager() {
    //Looks for the officeNumber data in the employeeData array
    const found = employeeData.find(element => element.officeNumber != null)

    //If data is not found, then questionare is initiated, otherwise it goes back
    //to the original question
    if (found === undefined) {
        managerInfo()
    }
    else {
        console.log("Manger already added, limit to 1 manager")
        addEmployee()
    }
}

//Questionare for  manager employee
function managerInfo() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your officeNumber?',
        },
    ])
    .then((data) => {
        //create manager object based on the class
        const managerEmployee = new Manager(
            `${data.name}`,`${data.id}`,`${data.email}`,`${data.officeNumber}`
            )

       pushToObjectArray(managerEmployee)
       addEmployee()
    });
}

//Function to push the objects, created from the questionares, to the employeeData array
function pushToObjectArray(data) {
    employeeData.push(data)
}

module.exports = employeeData


