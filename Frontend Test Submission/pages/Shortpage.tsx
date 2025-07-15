import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../logger/logger';

export default function ShortenPage() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: 30, shortcode: '' }]);
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (index: number, field: string, value: string) => {
    const newUrls = [...urls];
    // @ts-ignore
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: 30, shortcode: '' }]);
    }
  };

  const shortenUrls = () => {
    const data = urls.map((item) => {
      const sc = item.shortcode || uuidv4().slice(0, 6);
      const entry = {
        longUrl: item.longUrl,
        validity: item.validity || 30,
        shortcode: sc,
        created: new Date().toISOString(),
        expires: new Date(Date.now() + (item.validity || 30) * 60000).toISOString(),
        clicks: []
      };
      logger.info("Shortened URL created", entry);
      return entry;
    });

    data.forEach(d => {
      sessionStorage.setItem(d.shortcode, JSON.stringify(d));
    });

    setResults(data);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((url, i) => (
        <Box key={i} my={2}>
          <TextField label="Long URL" fullWidth value={url.longUrl} onChange={(e) => handleChange(i, 'longUrl', e.target.value)} />
          <TextField label="Validity (minutes)" type="number" fullWidth value={url.validity} onChange={(e) => handleChange(i, 'validity', e.target.value)} />
          <TextField label="Custom Shortcode (optional)" fullWidth value={url.shortcode} onChange={(e) => handleChange(i, 'shortcode', e.target.value)} />
        </Box>
      ))}
      <Button onClick={addUrlField}>Add Another URL</Button>
      <Button variant="contained" onClick={shortenUrls}>Shorten</Button>
      <Box mt={4}>
        {results.map((r, i) => (
          <Typography key={i}>Short URL: <a href={`/${r.shortcode}`}>{window.location.origin}/{r.shortcode}</a> (expires in {r.validity} min)</Typography>
        ))}
      </Box>
    </Box>
  );
}