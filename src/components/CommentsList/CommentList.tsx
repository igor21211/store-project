import React from "react";
import { Review } from "../../interfaces/product.interface";
import CommentSection from "../../components/Comments/CommentSection"; // Ensure CommentSection is correctly imported

interface CommentListProps {
  reviews: Review[] | null;
}

const CommentList: React.FC<CommentListProps> = ({ reviews }) => {
  return (
    <div>
      {reviews?.map((review) => (
        <CommentSection key={review.reviewerName} review={review} />
      ))}
    </div>
  );
};

export default CommentList;
