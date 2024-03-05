/* eslint-disable no-undef */
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();

const client = new OAuth2Client(process.env.CLIENT_ID);

app.use(cors());
app.set('view engine', 'ejs');
// app.use('views','views');
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const wordSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    english: String,
    word: String,
    language: String
});

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    emailId: { type: String, required: true },
    displayPicture: { type: String },
    lastLoginTimeStamp: { type: Date, required: true }
})

const Word = mongoose.model('Word', wordSchema);
const User = mongoose.model('User', userSchema);

app.post('/verify_creds', async (req, res) => {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { name, email, picture } = payload;
    res.send({ name, email, picture });
})

app.get('/allwords', async (req, res) => {
    const userEmailVal = req.query.emailId;
    try {
        const words = await Word.find({ userEmail: userEmailVal });
        res.send(words);
    } catch (error) {
        res.status(500).send("Error retrieving words: " + error.message);
    }
});
// app.put('/updateTimeStamp', (req, res) => {

// });
app.post('/createuser', async (req, res) => {
    const newUser = new User({
        userName: req.body.name,
        emailId: req.body.emailid,
        displayPicture: req.body.picture,
        lastLoginTimeStamp: new Date().getTime()
    })
    try {
        await newUser.save();
        res.json({ message: 'User added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
app.get('/users', async (req, res) => {
    try {
        const userEmailVal = req.query.emailId;
        const usersList = await User.find({ emailId: userEmailVal });
        res.send(usersList);
    } catch (error) {
        res.status(500).send("Error retrieving words: " + error.message);
    }
})

app.delete('/allwords/delete/:id', async (req, res) => {
    try {
        const idToDelete = req.params.id;
        // const result = await Word.deleteOne({ _id: ObjectId(idToDelete) });
        const result = await Word.deleteOne({ _id: new ObjectId(idToDelete) }); // Using 'new' with ObjectId

        if (result.deletedCount === 0) {
            return res.status(404).send("No item found with that ID.");
        }

        res.status(200).send("Item successfully deleted.");
    } catch (error) {
        res.status(400).send("Failed to delete: " + error.message);
    }
});

app.post('/addword', async (req, res) => {
    const newWord = new Word({
        userEmail: req.body.userEmail,
        english: req.body.english,
        word: req.body.word,
        language: req.body.language
    });
    // console.table([req.body.english, req.body.word, req.body.language]);
    try {
        await newWord.save();
        res.json({ message: 'Word added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));