import { Router } from "express";
import Todos from "../models/Todos.js";

const routes = Router();

// Get All Todos
routes.get("/", (req, res) => {
  Todos.findAll()
    .then((data) => {
      res.status(200).json({
        status: "success",
        count: data.length,
        todos: data,
      });
    })
    .catch((err) => {
      res.json({
        status: "failed",
        count: 0,
        data: [],
      });
    });
});

// Get Single Todo
routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Todos.findAll({
    where: {
      id,
    },
  });

  if (!data.length) {
    return res.status(404).json({
      status: "failed",
      count: 0,
      data: [],
    });
  }

  res.status(200).json({
    status: "success",
    todos: data,
  });
});

// Create New Todo
routes.post("/", async (req, res) => {
  const { author, title, description } = req.body;

  if (!author || !title || !description)
    return res.status(400).json({
      status: "failed",
      info: "all forms must be filled",
    });

  Todos.create({
    author,
    title,
    description,
  })
    .then((data) => {
      res.status(200).json({
        status: "success",
        info: `success add new todo '${data.title}'`,
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        info: "Check your request again",
      });
      console.log(err);
    });
});

// Set Todo Finished
routes.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const [setFinished] = await Todos.update(
    {
      finished: true,
    },
    {
      where: {
        id,
      },
    }
  );
  if (setFinished) {
    return res.status(200).json({
      status: "success",
      info: "success to set todo finished",
    });
  }

  res.status(400).json({
    status: "failed",
    info: "failed to set todo finished",
  });
});

// Update todo
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { author, title, description } = req.body;
  const [isUpdated] = await Todos.update(
    {
      author,
      title,
      description,
    },
    {
      where: {
        id,
      },
    }
  );
  if (isUpdated) {
    return res.status(200).json({
      status: "success",
      info: "success update todo",
    });
  }

  res.status(400).json({
    status: "failed",
    info: "failed to update todo",
  });
});

// Delete todo
routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Todos.destroy({
    where: {
      id,
    },
  });
  if (deleted) {
    res.status(200).json({
      status: "success",
      info: "todo deleted",
    });
  }

  res.status(400).json({
    status: "failed",
    info: "failed to delete todo ",
  });
});

export default routes;
