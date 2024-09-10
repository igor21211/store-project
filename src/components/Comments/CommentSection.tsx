import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Review } from "../../interfaces/product.interface";
import Ratings from "../Rating/Rating";

interface CommentSectionProps {
  review: Review;
}

const CommentSection: React.FC<CommentSectionProps> = ({ review }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "20px",
      }}
    >
      <Card style={{ marginTop: "20px" }}>
        <CardContent>
          <Typography variant="h6">{review.reviewerName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(review.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">{review.comment}</Typography>
          <Typography variant="body2" color="textSecondary">
            <Ratings rating={review.rating} />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommentSection;
