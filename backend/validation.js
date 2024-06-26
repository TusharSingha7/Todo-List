const z = require("zod");

const createTodo = z.object({
    title:z.string(),
    description:z.string(),
    status:z.boolean()
});

module.exports = {createTodo};