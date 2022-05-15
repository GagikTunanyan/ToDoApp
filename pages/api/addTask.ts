import type { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";

interface Error {
    message: string
}

type Data = {
     
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
    const mappingWriteDBPath = {
        "toDo": "db/toDo.json",
        "inProgress": "db/inProgress.json",
        "done": "db/done.json"
    }
    const { title, description, status } = JSON.parse(req.body);
    // @ts-ignore
    const db = JSON.parse(fs.readFileSync(mappingWriteDBPath[status], "utf-8"));
    db[status].push({ title, description, status});
    // @ts-ignore
    fs.writeFileSync(mappingWriteDBPath[status], JSON.stringify(db), "utf-8")    
    res.status(200).json({ 
        toDo: JSON.parse(fs.readFileSync("db/toDo.json", "utf-8")).toDo,
        inProgress: JSON.parse(fs.readFileSync("db/inProgress.json", "utf-8")).inProgress,
        done: JSON.parse(fs.readFileSync("db/done.json", "utf-8")).done,
    })
}
