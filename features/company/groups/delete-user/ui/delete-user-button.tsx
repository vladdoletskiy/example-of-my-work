import React from 'react';

import { DeleteIcon } from 'shared/ui/icons';
import { Button } from 'shared/ui/kit';

import * as model from '../model';

export const DeleteUserButton: React.FC<{ userIds: string[]; groupId: string }> = ({
  userIds,
  groupId,
}) => {
  return (
    <Button
      disabled={!userIds}
      sx={{ color: 'error.main' }}
      startIcon={<DeleteIcon />}
      onClick={() => model.deleteUserRequested({ userIds, groupId })}
    >
      Delete
    </Button>
  );
};
