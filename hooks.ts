import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber'


BeforeAll(function () {
  console.log('Running before all scenarios')
 
})

Before(function ({pickle}) {
  console.log(`Running before scenario: ${pickle.name}`)
})

After(function ({pickle, result }) {
  console.log(`Running after scenario: ${pickle.name}`)
  if (result && result.status === 'PASSED') {
     console.log(`Scenario passed: ${pickle.name}`);
  } else {
   console.log(`Scenario failed: ${pickle.name}`);
  }
})  

AfterAll(function () {
  console.log('Running after all scenarios')
})
