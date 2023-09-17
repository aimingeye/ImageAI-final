const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'aimingeye',
      password : '',
      database : 'postgres'
    }
  });

app.use(cors());
app.use(express.json());

// const database = {
//     users : [
//         {
//             id:"123",
//             name:"John",
//             entries: 3,
//             password:'secret',
//             email:"john@gmail.com",
//             joined : new Date()
//         },
//         {
//             id:"124",
//             name:"Sally",
//             entries: 6,
//             password:'secret2',
//             email:"sally@gmail.com",
//             joined : new Date()
//         }
//     ],
//     login : [
//         {
//             id: '987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }

//using get for root
app.get('/', (req, res)=>{
    // res.send('this is working...');
    res.send('working UwU');
})

/*
res --> this is working...
/signin --> POST = success/fail (done)
/register --> POST = user (done)
/profile/:userId --> GET = user (done)
/image --> PUT = updated user info  (done)
*/

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            console.log(data[0])
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            console.log(data[0].hash)
            if(isValid){
                db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json("unable to get user :("))
            }else{
                res.status(400).json("wrong credentials")
            }
        })
        .catch(err => res.status(400).json("wrong credentials TwT"))
    // if(req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password){
    //         res.json(database.users[0]);
    // }else{
    //     res.status(400).json("error logging in");
    // }
    // res.json('signing in...');
})

app.post('/register', (req, res)=>{
    const {email, name , password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: email,
                name: name,
                joined: new Date()
            })
            .then(user => 
                res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => res.status(400).json('unable to register :('));
    // database.users.push({
    //     id:"125",
    //     name:name,
    //     entries: 0,
    //     email:email,
    //     password:password,
    //     joined : new Date()
    // })
    // res.json("registering new user ...");
})

app.post('/profile/:id', (req, res)=>{
    const {id} = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                res.json(user[0])
            } else{
                res.status(400).json("not found :(")
            }
        })
        .catch(err => res.status(400).json("error getting user!"))
    // if(!found) res.status(400).json("Not Found!")
})

app.put('/image', (req, res) => {
    const {id} = req.body.id;
    console.log(req.body.id);
    db('users').where('id', '=', req.body.id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log(entries[0].entries)
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries :('))
    // let found = false;
    // database.users.forEach(user => {
    //     if(user.id === id){
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found) res.status(400).json("User Not Found!")

})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, ()=>{
    console.log("app is running on port 3000");
});