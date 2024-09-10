import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Review } from "../../interfaces/product.interface";

interface CommentFormProps {
  onSubmit: (review: Review) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");
  const [reviewerEmail, setReviewerEmail] = useState<string>("");
  const { id } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const review: Review = {
      rating: Number(rating),
      comment,
      reviewerName,
      reviewerEmail,
      date: new Date().toISOString(),
    };

    localStorage.setItem(id ? id : "", JSON.stringify(review));
    onSubmit(review);
    updateForm();
  };

  const updateForm = () => {
    setComment("");
    setRating("");
    setReviewerName("");
    setReviewerEmail("");
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Rating"
          variant="outlined"
          value={rating}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRating(e.target.value)
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          variant="outlined"
          value={comment}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setComment(e.target.value)
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Reviewer Name"
          variant="outlined"
          value={reviewerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setReviewerName(e.target.value)
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Reviewer Email"
          variant="outlined"
          value={reviewerEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setReviewerEmail(e.target.value)
          }
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Comment
        </Button>
      </form>
    </Box>
  );
};

export default CommentForm;
