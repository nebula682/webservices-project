














const router = require('express').Router();
//const swaggerUi = require('swagger-ui-express');//
//const swaggerJsdoc = require('swagger-jsdoc');//

const options = { 
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle & Driver API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/index.js'], // Scan these files for Swagger comments

  

   
};

//const specs = swaggerJsdoc(options);//
//router.use('/', swaggerUi.serve);//
//router.get('/', swaggerUi.setup(specs));//

module.exports = router;




