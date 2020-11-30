const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []
let roles = ["Manager", "Engineer", "Intern"]
function getInfo() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the employee's name: "
        },
        {
            type: "input",
            name: "id",
            message: "Enter the employee's id: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter the employee's email: "
        },
        {
            type: "list",
            name: "role",
            message: "Select the employee's role:",
            choices: roles
        }
    ]).then(function (basicInfo) {
        if (basicInfo.role == "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "officeNum",
                    message: "Enter the manager's office number: "
                }
            ]).then(function (managerInfo) {
                var manager = new Manager(basicInfo.name, basicInfo.id, basicInfo.email, managerInfo.officeNum);
                employees.push(manager)
                fs.writeFile(outputPath, render(employees), err => { if (err) throw err })
                inquirer.prompt([
                    {
                        type: "list",
                        name: "next",
                        message: "Do you need to enter information for another employee?",
                        choices: ["yes", "no"]
                    }
                ]).then(function (confirmation) {
                    if (confirmation.next == "yes") {
                        getInfo()
                    } else {
                        return
                    }
                })
            })
        } else if (basicInfo.role == "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "github",
                    message: "Enter a link to the engineer's GitHub profile: "
                }
            ]).then(function (engineerInfo) {
                var engineer = new Engineer(basicInfo.name, basicInfo.id, basicInfo.email, engineerInfo.github);
                employees.push(engineer)
                fs.writeFile(outputPath, render(employees), err => { if (err) throw err })
                inquirer.prompt([
                    {
                        type: "list",
                        name: "next",
                        message: "Do you need to enter information for another employee?",
                        choices: ["yes", "no"]
                    }
                ]).then(function (confirmation) {
                    if (confirmation.next == "yes") {
                        getInfo()
                    } else {
                        return
                    }
                })
            })
        } else if (basicInfo.role == "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Enter the school currently attended by the intern: "
                }
            ]).then(function (internInfo) {
                var intern = new Intern(basicInfo.name, basicInfo.id, basicInfo.email, internInfo.school);
                employees.push(intern)
                fs.writeFile(outputPath, render(employees), err => { if (err) throw err })
                inquirer.prompt([
                    {
                        type: "list",
                        name: "next",
                        message: "Do you need to enter information for another employee?",
                        choices: ["yes", "no"]
                    }
                ]).then(function (confirmation) {
                    if (confirmation.next == "yes") {
                        getInfo()
                    } else {
                        return
                    }
                })
            })
        }

    })
}
getInfo();

