// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('console', {
//     prevSubject: false
//   }, (subject, method) => {
//     // the previous subject is automatically received
//     // and the commands arguments are shifted

//     // allow us to change the console method used
//     method = method || 'log'

//     // log the subject to the console

//     switch(method) {
//         case log:
//             console[method](subject)
//             break;
//         case info:
//             console[method]('INFO:', subject)
//             break;
//         case error:
//             console[method]('ERROR:', subject)
//             break;
//         case warn:
//             console[method]('WARN:', subject)
//             break;
//         default:
//             console[method](subject)
//       }


//     // whatever we return becomes the new subject
//     //
//     // we don't want to change the subject so
//     // we return whatever was passed in
//     return subject
//   })

Cypress.Commands.add("text", { prevSubject: true }, (subject, options) => {
  return subject.text();
});
