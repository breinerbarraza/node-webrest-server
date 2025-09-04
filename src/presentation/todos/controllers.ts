import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Walk the dog", completedAt: new Date() },
  { id: 3, text: "Do homework", completedAt: new Date() },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos(req: Request, res: Response) {
    return res.json(todos);
  }

  public getByIdTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  }

  public createTodo(req: Request, res: Response) {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const newTodo = { id: todos.length + 1, text, completedAt: new Date() };

    todos[todos.length] = newTodo;

    return res.json({ message: "Todo created", todo: newTodo });
  }

  public updateTodo(req: Request, res: Response) {
    const { id } = req.params;

    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const { text, completedAt } = req.body;

    todo.text = text ?? todo.text;

    completedAt === "null"
      ? todo.completedAt
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    // Object.assign(todo, { text });

    todo.text = text;

    // const asd = todos.forEach((todo, index) => {
    //   console.log(todo, index);
    //   if (todo.id === Number(id)) {
    //     todos[index] = todo;
    //   }
    // });

    // console.log(asd);
    // const todoUpdate = todos.map((todo) => {
    //   if (todo.id === Number(id)) {
    //     return { ...todo, ...body };
    //   }
    //   return todo;
    // });

    // const todoUpdate = todos.reduce((acc, todo) => {
    //   if (todo.id === Number(id)) {
    //     acc.push({ ...todo, ...body }); // Update the matched todo
    //   } else {
    //     acc.push(todo); // Keep the original todo
    //   }
    //   return acc;
    // }, [] as typeof todos);

    // const todoUpdate = todos.reduce((acc, prev) => {
    //   if (prev.id === Number(id)) {
    //     acc.push({ ...prev, ...body });
    //   } else {
    //     acc.push(prev);
    //   }
    //   return acc;
    // }, [] as typeof todos);

    return res.json({ message: "Todo updated", todo: todo });
  }

  public deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todos.splice(todos.indexOf(todo), 1);

    return res.json({ message: "Todo deleted", todo: todo });
  }
}
