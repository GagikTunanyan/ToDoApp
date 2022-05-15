import type { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";
import path from "path";

interface Error {
    message: string
}

type Data = {
     
}
function readFromFile(filePath: string ) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", function (err, data: any) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
    const promises = [
        readFromFile("db/toDo.json"),
        readFromFile("db/inProgress.json"),
        readFromFile("db/done.json"),
    ];
    Promise
        .all(promises)
        .then((result) => {
            // @ts-ignore
            res.status(200).json({ ...result[0], ...result[1], ...result[2] })
        })
        .catch(() => {
            res.status(400).json({ message: "Database Issue" })
        })
  
}
