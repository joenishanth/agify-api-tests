import { BeforeAll, AfterAll, Before, After, AfterStep } from '@cucumber/cucumber'


BeforeAll(function () {
  console.log('*** Running before all scenarios ***\n')

})

Before(function ({pickle}) {
  console.log(`Running before scenario: ${pickle.name}\n`)
})

AfterStep(function ({pickleStep}) {
  console.log(`Running after step in scenario: ${pickleStep.text}`)
})

After(function ({pickle, result }) {
  console.log(`Running after scenario: ${pickle.name}\t`)
  if (result && result.status === 'PASSED') {
     console.log(` - Scenario passed\n`);
  } else {
   console.log(` - Scenario failed`);
  }
})  

AfterAll(function () {
  console.log('*** Running after all scenarios ***')
})
