import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { ITask } from "./Task";
import { useAppDispatch } from "../hooks";
import { addTask } from "../reducers/todoListSlice";

export interface NewTaskProps {
  open: boolean;
  onClose: () => void;
}

const NewTask = ({
  open,
  onClose,
}:
NewTaskProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const dispatch = useAppDispatch()

  const handleClose = () => {
    onClose();
  };
  const addNewTask = (): void => {
    const newTask: ITask = {
      id: Math.random(),
      title: newTaskTitle,
      description: newTaskDescription,
      isCompleted: false,
    };
    dispatch(addTask(newTask));
    setNewTaskTitle("");
    setNewTaskDescription("");
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskDescription(event.target.value);
  };
  const handleSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTask();
    handleClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmitTask,
        }}
      >
        <DialogTitle>Add To-do Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            inputProps={{ "data-testid": "new-task-title" }}
            variant="outlined"
            required
            type="text"
            value={newTaskTitle}
            onChange={handleTitleChange}
            fullWidth
            margin="dense"
          ></TextField>
          <TextField
            label="Description (optional)"
            variant="outlined"
            type="text"
            value={newTaskDescription}
            onChange={handleDescriptionChange}
            fullWidth
            margin="dense"
            multiline
            rows={2}
            inputProps={{
              maxLength: 100,
              "data-testid": "new-task-description"
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewTask;
