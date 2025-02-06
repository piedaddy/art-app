'use-client';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { departments, MEDIUMS } from '@/app/lib/constants';
import InfoIcon from '@mui/icons-material/Info';

export default function Filter({
  filterByDepartment,
  filter,
}: {
  filterByDepartment: (id: string) => Promise<void>;
  filter: (
    contentName: string,
    mediumName?: string,
    dateBegin?: string,
    dateEnd?: string,
  ) => Promise<void>;
}) {
  const [shouldShowTooltipContent, setShouldShowTooltipContent] =
    useState(false);
  const [departmentId, setDepartmentId] = useState('');
  const [mediumName, setMediumName] = useState('');
  const [contentName, setContentName] = useState('');
  const [dateBegin, setDateBegin] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [shouldFilterOnlyByDepartment, setShouldFilterOnlyByDepartment] =
    useState(false);

  const label = {
    inputProps: { 'aria-label': 'Checkbox for filtering only be department' },
  };

  useEffect(() => {
    if (shouldFilterOnlyByDepartment && contentName) {
      resetSearchParams();
    }
  }, [shouldFilterOnlyByDepartment, contentName]);

  function resetSearchParams() {
    setContentName('');
    setMediumName('');
    setDateBegin('');
    setDateEnd('');
  }
  function handleSelectDepartment(event: SelectChangeEvent) {
    setDepartmentId(event.target.value);
    if (shouldFilterOnlyByDepartment) {
      filterByDepartment(String(event.target.value));
    }
  }

  function handleSelectMedium(event: SelectChangeEvent) {
    setMediumName(event.target.value);
  }

  function handleFilterByContent() {
    filter(contentName, mediumName, dateBegin, dateEnd);
  }

  function handleChangeDate(e, isDateBegin = false) {
    if (e.target.value.length > 4 || e.target.value > '2025') {
      return;
    }
    if (isDateBegin) {
      setDateBegin(e.target.value);
    } else {
      setDateEnd(e.target.value);
    }
  }

  function toggleShouldFilterOnlyByDepartment() {
    setShouldFilterOnlyByDepartment(!shouldFilterOnlyByDepartment);
    if (!shouldFilterOnlyByDepartment && departmentId) {
      filterByDepartment(departmentId);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Box
          component="form"
          className="flex flex-col"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <div className="flex">
            <InputLabel id="name">Content*</InputLabel>
            <InfoIcon
              className="pl-[3px]"
              sx={{ fontSize: 15 }}
              onClick={() =>
                setShouldShowTooltipContent(!shouldShowTooltipContent)
              }
            />
          </div>
          <TextField
            id="name"
            variant="outlined"
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
          />
          {shouldShowTooltipContent && (
            <p className="text-xs">
              mandatory unless searching only by department
            </p>
          )}
        </Box>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <InputLabel id="demo-simple-select-label">Date Begin</InputLabel>
          <TextField
            id="dateBegin"
            variant="outlined"
            value={dateBegin}
            onChange={(e) => handleChangeDate(e, true)}
            disabled={!contentName}
          />
        </Box>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <InputLabel id="demo-simple-select-label">Date End</InputLabel>
          <TextField
            id="dateEnd"
            variant="outlined"
            value={dateEnd}
            onChange={(e) => handleChangeDate(e)}
            disabled={!contentName || !dateBegin}
          />
        </Box>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        >
          <InputLabel id="medium">Medium</InputLabel>
          <Select
            labelId="medium"
            id="medium"
            value={mediumName}
            label="Age"
            onChange={handleSelectMedium}
            disabled={!contentName}
          >
            {MEDIUMS.map((medium) => (
              <MenuItem value={medium} key={medium}>
                {medium}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        >
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
          <div className="flex justify-center items-center">
            <InputLabel id="medium" sx={{ fontSize: '12px' }}>
              Search only by department
            </InputLabel>
            <Checkbox
              {...label}
              checked={shouldFilterOnlyByDepartment}
              onClick={toggleShouldFilterOnlyByDepartment}
            />
          </div>
        </Box>
      </div>
      <Button
        onClick={handleFilterByContent}
        disabled={!contentName}
        sx={{ fontSize: 15 }}
      >
        filter
      </Button>
    </div>
  );
}
