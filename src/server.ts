import express, {Request, Response} from 'express';

const app = express();
app.get('/', (req: Request, res) => {
    res.send('Hello Worldbeeeoolz!');
});


app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
}
);


