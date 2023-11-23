import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

type LinkCardProps = {
  title: string;
  image: string;
  link: string;
};

export default function LinkCard(props: LinkCardProps) {
  const { title, image, link } = props;

  return (
    <Link href={link} style={{ textDecoration: "none" }}>
        <CardActionArea sx={{ height: 300 }}>
          <Image
            src={image}
            alt={title}
            fill={true}
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL="/static/images/placeholder.png"
          />
        </CardActionArea>
      <Typography
        variant="h5"
        component="p"
        align="center"
        sx={{
          color: "InfoBackground",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 0.5,
          borderRadius: 1,
          position: "relative",
          top: -60,
          textDecoration: "none",
        }}
      >
        {title}
      </Typography>
    </Link>
  );
}
