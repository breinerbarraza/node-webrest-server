import { Router } from "express";
import { TodosController } from "./controllers";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todController = new TodosController();

    router.get("/", todController.getTodos);
    router.get("/:id", todController.getByIdTodo);
    router.post("/", todController.createTodo);
    router.put("/:id", todController.updateTodo);
    router.delete("/:id", todController.deleteTodo);

    return router;
  }
}
