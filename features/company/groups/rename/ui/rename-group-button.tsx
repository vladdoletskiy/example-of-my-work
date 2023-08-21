import React from 'react';

import { EditIcon } from 'shared/ui/icons';
import { Button } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import * as model from '../model';

export const RenameGroupButton: React.FC = () => {
  return (
    <Button
      startIcon={<EditIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />}
      sx={{
        p: 0,
        color: theme.palette.text.primary,
        '&:hover': { backgroundColor: 'transparent' },
      }}
      variant="text"
      onClick={() => model.changedStateForm(true)}
    >
      Rename group
    </Button>
  );
};
