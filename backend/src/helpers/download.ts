import { v4 as uuid } from 'uuid';
import * as fast_csv from 'fast-csv';
import { file } from 'tmp-promise';
import { Response } from 'express';

export const download = async(res:Response ,csvFields: object[], fileName: string) =>{
    const { path, cleanup } = await file({ name: fileName });
    fast_csv.writeToPath(path, csvFields, {
      headers: true,
      quoteColumns: true,
      quoteHeaders: true
    })
      .on("finish", () => {
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        res.download(path, e => {
          if (e) {
            res.status(500).send(e);
          }
          cleanup();
        })
      });
}
