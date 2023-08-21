import React from 'react';

import { DeleteIcon } from 'shared/ui/icons';
import { Button } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import * as model from '../model/store';

export const DeleteGroupButton: React.FC<{ groupId: string }> = ({ groupId }) => {
  return (
    <Button
      startIcon={<DeleteIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />}
      sx={{
        p: 0,
        color: theme.palette.text.primary,
        '&:hover': { backgroundColor: 'transparent' },
      }}
      variant="text"
      onClick={() => model.deletionConfirmationRequested(groupId)}
    >
      Delete group
    </Button>
  );
};
