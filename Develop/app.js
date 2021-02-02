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
                managerInfo()
                break;
            
            case 'Intern':
                internInfo()
                break;

            case 'quit':
                fs.writeFile('output/team.html', render(employeeData), function(err){
                    if(err) throw err;
                })
                break;
        }

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
       addEmployee
    });
}

function pushToObjectArray(data) {
    employeeData.push(data)
}

module.exports = employeeData



 /*
    fs.writeFile('output/team.html', render(employeeData), function(err){
        if(err) throw err;
    })
*/

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
