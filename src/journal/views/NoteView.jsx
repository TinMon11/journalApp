import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components/";

export const NoteView = () => {
  const { active: note } = useSelector((state) => state.journal);

  const { body, title, data, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(data);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
      newDate
    );
  }, [data]);

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese Titulo"
          label="{active.title}"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        ></TextField>

        <TextField
          type="text"
          variant="filled"
          multiline
          fullWidth
          placeholder="{active.body}"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        ></TextField>
      </Grid>

      <ImageGallery />
    </Grid>
  );
};