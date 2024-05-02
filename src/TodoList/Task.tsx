import { useAppDispatch } from "../hooks";
import { Box, Checkbox, IconButton, ListItemText, Divider, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask, toggleTask } from "../reducers/todoListSlice";
export interface ITask {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}
export interface TaskProps {
  task: ITask;
}
const Task = ({ task }: TaskProps) => {
  const dispatch = useAppDispatch();

  const handleToggleTask = () => {
    dispatch(toggleTask(task));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task));
  };

  return (
    <>
      <ListItem
        sx={{
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              maxWidth: "500px",
              overflow: "auto",
              cursor: "pointer",
              paddingY: "1rem",
              paddingLeft: "0",
              alignItems: task.description ? "flex-start" : "center",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            onClick={() => handleToggleTask()}
          >
            <Checkbox aria-label={`toggle-task-${task.id}`} checked={task.isCompleted} />
            <ListItemText
              
              sx={{
                textDecoration: task.isCompleted ? "line-through" : "",
                wordBreak: "break-word",
              }}
              data-testid={"ListItemText"}
              primary={task.title}
              secondary={task.description}
            />
          </Box>
          <IconButton aria-label={`delete-task-${task.id}`} onClick={handleDeleteTask} sx={{ borderRadius: 0 }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default Task;
