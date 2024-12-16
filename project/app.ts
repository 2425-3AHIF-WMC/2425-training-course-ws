import { Queue } from "./queue";
import express from "express";
import {readFile} from "fs/promises";

type QuestionOption = {
    text: string,
    isCorrect: boolean
};
type SeriesQuestion = {
    series: string,
    questions: QuestionOption[]
}

const stringQueue = new Queue<string>();
const boolQueue = new Queue<boolean>();

const seriesRawData = await readFile('series.json', 'utf-8');
const series = JSON.parse(seriesRawData);
const questions: SeriesQuestion[] = series.questions;

const map: Map<string, SeriesQuestion[]> = new Map<string, SeriesQuestion[]>();
for (const q of questions){
    if (map.has(q.series)){
        for (const o of q)
        map.get(q.series)?.push(q.)
    }
}

const app = express();

app.get('/greeting', (request, response) => {
   response.send('Hallo Client');
 })


const port = 3000;
app.listen(port, () => console.log(`Started server at port ${port}`));