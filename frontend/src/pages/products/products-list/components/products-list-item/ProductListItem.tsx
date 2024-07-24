import { FC, MouseEvent } from "react";
import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Image } from "components";
import { Product } from "types";
import styles from "./ProductListItem.module.css";

interface ProductListItemProps extends Product {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ProductListItem: FC<ProductListItemProps> = ({
  onClick,
  id,
  title,
  src,
  price,
}) => {
  return (
    <ListItemButton
      data-id={id}
      data-testid="products-list-item"
      component="button"
      className={styles.listItem}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Image alt="Product avatar" src={src} />
      </ListItemAvatar>
      <ListItemText
        className={styles.listItemText}
        primary={title}
        secondary={`${price}$`}
      />
    </ListItemButton>
  );
};

export default ProductListItem;
