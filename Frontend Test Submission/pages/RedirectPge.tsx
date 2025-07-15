import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logger } from '../logger/logger';
export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const stored = sessionStorage.getItem(shortcode!);
    if (!stored) return navigate('/');
    const data = JSON.parse(stored);
    const now = new Date();

    if (new Date(data.expires) < now) {
      logger.error("Link expired", data);
      return navigate('/');
    }
    data.clicks.push({
      time: now.toISOString(),
      source: document.referrer,
      location: "India"
    });
    sessionStorage.setItem(shortcode!, JSON.stringify(data));
    logger.info("Redirecting to long URL", data);
    window.location.href = data.longUrl;
  }, []);
  return <div>Redirecting...</div>;
}