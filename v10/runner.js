const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const moment = require('moment')

// get current run timestamp
const currRunTimestamp = getRunTimeStamp();

//Get cypress CLI options using 'minimist
const args = require('minimist')(process.argv.slice(3));
//args.env = args.env + " not @skip";
console.log("args",args);

// get environment from args..
const environment = getEnvironment(args);
// get videoFlag from args..
const videoFlag =  getVideoFlag(args);
console.log("videoFlag",videoFlag);

//reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/mochawesome-report',

//source directory where individual test reports are created
const mergeOptions = {
    files: [
        'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/mochawesome-report/*.json'
      ]
}

//destination directory where we want our unified .html and .json file to be placed
const finalReport = {
    reportDir: 'reports/'+ environment + "/" +  "Test Run - " + currRunTimestamp,
    saveJson: true,
    reportFilename: 'Run-Report',
    reportTitle: 'Run-Report',
    reportPageTitle: 'Run-Report'
}

//Cypree Module API
cypress.run({   
    ...args,                           
    config: {
        screenshotsFolder: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/screenshots',
        video: videoFlag,
        videosFolder: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/videos'
    },
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/mochawesome-report',
        overwrite: false,
        html: true,
        json: true
    }
})
.then(result => {
    
    // generate a unified report, once Cypress test run is done
    generateReport(mergeOptions)
    .then(() => {
        console.log("[Cypress-TestFramework] Test Report has been generated.");
    })
    .catch(err => {
        console.error("[Cypress-TestFramework] Getting an error while generating reports - ", err.message)
    })
    .finally(() => {
        console.log("[Cypress-TestFramework] Total time taken - " + new Date(result.totalDuration).toISOString().substr(11, 8));
        console.log("[Cypress-TestFramework] Test Run Completed at - " + result.endedTestsAt);
    })
})
.catch(err => {
    console.error(err.message)
    process.exit(1)
})
  
// identify an environment; default is "qa"
function getEnvironment(args){

 let environment;
 let getEnv;

  if(args.env){
    if(args.env === true){
		// if --env flag is passed from CLI but without following any arguments
        environment = "qa";
        return "qa";
    }

    //handle extra args passed from CLI
    if(Array.isArray(args.env)){
        getEnv = args.env.join(",").split(",");
    }else{
        getEnv = args.env.split(",");
    }

  getEnv.map((curr, index) => {

    const envProperty = curr.split("=");

    if(envProperty[0] === 'configFile'){
        environment = envProperty[1];
    }

    if(index >= getEnv.length && environment === undefined){
		// if --env flag is passed from CLI, but doesn't contain any 'configFile' argument
        environment = "qa";
    }

 })

 return environment;

} else{
	// if no --env flag is passed from CLI
    environment = "qa";
    return "qa";
 }
}

// identify if we have a videoFlag true; default is "qa"
function getVideoFlag(args){

    if(args.video){
       return true;

    } else{
       return false;

    }
}
   

//get Run timestamp
function getRunTimeStamp() {
    var now = new moment().format('DD-MM-YYYY--HH_mm_ss')
    //cypress.wrap({ valueName: now }).as('RUN_TIME_STAMP');
    return now;
}

//generate unified report from sourecReport.files directory and create a unified report and store it in finalReport.reportDir location
function generateReport(mergeOptions) {
    return  merge(mergeOptions).then(report => {
        marge.create(report, finalReport)
        .then(result => {
            console.log("[Cypress-TestFramework] Run report saved at " + result[0]);
        })
        .catch(err => {
            console.error("[Cypress-TestFramework] Getting error while merging reports: ", err.message)
        })
        .finally(() => {
            process.exit()
        });
    });
}
