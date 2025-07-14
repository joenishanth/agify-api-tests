import { Given, When, Then, world } from '@cucumber/cucumber'
import supertest from 'supertest'
import assert from 'assert'

Given('I am a user', () => {
  let request = supertest(world.parameters.baseUrl)
  world.request = request;
})

When('I send a request to agify to get the age of {string}', async function (name) {
  world.response = await world.request.get('/').query({ name: name })
})

When('I request Agify to provide the localized age of {string} in country {string}', async function (name, countryId) {
  world.response = await world.request.get('/').query({ name: name, country_id: countryId })
})

When('I send a GET request to agify with multiple names', async function () {
  world.response = await world.request.get('/').query({ 'name[]': ['Mark', 'Angel'] })
  world.users = ['Mark', 'Angel']
})

When('I send a request to agify without a name', async function () {
  world.response = await world.request.get('/')
})

When('I send a request to agify with invalid ApiKey', async function () {
  world.response = await world.request.get('/')
    .query({ name: 'John', 'apikey': 'abcd1234' })
})

Then('the field {string} should be {int}', function (field, value) {
  assert.strictEqual(world.response.body[field], value, `Expected ${field} to be ${value}, but got ${world.response.body[field]}`)
})

Then('the response should returns Agify object', function () {
  let responseBody = world.response.body;
  assert.strictEqual(typeof world.response.body, 'object', 'Response body should be an object');
  assert.strictEqual(responseBody.hasOwnProperty('name'), true, 'Expected name field to be present');
  assert.strictEqual(responseBody.hasOwnProperty('count'), true, 'Expected count field to be present');
  assert.strictEqual(responseBody.hasOwnProperty('age'), true, 'Expected age field to be present');
  assert.strictEqual(responseBody.hasOwnProperty('country_id'), false, 'Property "country_id" should not be an own property');
})

Then('the response should returns AgifyWithCountryId object', function () {
  let responseBody = world.response.body;
  assert.strictEqual(typeof world.response.body, 'object', 'Response body should be an object');
  assert.strictEqual(responseBody.hasOwnProperty('name'), true, 'Expected name field to be present');
  assert.strictEqual(responseBody.hasOwnProperty('count'), true, 'Expected count field to be present');
  assert.strictEqual(responseBody.hasOwnProperty('age'), true, 'Expected age field to be present');
  assert.strictEqual(responseBody.hasOwnProperty('country_id'), true, 'Property "country_id" should not be an own property');
})

Then('the field {string} should be null', function (field) {
  assert.strictEqual(world.response.body[field], null, `Expected ${field} to be null, but got ${world.response.body[field]}`)
})

Then('the response should return the age of {string} in Country {string} as {int}', function (name, countryId, age) {
  assert.strictEqual(world.response.body.name, name, `Expected name to be ${name}, but got ${world.response.body.name}`)
  assert.strictEqual(world.response.body.country_id, countryId, `Expected country_id to be ${countryId}, but got ${world.response.body.country_id}`)
  assert.strictEqual(world.response.body.age, age, `Expected age to be ${age}, but got ${this.response.body.age}`)
})

Then('the API should respond with status code {int}', async function (statusCode) {
  console.log(this.response.body)
  console.log(this.response.status)//Same function for two scenarios 1 and 3
  assert.equal(this.response.status, statusCode)
  console.log(this.response.body)
})

Then('the response should contain the age of {string}', async function (name) {
  assert.strictEqual(typeof world.response.body, 'object', 'Response body should be an object')
  assert.strictEqual(world.response.body.name, name, `Expected name to be ${name}, but got ${world.response.body.name}`)
  assert.ok(Number(world.response.body.age) > 0, 'Expected age to be present')
})

Then('the response should contains age details for the names provided', async function () {
  let users = world.users;

  assert.strictEqual(Array.isArray(world.response.body), true, 'Response body should be an array')
  assert.equal(world.response.body.length, 2, 'Response body should not be empty')
  assert.equal(world.response.body[0].name, users[0], 'Expected name field to be present')
  assert.equal(world.response.body[1].name, users[1], 'Expected name field to be present')

})

Then('the error message should be {string}', function (errorMessage) {
  assert.strictEqual(world.response.body.error, errorMessage, `Expected error message to be "${errorMessage}", but got "${world.response.body.error}"`)
})