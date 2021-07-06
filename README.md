# kb-employee-tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-sa/4.0/)

## Descriptions

Use mysql and your terminal to keep track of your employees.

## Demo



## Table of Contents

* [Instructions](#instructions)
* [Tech](#tech)

## Instructions

Clone repo, navigate to root folder, then run the following commands in your terminal:

1. Install needed dependencies
`npm install` or `npm i`

2. Start mysql
`mysql -u root -p`

Some macOS users might get the error message "Command not found". If that is the case, add the following line of code to your .bash_profile file (or if you’re using ZSH, add it to your .zshrc file):
`export PATH="${PATH}:/usr/local/mysql/bin/"` 

3. While in mysql
`source db/schema.sql`

4. To exit mysql
`exit` or `quit`

## Tech

* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/en/)
* [npmjs](https://docs.npmjs.com/)
* [inquirer](https://www.npmjs.com/package/inquirer)