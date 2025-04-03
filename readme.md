# Dictionary Search CLI

A command-line dictionary search application that provides word definitions and spell-check suggestions using efficient data structures.

## Features

- **Word Lookup:** Quickly find definitions of words.
- **Spell Check Suggestions:** If a word is misspelled, it suggests possible correct words.
- **Auto-completion:** Uses a **Trie** to provide word suggestions based on prefixes.
- **Interactive CLI:** Uses a simple command-line interface for user input.
- **Color-coded Output:** Uses `chalk` for enhanced CLI aesthetics.

## Tech Stack

- **Node.js** – JavaScript runtime environment
- **Chalk** – Terminal string styling
- **Readline-Sync** – Synchronous user input handling

## Data Structures Used

- **Trie (Prefix Tree)** – Used for fast word searching, prefix-based suggestions, and spell-checking.
- **HashMap (JavaScript Object)** – Stores dictionary words and their definitions.
- **Array** – Used for handling suggestions and alternative spellings.

## Project Structure

```
dictionary-search/
│── src/
│   ├── cli.js          # Main CLI entry point
│   ├── dictionary.js   # Dictionary search logic
│   ├── words.js        # Word list and definitions
│── package.json        # Project metadata and dependencies
│── package-lock.json   # Dependency lock file
│── README.md           # Project documentation
```

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/vivek-panchal/dictionary-search
   cd dictionary-search
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

## Usage

Run the CLI using the following command:

```sh
npm start
```

### Searching for a Word

- Enter a word in the CLI, and it will return the definition.
- If the word is not found, the application will suggest the closest possible words using a **Trie-based spell checker**.

## Contributing

Feel free to fork the repository and submit pull requests with improvements.

## License

This project is licensed under the MIT License.

---

This version includes the Trie data structure and its role in the project. Let me know if you need any more refinements! 🚀