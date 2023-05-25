const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');

const teamMembers = [];

// Function to prompt for manager's information
function promptManager() {
  console.log('Enter Manager Information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Manager's name:",
        validate: (value) => {
          if (value.trim()) {
            return true;
          }
          return 'Please enter a valid name.';
        },
      },
      {
        type: 'input',
        name: 'id',
        message: "Manager's ID:",
        validate: (value) => {
          if (value.trim()) {
            return true;
          }
          return 'Please enter a valid ID.';
        },
      },
      {
        type: 'input',
        name: 'email',
        message: "Manager's email:",
        validate: (value) => {
          if (/\S+@\S+\.\S+/.test(value)) {
            return true;
          }
          return 'Please enter a valid email address.';
        },
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Manager's office number:",
        validate: (value) => {
          if (value.trim()) {
            return true;
          }
          return 'Please enter a valid office number.';
        },
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name.trim(),
        answers.id.trim(),
        answers.email.trim(),
        answers.officeNumber.trim()
      );
      teamMembers.push(manager);
      promptTeamMembers();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to prompt for team members' information
function promptTeamMembers() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Select team member role:',
        choices: ['Engineer', 'Intern', 'Finished building my team'],
      },
    ])
    .then((answer) => {
      if (answer.role === 'Engineer') {
        promptEngineer();
      } else if (answer.role === 'Intern') {
        promptIntern();
      } else {
        generateHTML(teamMembers);
        console.log('HTML file generated successfully!');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to prompt for engineer's information
function promptEngineer() {
  console.log('Enter Engineer Information:');
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Engineer's name:",
        validate: (value) => {
          if (value.trim()) {
            return true;
          }
          return 'Please enter a valid name.';
        },
      },
      {
        type: 'input',
        name: 'id',
        message: "Engineer's ID:",
        validate: (value) => {
          if (value.trim()) {
            return true;
          }
          return 'Please enter a valid ID.';
        },
      },
      {
        type: 'input',
        name: 'email',
        message: "Engineer's email:",
        validate: (