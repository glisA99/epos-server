import {Router,Request,Response} from 'express';
import { getRepository } from 'typeorm';

const router = Router();

interface Task{
    description:string,
    status: string
    name: string
}

const array:Array<Task> =[{
    name: "Clean room",
    status: "In progress",
    description: "Clean room asap"
}, {
    name: "Learn react",
    status: "Done",
    description: "Learn react from https://reactjs.org/"
}, {
    name: "Random task",
    status: "In progress",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"
}]

router.get('/',(req:Request,res:Response)=>{
    res.json(array);
})

export default router;
