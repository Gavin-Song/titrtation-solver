"use strict";

const inquirer = require("inquirer");
const wait = require("wait-for-stuff");

const menu = require("./menu.js");

const sa_sb = require("./src/solver/sa-sb.js");
const sb_sa = require("./src/solver/sb-sa.js");
const wa_sb = require("./src/solver/wa-sb.js");
const wb_sa = require("./src/solver/wb-sa.js");

// Splash screen
console.log("Titration-solver v1.0.0 by Gavin Song");
console.log("Copyright " + (new Date().getFullYear()) + " (MIT License)");
console.log("");
console.log("Note 1: If a base or acid splits into two");
console.log("moles of H+ or OH- instead of one, double the concentration");
console.log("when prompted. For example, for 0.100 M Ba(OH)2, type in");
console.log("0.200 M instead of 0.100 M");
console.log("");
console.log("Note 2: Use e-scientific notation, for example");
console.log("5.5 * 10^-5 is written as 5.5e-5");
console.log("");
console.log("");

let answer = wait.for.promise(inquirer.prompt([menu.main_menu]));

if(answer["problem-type"].startsWith("SA + SB")){
    answer = wait.for.promise(inquirer.prompt(menu.strong_acid_questions));
    sa_sb(answer);
}
else if(answer["problem-type"].startsWith("SB + SA")){
    answer = wait.for.promise(inquirer.prompt(menu.strong_base_questions));
    sb_sa(answer);
}
else if(answer["problem-type"].startsWith("WA + SB")){
    answer = wait.for.promise(inquirer.prompt(menu.weak_acid_strong_base_questions));
    wa_sb(answer);
}
else if(answer["problem-type"].startsWith("WB + SA")){
    answer = wait.for.promise(inquirer.prompt(menu.weak_base_strong_acid_questions));
    wb_sa(answer);
}

// Press any key to quit
console.log("Press ENTER to quit...");
require("child_process").spawnSync("read _ ", {shell: true, stdio: [0, 1, 2]});
process.exit(0);
