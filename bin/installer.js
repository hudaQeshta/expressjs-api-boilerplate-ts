#! /usr/bin/env node

'use strict'

const path = require('path')

const inquirer = require('inquirer');
const {checkDirExist} = require('./methods')
const {setup} = require('./setup')

const ownPath = process.cwd()

const questions = [
    {
        type: 'input',
        name: 'app_name',
        message: "You have to provide name to your app",
        default() {
            return 'my-api';
        },
    },
    {
        type: 'confirm',
        name: 'typescript',
        message: 'Enable typescript support',
        default() {
            return false;
        }
    },
    {
        type: 'confirm',
        name: 'sequelize',
        message: 'Enable sequelize support',
        default() {
            return false;
        }
    },
    {
        type: 'list',
        name: 'sequelize_options',
        message: 'Sequelize support for?',
        choices: ['mysql', 'sqlite'],
        filter(val) {
            return val.toLowerCase();
        },
        when(answers) {
            return answers.sequelize;
        },
    }
]

inquirer.prompt(questions).then(async (answers) => {

    answers.repo = answers.typescript ?
        'https://github.com/hudaQeshta/expressjs-api-boilerplate-ts.git' :
        'https://github.com/msamgan/expressjs-api-boilerplate.git'


    answers.app_path = path.join(ownPath, answers.app_name)

    await checkDirExist(answers.app_path)
    await setup(answers)

    console.log(
        '\x1b[32m',
        'The installation is done, this is ready to use !',
        '\x1b[0m'
    )

    console.log()

    console.log('\x1b[34m', 'You can start by typing:')
    console.log(`    cd ${answers.app_name}`)
    console.log('    npm start', '\x1b[0m')
    console.log()
    console.log('\x1b[32m', 'Check documentation (https://create-express-boilerplate.com) for more information', '\x1b[0m')
    console.log()
});