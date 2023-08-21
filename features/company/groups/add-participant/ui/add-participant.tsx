import { useStore } from 'effector-react';
import React from 'react';

import { PersonPlusIcon, SearchIcon } from 'shared/ui/icons';
import {
  Autocomplete,
  Avatar,
  Box,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  TextField,
  Typography,
} from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import { employeeModel } from 'entities/company/employee';
import { groupsModel } from 'entities/company/groups';

import * as model from '../model';

export const ParticipantSelect: React.FC<{ groupId: string }> = ({ groupId }) => {
  const [open, setOpen] = React.useState(false);
  const [pendingParticipants, setPendingParticipants] = React.useState<Record<string, string>>({});

  const employees = useStore(employeeModel.$employeeList);
  const participants = useStore(groupsModel.$participants);
  const loading = useStore(employeeModel.getEmployeeListFx.pending);

  const handleOpen = () => {
    if (!loading) {
      setOpen(true);
    }
  };

  return (
    <Autocomplete
      disabled={loading && !open}
      options={employees}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" onClick={handleOpen}>
                {!open ? (
                  <>
                    <PersonPlusIcon sx={{ ml: 1, color: theme.palette.text.secondary }} />
                    <Typography sx={{ pl: 1, color: theme.palette.text.secondary }}>
                      Add employees
                    </Typography>
                  </>
                ) : (
                  <SearchIcon sx={{ ml: 1, color: theme.palette.text.secondary }} />
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
      open={open}
      onOpen={handleOpen}
      onFocus={handleOpen}
      onClose={() => {
        setOpen(false);
        setPendingParticipants({});
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.userId === value.userId}
      renderOption={(props, user) => (
        <MenuItem
          {...props}
          sx={{
            '&.MuiAutocomplete-option': {
              ...((participants[user.id] || pendingParticipants[user.id]) && {
                display: 'none',
              }),
            },
          }}
          onClick={() => {
            model.addParticipantsRequested({ users: [user], groupId: groupId });
            setPendingParticipants((prevState) => ({ ...prevState, [user.id]: user.id }));
          }}
        >
          <ListItemIcon>
            <Avatar src={user.picture} />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">{user.name}</Typography>
            <Typography variant="caption">{user.roleName}</Typography>
            <Typography variant="caption">{user.organizationNames.toString()}</Typography>
          </Box>
        </MenuItem>
      )}
      size="small"
    />
  );
};
