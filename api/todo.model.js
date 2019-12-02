let todos = [];

module.exports.find = async () => {
    return todos;
};

module.exports.findById = async (id) => {
    return todos.find(row => row.id === id);
};

module.exports.create = async (data) => {
    let todo = {
        id: todos.length + 1,
        description: data.description,
        isChecked: data.isChecked,
    };

    todos.push(todo);
    return todo;
};

module.exports.updateById = async (id, data) => {
    let todo = todos.find(row => row.id == id);
    if (!todo) return false;

    Object.assign(todo, data);
    return todo;
};

module.exports.deleteById = async (id) => {
    let idx = todos.findIndex(row => row.id == id);
    if (idx == -1) return false;

    todos.splice(idx, 1);
    return true;
};