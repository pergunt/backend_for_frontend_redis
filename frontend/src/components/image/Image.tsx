import { FC, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface ImageProps {
  alt?: string;
  src: string;
}

const Image: FC<ImageProps> = ({ alt, src }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box>
      {!loaded && <CircularProgress />}
      <Avatar
        alt={alt}
        src={src}
        sx={[
          !loaded && {
            visibility: "hidden",
            position: "absolute",
          },
        ]}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </Box>
  );
};

export default Image;
