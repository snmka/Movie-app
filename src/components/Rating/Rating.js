import './Rating.css';

const Rating = ({ rating }) => {
  const classes = [];
  if (rating <= 3) {
    classes.push('rating--low');
  } else if (rating >= 4 && rating <= 5) {
    classes.push('rating--medium');
  } else if (rating >= 6 && rating <= 7) {
    classes.push('rating--high');
  } else if (rating > 7) {
    classes.push('rating--top');
  }
  return <div className={`rating ${classes}`}>{rating.toFixed(1)}</div>;
};

export default Rating;
