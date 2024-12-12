import { Queue } from "./queue";
import express from "express";

const stringQueue = new Queue<string>();
const boolQueue = new Queue<boolean>();

const app = express();

app.get('/greeting', (request, response) => {
   response.send('Hallo Client');
 })


const port = 3000;
app.listen(port, () => console.log(`Started server at port ${port}`));