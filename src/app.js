const express = require("express");
const {uuid, isUuid} = require("uuidv4");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
    res.json("Ok !");
});

app.post("/repositoires", (req, res) => {
    res.json("Ok !");
});

app.post("/repositories/:id/like", (req, res) => {
    res.json("Ok !");
})

app.put("/repositories/:id", (req, res) => {
    res.json("Ok !");
});

app.delete("/repositories/:id", (req, res) => {
    res.json("Ok !");
})

app.listen(3334, () => {
    console.log("Sucess !");
})