import type { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";

interface Error {
    message: string
}

type Data = {
     
}

export default function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean } | Error>) {
    const mappingWriteDBPath = {
        "toDo": "db/toDo.json",
        "inProgress": "db/inProgress.json",
        "done": "db/done.json"
    }
    const { toDo, inProgress, done} = JSON.parse(req.body);
    fs.writeFileSync("db/toDo.json", JSON.stringify({ toDo: toDo }), "utf-8");
    fs.writeFileSync("db/inProgress.json", JSON.stringify({ inProgress: inProgress }), "utf-8");
    fs.writeFileSync("db/done.json", JSON.stringify({ done: done }), "utf-8");
    res.status(200).json({ success: true })
}
