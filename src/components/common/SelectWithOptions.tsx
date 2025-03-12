import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { SxProps } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

type SelectWithOptionsProps = {
    options: { label: string, value: string }[];
    label: string;
    labelId: string;
    groupSx?: SxProps;
    error?: boolean;
    errorText?: string;
    [x: string]: any;
}

const SelectWithOptions:React.FC<SelectWithOptionsProps> = ({ options, label, labelId, groupSx, error, errorText, ...rest }) => {
  return (
    <FormControl sx={groupSx}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        variant="outlined"
        labelId={labelId}
        label={label}
        error={error}
        { ...rest }
      >
        {[{label: "", value: ""}, ...options].map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        )}
      </Select>
      { error && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  )
}

export default SelectWithOptions