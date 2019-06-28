module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    plugins: [
        'prettier'
    ],
    parserOptions:  {
        ecmaVersion:  2015,  // Allows for the parsing of modern ECMAScript features
        sourceType:  'module',  // Allows for the use of imports
        project: './tsconfig.json'
    },
    rules: {
        "brace-style": [2, "stroustrup"]
    }
};