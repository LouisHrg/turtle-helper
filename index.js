import express from 'express'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'
import { exec } from 'child_process'
const app = express()

const formParser = bodyParser.urlencoded()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('home')
});

app.post('/peta-prout', formParser, async (req, res) => {
    exec(`spotdl ${req.body.petaLink}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    return res.redirect('/')
});

app.listen(3000)


