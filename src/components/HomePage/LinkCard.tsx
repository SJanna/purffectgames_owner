import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

type LinkCardProps = {
  title: string;
  image: string;
  link: string;
};

export default function LinkCard(props: LinkCardProps) {
  const { title, image, link } = props;

  return (
    <Link href={link}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="200" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
