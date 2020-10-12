# Cypress-TestFramework
A simple JS Testing framework using [Cypress](https://github.com/cypress-io/cypress)

### Dependencies: ###

```
"devDependencies": {
    "cypress": "^5.3.0",
    "cypress-cucumber-preprocessor": "^3.0.0",
    "cypress-xpath": "^1.6.0",
    "minimist": "^1.2.5",
    "mocha": "^8.1.3",
    "mochawesome": "^6.1.1",
    "mochawesome-merge": "^4.2.0",
    "mochawesome-report-generator": "^5.1.0"
}
```
  
### Reports: ###
  
Reports can be found under - * reports\Test Run - <TimeStamp> *

### Sample Commands : ###

* Provide speclist to be run from the commandline
```node runner.js cypress run --env configFile=qa,TAGS="@UI"
//configFile = [qa,dev]
//TAGS = [@UI,@API,@SMOKE]
