const express = require("express");
const {uuid, isUuid} = require("uuidv4");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
    const {title} = req.query;
    const results = title
        ? repositories.filter(rep => rep.title.includes(title))
        : repositories;    
    
    return res.json(results);
});

app.post("/repositories", (req, res) => {
    const {title, url, techs} = req.body;
    const repos = {id:uuid(), title, url, techs, likes: 0};
    repositories.push(repos);

    return res.json(repos);
});

app.post("/repositories/:id/like", (req, res) => {
    const {id} = req.params;
    const reposIndex = repositories.findIndex(repos => repos.id == id);

    if (reposIndex < 0){
        return res.status(400).json({error: "Repos not found !"});
    }

    repositories[reposIndex].likes += 1;
    
    return res.json(repositories[reposIndex]);
})

app.put("/repositories/:id", (req, res) => {
    const {id} = req.params;
    const {title, url, techs} = req.body;

    const reposIndex = repositories.findIndex(repos => repos.id == id);

    if (reposIndex < 0){
        return res.status(400).json({error: "Repos not found !"});
    }

    const repos = {id, title, url, techs, likes: repositories[reposIndex].likes};
    repositories[reposIndex] = repos;

    return res.json(repos);
});

app.delete("/repositories/:id", (req, res) => {
    const {id} = req.params;

    const reposIndex = repositories.findIndex(repos => repos.id == id);
    if (reposIndex < 0){
        return res.status(400).json({error: "Repos not found !"});
    }
    repositories.splice(reposIndex,1);

    return res.status(204).send("");
})

module.exports = app;