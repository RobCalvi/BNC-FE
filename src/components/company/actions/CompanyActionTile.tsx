import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Action from '../../../models/actions/action';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import { capitalizeAndFormatWord } from '../../../utils/string';

type CompanyActionTileProps = {
    action: Action;
    handleDeleteClick: (id: string) => void;
    handleReminderClick: (id: string) => void;
}

const CompanyActionTile: React.FC<CompanyActionTileProps> = ({ action, handleDeleteClick, handleReminderClick }) => {
    return (
        <Card sx={{display: 'flex', flexDirection: 'column', minHeight: '150px', margin: 1, borderRadius: 2, boxShadow: 3}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Box component="div" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.25rem' }}>
                    {action.title}
                    <Box component="div">
                        <Typography color="secondary" variant="caption">{capitalizeAndFormatWord(action.operation)}</Typography>
                    </Box>
                </Typography>
                <Box component="div">
                <IconButton color="secondary" onClick={() => handleReminderClick(action.id)}>
                    <TimerIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => handleDeleteClick(action.id)}>
                    <DeleteIcon />
                </IconButton>
                </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {action.date}
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1" paragraph sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {action.description}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CompanyActionTile