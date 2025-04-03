class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Dictionary {
    constructor() {
        this.root = new TrieNode();
        this.wordsList = []; 
    }

    /**
     * Builds the dictionary from an array of words
     * Time Complexity: O(n*m) where n is the number of words and m is the average word length
     * Space Complexity: O(n*m) for storing all characters in the trie
     */
    buildDictionary(words) {
        console.log("Building dictionary...");
        this.wordsList = [...words]; 
        
        for (const word of words) {
            this.insert(word.toLowerCase()); 
        }
        
        console.log(`Dictionary built successfully with ${words.length} words.`);
    }

    /**
     * Inserts a word into the trie
     * Time Complexity: O(m) where m is the length of the word
     * Space Complexity: O(m) in worst case for a completely new word path
     */
    insert(word) {
        if (!word || word.length === 0) return; 
        
        let current = this.root;
        
        for (const char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char);
        }
        
        current.isEndOfWord = true;
    }

    /**
     * Searches for a word in the dictionary
     * Time Complexity: O(m) where m is the length of the word
     * Space Complexity: O(1) for the search operation
     */
    search(word) {
        if (!word || word.length === 0) {
            return { found: false, message: "Please enter a valid word to search." };
        }
        
        word = word.toLowerCase(); 
        let current = this.root;
        
        for (const char of word) {
            if (!current.children.has(char)) {
                const suggestions = this.findSuggestions(word);
                return {
                    found: false,
                    message: `"${word}" not found in the dictionary.`,
                    suggestions: suggestions
                };
            }
            current = current.children.get(char);
        }
        
        if (current.isEndOfWord) {
            return { 
                found: true, 
                message: `"${word}" was found in the dictionary.`,
                word: word
            };
        } else {
            const suggestions = this.findSuggestions(word);
            return {
                found: false,
                message: `"${word}" not found in the dictionary.`,
                suggestions: suggestions
            };
        }
    }

    /**
     * Finds suggested words based on edit distance and prefix matching
     * Time Complexity: O(n*m) where n is the number of words and m is the average word length
     * Space Complexity: O(k) where k is the number of suggestions
     */
    findSuggestions(word) {
        if (!word || word.length === 0) return [];
        
        const suggestions = new Set();
        const maxSuggestions = 5;
        
        const prefixMatches = this.getSimilarPrefixWords(word);
        
        const editDistanceMatches = this.getEditDistanceMatches(word);
        
        for (const match of prefixMatches) {
            suggestions.add(match);
            if (suggestions.size >= maxSuggestions) break;
        }
        
        for (const match of editDistanceMatches) {
            if (suggestions.size >= maxSuggestions) break;
            suggestions.add(match);
        }
        
        return Array.from(suggestions);
    }

    /**
     * Gets words with similar prefixes
     */
    getSimilarPrefixWords(word) {
        if (!word || word.length === 0) return [];
        
        const prefixLength = Math.max(1, Math.ceil(word.length / 2));
        const prefix = word.substring(0, prefixLength);
        
        return this.wordsList.filter(dictWord => 
            dictWord.toLowerCase().startsWith(prefix) && 
            dictWord.toLowerCase() !== word
        ).slice(0, 3); 
    }

    /**
     * Gets words with minimal edit distance
     * Time Complexity: O(n*m^2) where n is dictionary size and m is word length
     */
    getEditDistanceMatches(word) {
        if (!word || word.length === 0 || this.wordsList.length === 0) return [];
        
        const distances = this.wordsList
            .filter(dictWord => dictWord.toLowerCase() !== word)
            .map(dictWord => ({
                word: dictWord,
                distance: this.levenshteinDistance(word, dictWord.toLowerCase())
            }))
            .filter(item => item.distance <= 2) 
            .sort((a, b) => a.distance - b.distance || a.word.length - b.word.length);
        
        return distances.slice(0, 5).map(item => item.word); 
    }

    /*
     * Calculates the Levenshtein distance between two words
     * Time Complexity: O(m*n) where m and n are the lengths of the words
     * Space Complexity: O(min(m,n))
    */
    levenshteinDistance(word1, word2) {
        if (word1 === word2) return 0;
        if (!word1 || word1.length === 0) return word2.length;
        if (!word2 || word2.length === 0) return word1.length;
        
        word1 = word1.toLowerCase();
        word2 = word2.toLowerCase();
        
        if (word1.length > word2.length) {
            [word1, word2] = [word2, word1];
        }
      
        let prevRow = Array(word2.length + 1).fill(0);
        let currRow = Array(word2.length + 1).fill(0);
        
      
        for (let i = 0; i <= word2.length; i++) {
            prevRow[i] = i;
        }
        
      
        for (let i = 0; i < word1.length; i++) {
            currRow[0] = i + 1;
            
            for (let j = 0; j < word2.length; j++) {
                const cost = word1[i] === word2[j] ? 0 : 1;
                currRow[j + 1] = Math.min(
                    currRow[j] + 1,            
                    prevRow[j + 1] + 1,        
                    prevRow[j] + cost          
                );
            }
            
            [prevRow, currRow] = [currRow, prevRow];
        }
        
        return prevRow[word2.length];
    }
}

module.exports = Dictionary;