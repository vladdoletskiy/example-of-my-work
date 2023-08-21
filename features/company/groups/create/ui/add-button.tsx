import React from 'react';

import { GroupAddIcon } from 'shared/ui/icons';
import { Button } from 'shared/ui/kit';

import * as model from '../model';

export const CreateGroupButton: React.FC<{ newCreateGroupName?: string }> = ({
  newCreateGroupName,
}) => {
  return (
    <Button
      startIcon={<GroupAddIcon fontSize="small" />}
      sx={{ '&:hover': { backgroundColor: 'transparent' } }}
      variant="text"
      onClick={
        newCreateGroupName
          ? () => model.createGroupRequested(newCreateGroupName)
          : () => model.changedStateForm(true)
      }
    >
      New group
    </Button>
  );
};
