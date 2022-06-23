import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});
