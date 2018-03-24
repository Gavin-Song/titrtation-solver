"use strict";

function isValidNumber(value) {
    if(Number.isNaN(+value) || value.length == 0)
        return "Please enter a valid number";
    return true;
}

function isValidPositiveNumber(value){
    if(Number.isNaN(+value) || value.length == 0 || +value < 0)
        return "Please enter a valid number";
    return true;
}

function isListValidPositiveNumbers(value){
    let l = value.replace(/ /g, "").split(",");
    if(l.every(x => isValidPositiveNumber(x) === true))
        return true;
    return "Please enter a valid list of positive numbers";
}


module.exports = {
    main_menu: {
        type: "list",
        name: "problem-type",
        message: "Type of titration problem:",
        choices: [
            "SA + SB (Strong acid titrated with Strong base)",
            "SB + SA (Strong base titrated with Strong acid)",
            "WA + SB (Weak acid titrated with Strong base)",
            "WB + SA (Weak base titrated with Strong acid)",
            {
                name: "WB + WA",
                disabled: "Unavailable at this time"
            },
            {
                name: "WA + WB",
                disabled: "Unavailable at this time"
            },
        ]
    },

    strong_acid_questions: [
        {
            type: "input",
            name: "inital_acid_conc",
            message: "Inital strong acid concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_acid_vol",
            message: "Inital strong acid volume (Any unit)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_base_conc",
            message: "Base concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "values_added",
            message: "Volume(s) of base to be added, each seperated by a comma:\n",
            validate: isListValidPositiveNumbers
        }
    ],

    strong_base_questions: [
        {
            type: "input",
            name: "inital_base_conc",
            message: "Inital strong base concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_base_vol",
            message: "Inital strong base volume (Any unit)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_acid_conc",
            message: "Acid concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "values_added",
            message: "Volume(s) of acid to be added, each seperated by a comma:\n",
            validate: isListValidPositiveNumbers
        }
    ],

    weak_acid_strong_base_questions: [
        {
            type: "input",
            name: "inital_acid_conc",
            message: "Inital weak acid concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_acid_vol",
            message: "Inital weak acid volume (Any unit)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "ka",
            message: "ka value of the weak acid",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_base_conc",
            message: "Strong base concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "values_added",
            message: "Volume(s) of base to be added, each seperated by a comma:\n",
            validate: isListValidPositiveNumbers
        }
    ],

    weak_base_strong_acid_questions: [
        {
            type: "input",
            name: "inital_base_conc",
            message: "Inital weak base concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_base_vol",
            message: "Inital weak base volume (Any unit)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "kb",
            message: "kb value of the weak base",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "inital_acid_conc",
            message: "Strong acid concentration (M)",
            validate: isValidPositiveNumber
        },
        {
            type: "input",
            name: "values_added",
            message: "Volume(s) of acid to be added, each seperated by a comma:\n",
            validate: isListValidPositiveNumbers
        }
    ]
};
