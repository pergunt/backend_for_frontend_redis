import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { routes } from "configs";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CatchAll = () => {
  const availableRoutes = (
    Object.keys(routes) as Array<keyof typeof routes>
  ).map((key) => {
    const item = routes[key];

    return <Item>{typeof item === "function" ? item() : item}</Item>;
  });

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="h5" component="div">
        Available routes are:
      </Typography>
      <Stack useFlexGap spacing={2}>
        {availableRoutes}
      </Stack>
    </>
  );
};

export default CatchAll;
