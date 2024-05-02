import {
  CardHeader,
  CardContent,
  Card,
  Box,
  Container,
  IconButton,
  Button,
  CardActions,
  Divider,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodoList from "./TodoList/TodoList";

import { useEffect, useState } from "react";
import NewTask from "./TodoList/NewTask";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "./store";
import { fetchTodoList } from "./reducers/todoListSlice";
import { setFilterTodo } from "./reducers/filterTodoSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  const todoList = useAppSelector((state: RootState) => state.todoList.tasks);

  const filterTodo = useAppSelector(
    (state: RootState) => state.filterTodo.filter
  );
  const [openNewTask, setOpenNewTask] = useState(false);

  const handleOpenNewTask = () => {
    setOpenNewTask(true);
  };
  const handleClose = () => {
    setOpenNewTask(false);
  };
  const filteredTodoList = todoList.filter((task) => {
    if (filterTodo === "all") return true;
    if (filterTodo === "completed") return task.isCompleted;
    if (filterTodo === "incomplete") return !task.isCompleted;
    return true;
  });

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: { sm: "500px" } }} raised>
          <CardHeader
            title="To-do List"
            titleTypographyProps={{
              fontSize: { sm: "32px" },
              fontWeight: "bold",
            }}
            action={
              <IconButton onClick={handleOpenNewTask}>
                <AddCircleIcon />
              </IconButton>
            }
            sx={{
              padding: "1rem",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          ></CardHeader>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              minHeight: "400px",
            }}
          >
            <TodoList todoList={filteredTodoList} />
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "center", padding: "1rem" }}>
            <Button
              size="small"
              color="primary"
              variant={filterTodo === "all" ? "contained" : "outlined"}
              onClick={() => dispatch(setFilterTodo("all"))}
            >
              All
            </Button>
            <Button
              size="small"
              color="primary"
              variant={filterTodo === "completed" ? "contained" : "outlined"}
              onClick={() => dispatch(setFilterTodo("completed"))}
            >
              Completed
            </Button>
            <Button
              size="small"
              color="primary"
              variant={filterTodo === "incomplete" ? "contained" : "outlined"}
              onClick={() => dispatch(setFilterTodo("incomplete"))}
            >
              Incompleted
            </Button>
          </CardActions>
        </Card>
        <NewTask
          onClose={handleClose}
          open={openNewTask}
          // addNewTask={addNewTask}
        />
      </Box>
    </Container>
  );
}

export default App;
