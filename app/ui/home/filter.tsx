'use-client';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { departments } from '@/app/lib/constants';

export default function Filter({
  onChange,
}: {
  onChange: (id: string) => Promise<void>;
}) {
  const [departmentId, setDepartmentId] = useState('');

  function handleSelectDepartment(event: SelectChangeEvent) {
    console.log('event.target.value', event.target.value);
    setDepartmentId(event.target.value);
    onChange(String(event.target.value));
  }
  return (
    <div className="flex">
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <InputLabel id="name">Artist name</InputLabel>
        <TextField id="name" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <TextField id="outlined-basic" variant="outlined" />
      </Box>

      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
        <InputLabel id="department">Department</InputLabel>
        <Select
          labelId="department"
          id="department"
          value={departmentId}
          label="Age"
          onChange={handleSelectDepartment}
        >
          {departments.map((department) => (
            <MenuItem
              value={department.departmentId}
              key={department.departmentId}
            >
              {department.displayName}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </div>
  );
}
