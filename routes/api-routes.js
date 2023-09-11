const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        res.json(data);
    });

    app.get("/api/notes/:id", (req, res) => {
        res.json(data[Number(req.params.id)]);
    });

    app.post("/api/notes", (req, res) => {
        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);

        // Format the JSON data with pretty printing (2 spaces for indentation)
        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFileSync("./db/db.json", jsonData, (err) => {
            if (err) throw err;
        });

        res.json(data);
    });

    app.delete("/api/notes/:id", (req, res) => {
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => currentNote.id != noteId);
        for (const currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }

        // Format the JSON data with pretty printing (2 spaces for indentation)
        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFileSync("./db/db.json", jsonData);
        res.json(data);
    });
};
