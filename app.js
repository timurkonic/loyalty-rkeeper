import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/index.js';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/v0/', routes);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});
