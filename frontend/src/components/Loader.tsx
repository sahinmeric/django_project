import { CircularProgress, Stack } from "@mui/material";

const Loader = () => {
  return (
    <Stack alignItems={"center"} sx={{ mt: 20 }}>
      <CircularProgress />
    </Stack>
  );
};

export default Loader;
