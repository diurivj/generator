#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const CHOICES = fs.readdirSync(path.join(__dirname, '../templates'));
const CURR_DIR = process.cwd();

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = path.join(__dirname, '../templates', projectChoice);
  const targetPath = `${CURR_DIR}/${projectName}`;
  if (!createProject(targetPath)) return;
  createDirectoryContents(templatePath, projectName);
  postProcess(`${targetPath}/backend`);
  postProcess(`${targetPath}/frontend`);
  showMessage(projectName);
});

function createProject(projectPath) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
    return false;
  } else {
    fs.mkdirSync(projectPath);
    return true;
  }
}

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath); // get stats about the current file
    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`); // recursive call
    }
  });
}

function postProcess(targetPath) {
  shell.cd(targetPath);
  let cmd = '';
  if (String(targetPath).includes('backend')) {
    cmd = 'npm install';
  } else if (String(targetPath).includes('frontend')) {
    cmd = 'yarn';
  }
  if (cmd) {
    const result = shell.exec(cmd);
    if (result.code !== 0) {
      return false;
    }
  } else {
    console.log(chalk.red('No yarn or npm found. Cannot run installation.'));
  }
  return true;
}

function showMessage(projectName) {
  console.log(chalk.green('Done ✅'));
  console.log('');
  console.log(chalk.magenta('Go into the project:'));
  console.log(chalk.magenta.bold(`cd ${projectName}`));
  console.log('');
  console.log(chalk.green('Run the backend with:'));
  console.log(chalk.green.bold('npm run dev'));
  console.log('');
  console.log(chalk.blue('Run the frontend with:'));
  console.log(chalk.blue.bold('yarn start'));
  console.log('');
  console.log(chalk.bold('Happy Coding ❤️'));
}
