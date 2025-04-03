const readline = require('readline');
const Dictionary = require('./dictionary');
const words = require('./words');
const chalk = require('chalk'); 

const dictionary = new Dictionary();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayHeader() {
    console.clear();
    console.log(chalk.bold.blue('='.repeat(60)));
    console.log(chalk.bold.yellow('                DICTIONARY SEARCH APPLICATION'));
    console.log(chalk.bold.blue('='.repeat(60)));
    console.log(chalk.italic.gray('This application allows you to search for words in a dictionary'));
    console.log(chalk.italic.gray('and provides suggestions for misspelled words.'));
    console.log();
}


function initialize() {
    displayHeader();
    console.log(chalk.cyan('Initializing dictionary...'));
    
    dictionary.buildDictionary(words);
    
    console.log(chalk.green(`Dictionary initialized with ${words.length} words.`));
    console.log(chalk.blue('-'.repeat(60)));
    
    promptSearch();
}


function promptSearch() {
    rl.question(chalk.yellow('Enter a word to search (or "exit" to quit): '), (word) => {
        if (word.toLowerCase() === 'exit') {
            console.log(chalk.green('Thank you for using the Dictionary Search Application!'));
            rl.close();
            return;
        }
        
        performSearch(word);
    });
}


function performSearch(word) {
    console.log(chalk.blue('-'.repeat(60)));
    console.log(chalk.cyan(`Searching for: "${word}"...`));
    
    const startTime = process.hrtime();
    const result = dictionary.search(word);
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const searchTime = seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
    
    if (result.found) {
        console.log(chalk.green.bold(`✓ ${result.message}`));
    } else {
        console.log(chalk.red.bold(`✗ ${result.message}`));
        
       
        if (result.suggestions && result.suggestions.length > 0) {
            console.log(chalk.yellow('Did you mean:'));
            result.suggestions.forEach((suggestion, index) => {
                console.log(chalk.yellow(`  ${index + 1}. ${suggestion}`));
            });
        }
    }
    
    console.log(chalk.gray(`\nSearch completed in ${searchTime.toFixed(2)} ms`));
    console.log(chalk.blue('-'.repeat(60)));

    promptSearch();
}

initialize();