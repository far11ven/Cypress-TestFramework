const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
var cypressConfig = require('./cypress.json')

const currRunTimestamp = getTimeStamp();

const mergedReport = {
    reportDir: 'mochawesome-report/' + currRunTimestamp,
}

const finalReport = {
    reportDir: 'reports/' + currRunTimestamp,
}

cypress.run({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'mochawesome-report/' + currRunTimestamp,
        overwrite: false,
        html: true,
        json: true
      }
    }).then(
    () => {
        generateReport()
    },
    error => {
        generateReport()
        console.error(error)
        process.exit(1)
    }
)

function generateReport(options) {
    return merge(mergedReport).then(report => marge.create(report, finalReport))
}

function getTimeStamp() {
    var objToday = new Date(),
        weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
        dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

    var today = curHour + "_" + curMinute + "_" + curSeconds + curMeridiem + dayOfMonth + "_" + curMonth + "_" + curYear;
    return today
}