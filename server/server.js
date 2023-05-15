const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
app.use(cookieParser());

require('./config/mongoose.config');    /* This is new */
require('./routes/person.routes')(app);
require('./routes/user.routes')(app);



app.listen(8000, () => {
    console.log("Listening at Port 8000")
})