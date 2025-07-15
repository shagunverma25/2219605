import { Box, Typography } from '@mui/material';

export default function Statspage() {
  const keys = Object.keys(sessionStorage);
  const entries = keys.map(k => JSON.parse(sessionStorage.getItem(k)!));

  return (
    <Box p={3}>
      <Typography variant="h4">URL Stats</Typography>
      {entries.map((entry, i) => (
        <Box key={i} my={2}>
          <Typography>Short: {window.location.origin}/{entry.shortcode}</Typography>
          <Typography>Original: {entry.longUrl}</Typography>
          <Typography>Created: {entry.created}</Typography>
          <Typography>Expires: {entry.expires}</Typography>
          <Typography>Clicks: {entry.clicks.length}</Typography>
          {entry.clicks.map((click: any, j: number) => (
            <Box key={j}>
              <Typography>— {click.time} | {click.source} | {click.location}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}