import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* DI
  constructor() {}

  public async getTodos(req: Request, res: Response) {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  }

  public async getByIdTodo(req: Request, res: Response) {
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  }

  public async createTodo(req: Request, res: Response) {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({ data: createTodoDto! });

    return res.json({ message: "Todo created", todo });
  }

  public async updateTodo(req: Request, res: Response) {
    const { id } = req.params;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const exist = prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!exist) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: updateTodoDto!.values,
    });

    return res.json({ message: "Todo updated", todo });
  }

  public async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const exist = prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!exist) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const todo = await prisma.todo.delete({ where: { id: Number(id) } });

    return res.json({ todo, message: "Todo deleted" });
  }
}
