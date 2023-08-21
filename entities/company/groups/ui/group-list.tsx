import React from 'react';

import { Box, Typography } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import { Group } from '../types';

export const GroupCard: React.FC<{
  group: Group;
  selected?: string | null;
}> = ({ group, selected = null }) => {
  return (
    <Box sx={{ py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <Typography
        sx={{
          fontStyle: theme.typography.h6,
          ...(selected === group.id && { color: 'primary.main' }),
        }}
      >
        {group.name}
      </Typography>
      <Typography sx={{ fontStyle: theme.typography.body2, display: 'flex', flexWrap: 'wrap' }}>
        {Object.entries(group.roles).map(([role, count], index, rolesArray) => (
          <Box key={role} component="span" sx={{ whiteSpace: 'pre' }}>
            {`${count} ${role}${index + 1 === rolesArray.length ? '' : ' | '}`}
          </Box>
        ))}
      </Typography>
    </Box>
  );
};
