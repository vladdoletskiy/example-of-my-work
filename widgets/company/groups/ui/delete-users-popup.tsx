import { useStore } from 'effector-react';
import React from 'react';

import { FixedBottomPopup } from 'shared/ui/components/fixed-bottom-popup';
import { Box, Typography } from 'shared/ui/kit';

import { groupsModel } from 'entities/company/groups';

import { DeleteUserButton } from 'features/company/groups/delete-user';

import * as model from '../model';

export const DeleteUserPopup: React.FC = () => {
  const selectedUsers = useStore(model.$selectedUserIds);
  const selectedGroup = useStore(groupsModel.$selectedGroupId);
  const loading = useStore(model.$loading);

  if (!selectedUsers.length || loading) {
    return null;
  }

  return (
    <FixedBottomPopup onClose={() => model.hideSelectedUsersRequested()}>
      <Typography sx={{ ml: 1.5 }} variant="body1">{`${selectedUsers.length} Employee${
        selectedUsers.length > 1 ? 's' : ''
      }`}</Typography>
      <Box sx={{ display: 'flex', ml: 'auto', gap: 4 }}>
        <DeleteUserButton userIds={selectedUsers} groupId={selectedGroup} />
      </Box>
    </FixedBottomPopup>
  );
};
