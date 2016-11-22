// Set the node environment to be a test environment
process.env.NODE_ENV = 'test';

// Require our assertion library
const chai           = require('chai');
global.should        = chai.should();
global.expect        = chai.expect;

// Supertest allows you to make HTTP requests to your app as if it was live
const supertest      = require('supertest');
const app            = require('../index');
global.api           = supertest(app);
