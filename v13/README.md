# Project Overview:
   Objective of this project is to have unified TestFramework (API+UI)

# Tools Required:

NodeJS: https://nodejs.org/en/download/

Visual Studio Code : https://code.visualstudio.com/download

GIT : https://git-scm.com/downloads

## Plugins Required for Visual Studio Code

1. Cucumber Plugin : https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete

2. Code Auto Formatter : https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
## Browsers

1. Chrome : https://www.google.com/chrome/
2. Firefox : https://www.mozilla.org/en-US/firefox/new/
3. Edge : https://www.microsoft.com/en-us/edge

# Setting The Project on to local system

1. Clone the project from this repo in your local system
2. Open the folder in VS Code and run the following command in the terminal **npm install**

# Running the project

1. Run via CYPRESS UI (without Mochawesone Reports):

   Open the VS Code terminal or CMD Prompt in system and Navigate to the project folder and run the command 
   ```
   npx cypress open --env envFile=[dev,qa]
   ```
2. Run via COMMAND line:

   Environment specific test runs:
   ```
   node runner.js cypress run --env envFile=[dev,qa]
   ```
   or,
   ```  
   npm run cy:test:[dev,qa]  //will generate mochawesome reports in local machine
   npm run cy:record:[dev,qa]  //will generate an online report in https://dashboard.cypress.io

   ```
3. Run all feature files:

   ### eg. @all
   ```
   
   node runner.js cypress run --env envFile=[dev,qa],TAGS="@all"
   ```

4. UI and API Tags Specific runs:

   ### eg. @API not @UI
   ```
   
   node runner.js cypress run --env envFile=[dev,qa],TAGS="@UI"

   node runner.js cypress run --env envFile=[dev,qa],TAGS="@API"
   ```

5. Ignore a test using ``` @skip ``` TAG:

   ```
   node runner.js cypress run --env envFile=[dev,qa],TAGS="@E2E and not @UI"*
   ```

6. Pass extra args from CLI ``` --video ```:


   ```
   npm run cy:test:qa --video --env TAGS="@API"
   ```

   Note: If we don't supply this flag video copy of the run won't be recorded and saved to the videos directory

   
# Test Reporting:


   ## Cypress Dashboard:

   Cypress Dashboard link : https://dashboard.cypress.io/projects/{project_link}/runs

   Command to invoke Cypress Dashboard reporting:   ``` npx cypress run --record --key XXX-XXXX-XX... ```

   ## Local Test Reporting:
- Test Reporting is Done using mochawesome reports and runner.js makes sure every test run has its own report directory 

  - reports
    - Test Run - 28-09-2020--12_45_03
      - assets
      - mochawesome-report
      - screenshots
      - videos
      - Run-Report.html
      - Run-Report.json
      
   
   ## Logging: ##
   We have following two custom commands for logging info in Mochawesome report:
   
    ```
    cy.log("This is some log");    
    cy.log("This is some key", "This is value");         // (it will appear in Console or Cypress UI only))
    cy.reportLogK("This is Subject");                    // logging single subject (it will appear in HTML Report only)
    cy.reportLogKV("This is key!","This is value!");     // logging Key Value pair (it will appear in HTML Report only)
    ```