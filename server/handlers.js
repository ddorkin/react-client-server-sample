module.exports = {
    init: (req, res) => {
        let data = [];
        storage.forEach((key, value) => {
            data.push(value);
        });
        res.write(JSON.stringify(data));
        res.end();
        console.info("Init values were sent")
    },

    remove: (req, res) => {
        let trash = req.body.trash;
        trash.forEach((id) => {
            storage.removeItemSync(id.toString());
        });
        res.end();
        console.info("Next notes were deleted by ids", trash);
    },

    add: (req, res) => {
        let data = req.body;
        let id = Date.now();
        storage.setItemSync(id.toString(), Object.assign(data, {id: id}));
        res.write(JSON.stringify({id: id}));
        res.end();
        console.info("There was added new note with id", data.id);
    }
};