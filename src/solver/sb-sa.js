"use strict";

const chalk = require("chalk");
const formatArgs = require("../format_args.js");
const util = require("../util.js");

var log = Math.log10;

function calculate(arg){
    formatArgs(arg);

    let int_SB_conc = arg.inital_base_conc;
    let int_SB_vol = arg.inital_base_vol;
    let SA_conc = arg.inital_acid_conc;
    let vol_added = arg.values_added;

    let m1v1 = int_SB_vol * int_SB_conc;
    let aconc, bconc, pH, H;
    let i = 0;

    console.log("");

    for(let vol of vol_added){
        let new_vol = int_SB_vol + vol;
        bconc = (m1v1 / new_vol);
        aconc = (vol * SA_conc / new_vol);

        // Display the problem header
        console.log("[" + util.alphabet.substr(i, 1) + "] +" + vol.toFixed(util.prec) + " <vol unit> Acid");
        console.log("------------------------------------");
        i++;

        // Display the new concentration of the acid
        console.log(chalk.redBright("Acid Concentration: ") + aconc.toFixed(util.prec) + " M"
            + " ".repeat(util.spacing_width - aconc.toFixed(util.prec).length)
            + chalk.gray("(" + int_SB_vol + " ml)(" + int_SB_conc + " M) = (" + new_vol + " mL)(x)")
        );

        // Display the new concentration of the base
        console.log(chalk.blueBright("Base Concentration: ") + bconc.toFixed(util.prec) + " M"
            + " ".repeat(util.spacing_width - bconc.toFixed(util.prec).length)
            + chalk.gray("(" + vol + " ml)(" + SA_conc + " M) = (" + new_vol + " mL)(x)")
        );


        // Display the calculated pH
        if(util.areCloseEnough(aconc, bconc)){
            console.log("pH = 7 (Equal concentrations)");
        }
        else if(aconc > bconc){
            H = aconc - bconc;
            pH = -log(H);
            console.log("pH = -log(" + H.toFixed(util.prec) + ") = " + pH.toFixed(util.prec + 1));
        }
        else if(bconc > aconc){
            H = bconc - aconc;
            pH = 14 + log(H);
            console.log("pH = 14 + log(" + H.toFixed(util.prec) + ") = " + pH.toFixed(util.prec + 1));
        }
        console.log("\n")
    }
}

module.exports = calculate;
