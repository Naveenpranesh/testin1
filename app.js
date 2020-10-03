import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send("Welcome to Node Babel")
});

app.post('/api/add', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            console.log(req.token)

            console.log(err);
            
            res.sendStatus(403);
        }
        res.json({
            message: "Post Created.....",
            authData
        })
    })

})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: "Naveen",
        email: 'naveen@gmail.com'
    }
    jwt.sign({
        user
    }, 'secretkey', (err, token) => {
        if(err){
            res.sendStatus(403);
        }
        res.json({
            token
        });
    })
});

//Format of TOKEN
//Authorization:Bearer ,access_token>

//verify token

function verifyToken(req, res, next) {
    //get Auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        
        next();
    } else {
        res.sendStatus(403);
    }
}
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 83;
app.listen(port, () => {
    console.log(`app is listening to port 5000`);
})