const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "1dxubi",  

  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    setupNodeEvents(on, config) {
// implement node event listeners here
    require('cypress-html-reporter/GenerateReport')(on, config) 
      
    },
      /*
  reporter: 'mochawesome',
  reporterOptions: {
    reportFileName: "[name]-result",
    html: false
    */
  },

  })


