const storage = require('node-persist');

storage.initSync({
    dir: './deals'
});
// dummy for test purposes
if (storage.length() === 0) {
    let data = [
        {id: 1, name: "Install IDE", duration: 10},
        {id: 2, name: "Open project", duration: 25},
        {id: 3, name: "Make the task", duration: 15},
        {id: 4, name: "Deploy in production", duration: 45},
    ];
    data.forEach((value) => {
        storage.setItemSync(value.id.toString(), value);
    });
}

module.exports = storage;