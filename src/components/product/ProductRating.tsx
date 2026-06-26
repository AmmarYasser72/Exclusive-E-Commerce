import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

interface ProductRatingProps {
  value?: number;
  count?: number;
}

export function ProductRating({ value = 4.5, count = 99 }: ProductRatingProps) {

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        size='small'
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 1 }}>
        <span className='opacity-50 font-semibold text-sm'>({count})</span>
      </Box>
    </Box>
  );
}
