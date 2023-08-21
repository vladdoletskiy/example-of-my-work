import React from 'react';

import { Avatar, Box, TableCell, TableRow, Typography, Checkbox } from 'shared/ui/kit';

import { Employee } from 'entities/company/groups/types';

import * as model from '../model';

export const GroupTableRow: React.FC<{
  user: Employee;
  selected?: boolean;
}> = ({ user, selected }) => {
  return (
    <TableRow
      sx={{
        height: 56,
        '& td': { border: 'none', py: 0 },
      }}
    >
      <TableCell sx={{ px: 0, textAlign: 'right' }}>
        <Checkbox
          checked={selected}
          sx={{ p: 0 }}
          color="default"
          onChange={(event) => {
            if (event.target.checked) {
              model.userSelected(user.userId);
            } else {
              model.userUnselected(user.userId);
            }
          }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={user.picture} sx={{ height: 42, width: 42 }} />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2">{user.name}</Typography>
            <Typography color="textSecondary" variant="body2">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            {user.organizationNames[0]}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            {user.roleName}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};
