require('dotenv').config()
const express = require ('express');
const app = express();

// *** MIDDLEWARE ***
app.use(require('./middlewares/middlewares'));

// *** ROUTES ***
app.use(require('./routes/routes'));

// *** SERVER ***
app.listen(process.env.PORT, () => console.log(`Server started in port ${process.env.PORT}`));