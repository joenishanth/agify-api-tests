const reporter = require('cucumber-html-reporter')

const options = {
 // themes : either (bootstrap, heirarchy, foundation, simple)
 theme: 'bootstrap',
 jsonFile: './report/cucumber_report.json',
 output: './report/out/cucumber_report.html',
 reportSuiteScenarios: true,
 launchReport: true,
}

reporter.generate(options)