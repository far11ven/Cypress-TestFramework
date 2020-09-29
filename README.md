# Cypress-TestFramework
A simple JS Testing framework using [Cypress](https://github.com/cypress-io/cypress)

### Dependencies:

```"devDependencies": {
    "cypress": "^3.2.0",
    "mocha": "^5.2.0",
    "mochawesome": "^3.1.1",
    "mochawesome-merge": "^1.0.7"
  }
```
  
### Reports:
  
Reports can be found under - * reports\Test Run - 18-03-2019--13_21_31 *

### Sample Commands:

* Provide speclist to be run from the commandline
 npm run cy:test
 npm run cy:test --speclist=['cypress/test/specs/spec1.js','cypress/test/specs/spec2.js']

### Cypress Dashboard:
 npx cypress run --record --key b7f2c879-d0c5-4c86-a556-93a4093c5368
