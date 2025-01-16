import express, { Router} from "express"
import { StatusCodes } from "http-status-codes";

export const fruitRouter = express.Router();

const fruits: string[] = ["apple", "banana", "peach"];

fruitRouter.get('/', (req, rsp) => {
  rsp.status(StatusCodes.OK).json(fruits);
});

fruitRouter.get('/:index', (req, rsp) => {
  const index:number = parseInt(req.params.index);

  if (!isNaN(index) && index >= 0 && index < fruits.length) {
    rsp.status(StatusCodes.OK).json(fruits[index]);
    return;
  }
  rsp.sendStatus(StatusCodes.BAD_REQUEST);
});

fruitRouter.post('/', (req, rsp) => {
  console.log('Req body', req.body);
  const name:any = req.body.fruit;
  if (typeof name !== 'string' || name.toString().trim().length === 0) {
    rsp.status(StatusCodes.BAD_REQUEST).send("fruit missing or not ok");
    return;
  }

  fruits.push(name.toString().trim());
  rsp.sendStatus(StatusCodes.CREATED);
});

fruitRouter.put("/:index", (req, rsp) => {
  const index: number = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= fruits.length) {
    rsp.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }
  fruits[index] = req.body.fruit;
  rsp.status(StatusCodes.OK).json(fruits[index]);
});

fruitRouter.delete("/:index", (req, rsp) => {
  const index: number = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= fruits.length) {
    rsp.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }
  fruits.splice(index, 1);
  rsp.sendStatus(StatusCodes.NO_CONTENT);
});