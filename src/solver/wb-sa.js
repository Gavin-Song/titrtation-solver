"use strict";

const chalk = require("chalk");
const formatArgs = require("../format_args.js");
const util = require("../util.js");

var log = Math.log10;

/**
 * solveForX - Given a concentration and kb value, solves
 * the equation x^2/(conc - x) = kb for the lowest
 * positive value of x
 *
 * @param  {Number} conc Inital concentration
 * @param  {Number} kb   kb of the value
 * @return {Number}      x value
 */
function solveForX(conc, kb){
    let a = 0.5 * (Math.sqrt(kb) * Math.sqrt(4 * conc + kb) - kb);
    let b = 0.5 * (-Math.sqrt(kb) * Math.sqrt(4 * conc + kb) - kb);
    if(a < 0) return b;
    if(b < 0) return a;
    return Math.min(a, b);
}

function calculate(arg){
    formatArgs(arg);

    let int_WB_conc = arg.inital_base_conc;
    let int_WB_vol = arg.inital_base_vol;
    let SA_conc = arg.inital_acid_conc;
    let kb = arg.kb;
    let vol_added = arg.values_added;

    let m1v1 = int_WB_vol * int_WB_conc;
    let aconc, bconc, pH, H;
    let i = 0;

    console.log("");

    for(let vol of vol_added){
        let new_vol = (int_WB_vol + vol);
        bconc = (m1v1 / new_vol);
        aconc = (vol * SA_conc / new_vol);

        // Display the problem header
        console.log("[" + util.alphabet.substr(i, 1) + "] +" + vol.toFixed(util.prec) + " <vol unit> Acid");
        console.log("------------------------------------");
        i++;

        // Display the new concentration of the acid
        console.log(chalk.redBright("Acid Concentration: ") + aconc.toFixed(util.prec) + " M"
            + " ".repeat(util.spacing_width - aconc.toFixed(util.prec).length)
            + chalk.gray("(" + int_WB_vol + " ml)(" + int_WB_conc + " M) = (" + new_vol + " mL)(x)")
        );

        // Display the new concentration of the base
        console.log(chalk.blueBright("Base Concentration: ") + bconc.toFixed(util.prec) + " M"
            + " ".repeat(util.spacing_width - bconc.toFixed(util.prec).length)
            + chalk.gray("(" + vol + " ml)(" + SA_conc + " M) = (" + new_vol + " mL)(x)")
        );


        console.log("\nTo solve for the pH:");

        //TODO everything beyond here
        if(aconc == 0){
            console.log("Solve for 14 + log(x) using kb");
            let x = solveForX(bconc, kb);
            console.log(chalk.grey("   x = " + x.toFixed(util.prec * 2)));
            console.log("   pH = 14 + log(x) = " + (14 + log(x)).toFixed(util.prec + 1))
        }
        else if(util.areCloseEnough(bconc, aconc)){
            let ka = (1e-14 / kb);

            console.log("Equv. Point, solve for pH of salt solution");
            console.log(chalk.grey("   ka = 1e-14 / " + ka + " = " + ka));
            console.log(chalk.grey("   Solve x^2/(" + aconc.toFixed(util.prec) + " - x) = " + ka));

            let x = solveForX(aconc, ka);
            console.log(chalk.gray("   x = " + x));
            console.log("   pH = -log(x) = " + (-log(x)).toFixed(util.prec + 1));
        }
        else if(aconc < bconc){
            console.log("Buffer calculation with Henderson Hasselbalch equation");
            console.log(chalk.grey("   [HB] = " + bconc.toFixed(util.prec * 2) + " - "
                + aconc.toFixed(util.prec * 2) + " = "
                + (bconc - aconc).toFixed(util.prec * 2)));
            console.log(chalk.grey("   [B+] = " + aconc.toFixed(util.prec * 2)));
            console.log(chalk.grey("   pkb = " + (-log(kb)).toFixed(util.prec * 2) ));
            console.log( "   pH = " + (14 + log(kb) - log(aconc / (bconc - aconc))).toFixed(util.prec) );
        }
        else{
            console.log("Excess SA present, do hydrolysis of conj. acid of the base.");
            console.log(chalk.grey("   [SA] = " + (aconc - bconc).toFixed(util.prec) + " M"));
            console.log("   pH = -log([SA]) = " + (-log(aconc - bconc)).toFixed(util.prec));
        }

        console.log("\n");
    }
}

module.exports = calculate;
