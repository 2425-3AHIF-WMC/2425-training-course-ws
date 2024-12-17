import { Queue } from "./queue";
import express from "express";
import { readFile } from "fs/promises";

type Option = {
    text: string,
    isCorrect: boolean
};
type SeriesQuestions = {
    series: string,
    question: string,
    options: Option[]
}
type SeriesQuestion = {
    question: string,
    options: Option[]
};

const stringQueue = new Queue<string>();
const boolQueue = new Queue<boolean>();

const seriesRawData = await readFile("series.json", "utf-8");
const series = JSON.parse(seriesRawData);
const questions: SeriesQuestions[] = series.questions;

const map: Map<string, SeriesQuestion[]> = new Map<string, SeriesQuestion[]>();
for (const q of questions) {
    if (map.has(q.series)) {
        const existingQuestions = map.get(q.series)!;
        existingQuestions.push({
            question: q.question,
            options: q.options
        });
    } else {
        map.set(q.series, [
            {
                question: q.question,
                options: q.options
            }
        ]);
    }
}

const app = express();

app.get("/greeting", (request, response) => {
    response.send("Hallo Client");
});

const port = 3000;
app.listen(port, () => console.log(`Started server at port ${port}`));