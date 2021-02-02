const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeData = []

addEmployee()

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
        switch (`${data.role}`) {
            case 'Engineer':
                engineerInfo()
                break;

            case 'Manager':
                checkManager()
                break;
            
            case 'Intern':
                internInfo()
                break;

            case 'quit':
                break;
        }
        fs.writeFile('output/team.html', render(employeeData), function(err){
            if(err) throw err;
        })

    });
}


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
        const engineerEmployee = new Engineer(
            `${data.name}`,`${data.id}`,`${data.email}`,`${data.github}`
            )
         
       pushToObjectArray(engineerEmployee)
       addEmployee()
    });
}

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
        const internEmployee = new Intern(
            `${data.name}`,`${data.id}`,`${data.email}`,`${data.school}`
            )
        
       pushToObjectArray(internEmployee)
       addEmployee()
    });
}

function checkManager() {
    const found = employeeData.find(element => element.officeNumber != null)

    if (found === undefined) {
        managerInfo()
    }
    else {
        console.log("Manger already added, limit to 1 manager")
        addEmployee()
    }
}

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
        const managerEmployee = new Manager(
            `${data.name}`,`${data.id}`,`${data.email}`,`${data.officeNumber}`
            )

       pushToObjectArray(managerEmployee)
       addEmployee()
    });
}

function pushToObjectArray(data) {
    employeeData.push(data)
}

module.exports = employeeData


