const fs = require('fs')
var data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))

module.exports = function(app) {

    app.get('/api/notes', (req, res) => {
        res.json(data);
      });
      

    app.get('/api/notes/:id', (req,res) => {
    res.json(data[Number(req.params.id)]);
    });
}

    app.post ('/api/notes', (req,res) => {

        let note =req.body;
        let id = (data.length).toString();
        console.log(id);
        note.id = id;
        data.push(note);

            fs.writeFileSync('./db/db.json', JSON.stringify(data), function(err) {
                if (err) throw (err);
              });
        res.json(data);

    });

        app.delete('/api/notes/:id', (req, res) => {
            let noteId = req.params.id;
            let newId = 0;
            console.log(`Deleting this note with id ${noteId}`);
            
            data = data.filter(currentNote => {
              return currentNote.id != noteId;
            });
        
        for (currentNote of data ) {
        currentNote.id = newId.toString();
        newId++;
}
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        res.json(data);
    });