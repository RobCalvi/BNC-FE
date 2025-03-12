import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

const TableSkeleton:React.FC = () => {
    return (
        <Box component="div">
            {Array.from({ length: 5 }).map((_, index) => (
                <Box key={index} sx={{ margin: '8px' }}>
                  <Skeleton variant="rectangular" width="100%" height={40} />
                  <Skeleton variant="text" width="100%" height={40} />
                  <Skeleton variant="text" width="100%" height={40} />
                  <Skeleton variant="text" width="100%" height={40} />
                </Box>
              ))}
        </Box>
    )
}

export default TableSkeleton