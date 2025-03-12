// EmailTile.tsx
import React from 'react'
import { Box, Typography } from '@mui/material'
import Email from '../../../models/emails/email'

interface EmailTileProps {
  email: Email
}

const EmailTile: React.FC<EmailTileProps> = ({ email }) => {
  return (
    <Box sx={{ padding: 2, borderBottom: '1px solid #ddd' }}>
      <Typography variant="body1"><strong>To:</strong> {email.recipient?.email || 'No recipient'}</Typography>
      <Typography variant="body2"><strong>Subject:</strong> {email.template}</Typography>
      <Typography variant="caption" color="textSecondary">
        Sent on {email.sent ? new Date(email.sent).toLocaleDateString() : 'Not sent'}
      </Typography>
    </Box>
  )
}

export default EmailTile
