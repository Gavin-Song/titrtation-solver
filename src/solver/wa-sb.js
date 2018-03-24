"use strict";

const chalk = require("chalk");
const formatArgs = require("../format_args.js");
const util = require("../util.js");

var log = Math.log10;

/**
 * solveForX - Given a concentration and ka value, solves
 * the equation x^2/(conc - x) = ka for the lowest
 * positive value of x
 *
 * @param  {Number} conc Inital concentration
 * @param  {Number} ka   ka of the value
 * @return {Number}      x value
 */
function solveForX(conc, ka){
    let a = 0.5 * (Math.sqrt(ka) * Math.sqrt(4 * conc + ka) - ka);
    let b = 0.5 * (-Math.sqrt(ka) * Math.sqrt(4 * conc + ka) - ka);
    if(a < 0) return b;
    if(b < 0) return a;
    return Math.min(a, b);
}

function calculate(arg){
    formatArgs(arg);

    let int_WA_conc = arg.inital_acid_conc;
    let int_WA_vol = arg.inital_acid_vol;
    let SB_conc = arg.inital_base_conc;
    let ka = arg.ka;
    let vol_added = arg.values_added;

    let m1v1 = int_WA_vol * int_WA_conc;
    let aconc, bconc, pH, H;
    let i = 0;

    console.log("");

    for(let vol of vol_added){
        let new_vol = (int_WA_vol + vol);
        aconc = (m1v1 / new_vol);
        bconc = (vol * SB_conc / new_vol);

        // Display the problem header
        console.log("[" + util.alphabet.substr(i, 1) + "] +" + vol.toFixed(util.prec) + " <vol unit> Base");
        console.log("------------------------------------");
        i++;

        // Display the new concentration of the acid
        console.log(chalk.redBright("Acid Concentration: ") + aconc.toFixed(util.prec) + " M"
            + " ".repeat(util.spacing_width - aconc.toFixed(util.prec).length)
            + chalk.gray("(" + int_WA_vol + " ml)(" + int_WA_conc + " M) = (" + new_vol + " mL)(x)")
        );

        // Display the new concentration of the base
        console.log(chalk.blueBright("Base Concentration: ") + bconc.toFixed(util.prec) + " M"
            + " ".repeat(util.spacing_width - bconc.toFixed(util.prec).length)
            + chalk.gray("(" + vol + " ml)(" + SB_conc + " M) = (" + new_vol + " mL)(x)")
        );


        console.log("\nTo solve for the pH:");

        if(bconc == 0){
            console.log("Solve for -log(x) using ka");
            let x = solveForX(aconc, ka);
            console.log(chalk.grey("   x = " + x.toFixed(util.prec * 2)));
            console.log("   pH = -log(x) = " + (-log(x)).toFixed(util.prec + 1))
        }
        else if(util.areCloseEnough(bconc, aconc)){
            let kb = (1e-14 / ka);

            console.log("Equv. Point, solve for pH of salt solution");
            console.log(chalk.grey("   kb = 1e-14 / " + ka + " = " + kb));
            console.log(chalk.grey("   Solve x^2/(" + bconc.toFixed(util.prec) + " - x) = " + kb));

            let x = solveForX(bconc, kb);
            console.log(chalk.gray("   x = " + x));
            console.log("   pH = log(x) + 14 = " + (14 + log(x)).toFixed(util.prec + 1));
        }
        else if(bconc < aconc){
            console.log("Buffer calculation with Henderson Hasselbalch equation");
            console.log(chalk.grey("   [HA] = " + aconc.toFixed(util.prec * 2) + " - "
                + bconc.toFixed(util.prec * 2) + " = "
                + (aconc - bconc).toFixed(util.prec * 2)));
            console.log(chalk.grey("   [A-] = " + bconc.toFixed(util.prec * 2)));
            console.log(chalk.grey("   pKa = " + (-log(ka)).toFixed(util.prec * 2) ));
            console.log( "   pH = " + ( -log(ka) + log(bconc / (aconc - bconc))).toFixed(util.prec) );
        }
        else{
            console.log("Excess SB present, do hydrolysis of conj. base of the acid.");
            console.log(chalk.grey("   [SB] = " + (bconc - aconc).toFixed(util.prec) + " M"));
            console.log("   pH = log([SB]) + 14 = " + (14 + log(bconc - aconc)).toFixed(util.prec));
        }

        console.log("\n");
    }
}

module.exports = calculate;
