import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import News from '../../../models/news/news';
import Box from '@mui/material/Box';

interface NewsCardProps {
    news: News;
}

const CompanyNewsTile: React.FC<NewsCardProps> = ({ news }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {news.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {news.date}
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1" paragraph>
                        {news.content}
                    </Typography>
                    <Button variant="contained" color="primary" href={news.link ?? ''} target="_blank" rel="noreferrer" disabled={!news.link}>
                        Read more
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CompanyNewsTile;
