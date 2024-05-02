import { Box, Collapse, List, ListItem, ListItemText } from "@mui/material";
import Task, { ITask } from "./Task";
import { TransitionGroup } from "react-transition-group";

export interface TodoListProps {
  todoList: Array<ITask>;
}

const TodoList = ({ todoList }: TodoListProps) => {
  return (
    <List
      sx={{
        flex: 1,
        width: "100%",
        maxHeight: "400px",
        overflowY: "auto",
        display: "flex",
        padding: 0,
        flexDirection: "column",
        justifyContent: todoList?.length > 0 ? "flex-start" : "center",
      }}
    >
      <TransitionGroup>
        {todoList?.length > 0 ? (
          todoList.map((task: ITask) => (
            <Collapse key={task.id} exit={todoList?.length > 1}>
              <Task task={task} />
            </Collapse>
          ))
        ) : (
          <Collapse exit={todoList?.length > 1}>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: { xs: "24px" } }}
                  primary={"Task is empty"}
                  secondary={"Create new task!"}
                />
              </Box>
            </ListItem>
          </Collapse>
        )}
      </TransitionGroup>
    </List>
  );
};

export default TodoList;
