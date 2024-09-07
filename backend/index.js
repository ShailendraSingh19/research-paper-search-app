const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const papers = require('./Data/data');
let savedPapers = require('./Data/SavedCollection');
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const Port = 5000;

// Endpoint to get all papers
app.get("/", (req, res) => {
    try {
        res.json(papers);
    } catch (err) {
        console.log(err);
        res.json({ msg: "error sending response" });
    }
});

// Endpoint to save a paper
app.post("/savedCollection", (req, res) => {
    try {
        const paper = req.body;
        savedPapers.push(paper);
        res.status(201).json({ msg: "Paper saved" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error saving paper" });
    }
});

// Endpoint to get saved papers
app.get("/savedCollection", (req, res) => {
    try {
        res.json(savedPapers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error sending response" });
    }
});

// Endpoint to remove a paper
app.delete("/savedCollection/:id", (req, res) => {
    try {
        const paperId = parseInt(req.params.id);
        savedPapers = savedPapers.filter(paper => paper.id !== paperId);
        res.status(200).json({ msg: "Paper removed" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error removing paper" });
    }
});

app.listen(Port, () => {
    console.log("listening on Port: " + Port);
});
