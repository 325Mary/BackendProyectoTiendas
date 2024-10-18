const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const path = require('path');


const usuarioRoutes = require('../routes/usuarioRoutes')
const RolRoutes = require('../routes/RolRoutes')

const appSBackend = express();
const port = 3000;
appSBackend.use(cors());
appSBackend.use(morgan("dev"));
appSBackend.use(express.json());
appSBackend.use('/uploadsPdf', express.static(path.join(__dirname, '../../uploads/pdf')));

const corsOptions = {
    origin: [
      'http://localhost:4200',

    ]
  };
appSBackend.use(usuarioRoutes);
appSBackend.use(RolRoutes)

appSBackend.set("port", process.env.PORT || port);


module.exports = appSBackend;