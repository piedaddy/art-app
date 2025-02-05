import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="loading-modal">
      <div className="loading-modal-content">
        <h2> LOADING</h2>
        <CircularProgress color="inherit" size="5rem" />
      </div>
    </div>
  );
}
