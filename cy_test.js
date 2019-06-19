const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const moment = require('moment')


const currRunTimestamp = getTimeStamp();

const sourceReport = {
    reportDir: 'reports/' + "Test Run - " + currRunTimestamp + '/mochawesome-report'
}

const finalReport = {
    reportDir: 'reports/' + "Test Run - " + currRunTimestamp,
    saveJson: true,
    reportFilename: 'Run-Report',
    reportTitle: 'Run-Report',
    reportPageTitle: 'Run-Report'
}

cypress.run({
    config: {
        screenshotsFolder: 'reports/' + "Test Run - " + currRunTimestamp + '/screenshots',
        video: false,
        videosFolder: 'reports/' + "Test Run - " + currRunTimestamp + '/videos'
    },
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports/' + "Test Run - " + currRunTimestamp + '/mochawesome-report',
        overwrite: false,
        html: true,
        json: true
    }
}).then(() => {
        generateReport()
    },
    error => {
        generateReport()
        console.error(error)
        process.exit(1)
    }
)

function generateReport(options) {
    return merge(sourceReport).then(report => {marge.create(report, finalReport)
    })
}

function getTimeStamp() {
    var now = new moment().format('DD-MM-YYYY--HH_mm_ss')
    return now
}