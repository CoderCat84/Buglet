import * as express from "express";

let app: any = express();

app.use(express.static("dist"));

app.get("/", (req: any, res: any) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Press Ctrl+C to Quit");
});
