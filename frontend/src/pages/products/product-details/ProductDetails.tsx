import { FC, useEffect } from "react";
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
import { useParams, useLocation, useNavigate, useAPI } from "hooks";
import { Image, PreLoader } from "components";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { routes } from "configs";
import { ProductsAPI } from "apis";
import { ProductDetails } from "types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Details: FC<Pick<ProductsAPI, "getOne">> = ({ getOne }) => {
  const { id } = useParams<"id">();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading, fetchData } = useAPI<ProductDetails, number | string>({
    request: (itemID) => getOne(itemID).then((r) => r.data),
  });

  useEffect(() => {
    fetchData(id!);
  }, [id, fetchData]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <CardActions>
        <Button
          onClick={() => {
            navigate(routes.products, {
              state: location.state,
            });
          }}
        >
          Go Back
        </Button>
      </CardActions>
      {!data ? (
        <Box textAlign="center">
          <MoodBadIcon />
          <Typography>Not Found</Typography>
        </Box>
      ) : (
        <>
          <CardHeader
            avatar={<Image src={data.src} />}
            title={data.title}
            subheader={data.description}
          />
          <CardContent>
            <Stack direction="row" spacing={2} justifyContent="space-around">
              <Item>{data.brand}</Item>
              <Item>{data.category}</Item>
              <Item>{data.price}$</Item>
            </Stack>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Details;
