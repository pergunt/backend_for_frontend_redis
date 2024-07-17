import { FC, useState, useEffect } from "react";
import { useParams } from "hooks";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Image, NavLink, PreLoader } from "components";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { API, routes } from "configs";
import { Product } from "./types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Details: FC = () => {
  const { id } = useParams<"id">();
  const [state, setState] = useState<{
    loading: boolean;
    record: Product | null;
  }>({
    loading: true,
    record: null,
  });

  // TODO handle errors
  useEffect(() => {
    API.get(`/${id}`)
      .then(({ data }) => {
        setState({
          record: data,
          loading: false,
        });
      })
      .catch(() => {
        setState({
          record: null,
          loading: false,
        });
      });
  }, [id]);

  if (state.loading) {
    return <PreLoader />;
  }

  const { record } = state;

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <CardActions>
        <Button component={NavLink} to={routes.products}>
          Go Back
        </Button>
      </CardActions>
      {!record ? (
        <Box textAlign="center">
          <MoodBadIcon />
          <Typography>Not Found</Typography>
        </Box>
      ) : (
        <>
          <CardHeader
            avatar={<Image src={record.images[0]} />}
            title={record.title}
            subheader={record.description}
          />
          <CardContent>
            <Stack direction="row" spacing={2} justifyContent="space-around">
              <Item>{record.brand}</Item>
              <Item>{record.category}</Item>
              <Item>{record.price}$</Item>
            </Stack>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Details;
