import { Queue } from "./queue";
import express, { json } from "express";
import { readFile } from "fs/promises";
import { StatusCodes } from "http-status-codes";

type Cow = {
    earMarkId: number,
    name: string,
    color: string,
    weight: number,
};

let nextCowId = 1;
const cowPerch: Cow[] = [];

const app = express();

app.use(json());

app.get("/cows", (req, res) => {
    res.status(StatusCodes.OK).json(cowPerch);
});
app.get("/cows/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id) || id < 1){
        res.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        const cow: Cow | undefined = cowPerch.find(cow => cow.earMarkId === id);
        if (cow){
            res.json(cow);
        } else {
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
    }
});

app.post("/cows", (req, res) => {
   const cowData: any = req.body;
   const name: string | undefined = cowData?.name;
   const weight: number | undefined = cowData?.weight;
   const color: string | undefined = cowData?.color;
   if (!weight || isNaN(weight)
   || !name || !color){
       res.sendStatus(400);
       return;
   }
   const cow = {
       earMarkId: nextCowId++,
       name: name,
       color: color,
       weight: weight
   };
   cowPerch.push(cow);
   res.status(201).json(cow);
});

type CowUpdate = {
    weight: number | undefined,
    name: string | undefined
};

app.patch("/cows/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const weight = req.body.weight;
    const name = req.body.name;
    if (isNaN(id) || id < 1
        || (weight && isNaN(parseFloat(weight)))
        || (name && name === '')) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    const updateData = {
        weight: weight,
        name: name
    };

    const existingCow: Cow | undefined = cowPerch.find(cow => cow.earMarkId === id);

    if (!existingCow){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }

    existingCow.weight = updateData.weight ?? existingCow.weight;
    existingCow.name = updateData.name ?? existingCow.name;

    res.sendStatus(StatusCodes.NO_CONTENT);
});

const port = 3000;
app.listen(port, () => console.log(`Started server at port ${port}`));