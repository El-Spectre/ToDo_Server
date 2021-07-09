const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cors());


//app.get (' ' , function);

app.get('/', (req, res) => {
    fs.readFile('db.json', (err, db) => {
        if(err) {
            console.log('get root error: ', err);
            res.status(500).send('something went worong');
            return;
        }
        let tasks = JSON.parse(db);
        res.send(tasks);
    })
});


app.post('/addtask', (req, res) => {
    const { name } = req.body;
    fs.readFile('db.json' , (err, db) => {
        if(err){
            console.log('errorrrr', err);
        }
        let tasks = JSON.parse(db);
        if(name){ 
            tasks.push({name: name, status: 'To-do'});
            res.json('success');
        }
        fs.writeFile('db.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})

app.post('/deletetask', (req, res) => {
    const { index } = req.body;
    fs.readFile('db.json' , (err, db) => {
        if(err){
            console.log('errorrrr', err);
        }
        let tasks = JSON.parse(db);
        res.send(tasks);
        tasks.splice(index, 1);
        fs.writeFile('db.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})

app.post('/edittask', (req, res) => {
    const { index, name } = req.body;
    fs.readFile('db.json' , (err, db) => {
        if(err){
            console.log('errorrrr', err);
        }
        let tasks = JSON.parse(db);
        if(name){ 
            tasks[index].name = name;
            res.json('success');
        }
        fs.writeFile('db.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})

app.post('/editstatus', (req, res) => {
    const { index, status } = req.body;
    fs.readFile('db.json' , (err, db) => {
        if(err){
            console.log('errorrrr', err);
        }
        let tasks = JSON.parse(db);
        if(status){ 
            tasks[index].status = status;
            res.send(tasks);
        }
        fs.writeFile('db.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})

app.listen(port, () => {
    console.log(`app running on port http://localhost:${port}`);
});