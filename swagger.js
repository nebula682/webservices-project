/*const swaggerAutogen = require('swagger-autogen')();

const doc = {
                info:{
                                title: 'Contacts Api',
                                description: 'Contacts Api'
                },
                host: 'localhost:3000',
                schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles =['.//routes/index.js'];

//This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);*/






/*const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Vehicles and drivers API',
    description: 'Vehicles and Drivers API',
  },
  host: 'localhost:3000',
  schemes: ['https', 'http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);*/



const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Vehicles and Drivers API',
    description: 'API for managing vehicles and drivers',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // Make sure this points to where your routes are

swaggerAutogen(outputFile, endpointsFiles, doc);









 