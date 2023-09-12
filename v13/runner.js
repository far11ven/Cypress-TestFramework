const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const moment = require('moment')

// get current run timestamp
const currRunTimestamp = getRunTimeStamp()

// get cypress CLI options using 'minimist
const args = require('minimist')(process.argv.slice(3))
//args.env = args.env + " not @skip";
console.log(`[Cypress-TestFramework][${new Date().toISOString()}] args: `, args)

// get videoFlag from args..
const videoFlag = getVideoFlag(args)
console.log(`[Cypress-TestFramework][${new Date().toISOString()}] videoFlag: `, videoFlag)

// get environment from args..
const environment = getEnvironment(args)
console.log(`[Cypress-TestFramework][${new Date().toISOString()}] environment: `, environment)

// destination directory where we want our unified .html and .json file to be placed
const finalReport = {
	reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp,
	saveJson: true,
	reportFilename: 'Run-Report',
	reportTitle: 'Run-Report',
	reportPageTitle: 'Run-Report'
}

// source directory where individual test reports are created
const mergeOptions = {
	files: [
		finalReport.reportDir + '/mochawesome-report/*.json'
	]
}

// when baseUrl is not part of the envFile <env>.json i.e default env
if (environment == 'default') {
	let baseUrl = args.config.split("=")[1]
	args.config = {
		baseUrl: baseUrl,
		screenshotsFolder: finalReport.reportDir + '/screenshots',
		video: videoFlag,
		videosFolder: finalReport.reportDir + '/videos'
	}

} else {
	// when baseUrl is part of the envFile <env>.json
	args.config = {
		screenshotsFolder: finalReport.reportDir + '/screenshots',
		video: videoFlag,
		videosFolder: finalReport.reportDir + '/videos'
	}
}

// Cypress Module API
cypress.run({
		...args,
		reporter: 'mochawesome',
		reporterOptions: {
			reportDir: finalReport.reportDir + '/mochawesome-report',
			overwrite: false,
			html: true,
			json: true
		}
	})
	.then(finalResult => {

		// generate a unified report, once Cypress test run is done
		generateReport(mergeOptions, finalResult)
			.then(() => {
				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] Test Report has been generated.`)
			})
			.catch(err => {
				console.error(`[Cypress-TestFramework][${new Date().toISOString()}] Error while generating reports - `, err.message)
			})
	})
	.catch(err => {
		console.error(err.message)
		process.exit(1)
	})

// identify an environment; default env is from "default.json"
function getEnvironment(args) {

	let environment;
	let getEnv;

	if (args.env) {
		if (args.env === true) {
			// if --env flag is passed from CLI but without following any arguments
			environment = "default";
			return "default";
		}

		// handle extra args passed from CLI
		if (Array.isArray(args.env)) {
			getEnv = args.env.join(",").split(",")
		} else {
			getEnv = args.env.split(",")
		}

		getEnv.map((curr, index) => {

			const envProperty = curr.split("=")

			if (envProperty[0] === 'envFile') {
				environment = envProperty[1];
			}

			if (index >= getEnv.length) {
				// if --env flag is passed from CLI, but doesn't contain any 'envFile' argument
				environment = "default";
			}

		})

		if (environment === undefined) {
			// if --env flag is passed from CLI, but doesn't contain any 'envFile' argument
			environment = "default";
		}

		return environment;

	} else {
		// if no --env flag is passed from CLI
		environment = "default";
		return "default";
	}
}

// identify if we have a videoFlag true; default is "false"
function getVideoFlag(args) {

	if (args.video) {
		return true;

	} else {
		return false;

	}
}

// get Run timestamp
function getRunTimeStamp() {
	var now = new moment().format('DD-MM-YYYY--HH_mm_ss')
	//cypress.wrap({ valueName: now }).as('RUN_TIME_STAMP')
	return now;
}

// generate unified report from sourceReport.files directory and create a unified report and store it in finalReport.reportDir location
function generateReport(mergeOptions, finalResult) {
	return merge(mergeOptions).then(report => {
		marge.create(report, finalReport)
			.then(result => {
				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] Run report saved at location ` + result[0])
			})
			.catch(err => {
				console.error(`[Cypress-TestFramework][${new Date().toISOString()}] Error while merging reports: `, err.message)
			})
			.finally(() => {
				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] Test Run Completed on - ` + finalResult.endedTestsAt)
				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] Total duration - ` + finalResult.totalDuration)

				//calculate total time taken for test run
				let endDate = new Date(finalResult.endedTestsAt)
				let startDate = new Date(finalResult.startedTestsAt)
				let gitHubActions = {};

				const hours = parseInt(Math.abs(endDate - startDate) / (1000 * 60 * 60) % 24)
				const minutes = parseInt(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60) % 60)
				const seconds = parseInt(Math.abs(endDate.getTime() - startDate.getTime()) / (1000) % 60)
				
				// stats for GitHub Actions
				gitHubActions.projectId = finalResult.config.projectId;
				gitHubActions.envUrl = args.config.baseUrl;
				gitHubActions.suites = finalResult.totalSuites;
				gitHubActions.tests = finalResult.totalTests;
				gitHubActions.passed = finalResult.totalPassed;
				gitHubActions.failed = finalResult.totalFailed;
				gitHubActions.skipped = finalResult.totalSkipped;
				gitHubActions.pending = finalResult.totalPending;

				// used for signalling GitHub Actions Teams Notifications about the Test Run Success/Failure 
				if (finalResult.totalFailed === undefined) {
					gitHubActions.status = "failure"
					console.log(gitHubActions)

				} else if (finalResult.totalFailed > 0) {
					gitHubActions.status = "failure"
					console.log(gitHubActions)

				} else if (finalResult.totalFailed == 0) {
					gitHubActions.status = "success"
					console.log(gitHubActions)

				}

				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] Total time taken - ${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`)
				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] Total ${finalResult.totalPassed} test(s) passed out of ${finalResult.totalTests} tests`)
				console.log(`[Cypress-TestFramework][${new Date().toISOString()}] ======================== Test Run was complete ========================`)

				process.exit()
			})
	})
}