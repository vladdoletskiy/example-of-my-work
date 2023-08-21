import { useGate, useStore } from 'effector-react';
import React from 'react';

import { Box, Divider } from 'shared/ui/kit';

import { groupsModel } from 'entities/company/groups';

import * as model from '../model';

import { GroupDetails } from './group-details';
import { GroupList } from './group-list';

export const Groups: React.FC = () => {
  useGate(model.Gate);
  const groups = useStore(groupsModel.$groups);
  const selectedGroup = useStore(groupsModel.$selectedGroupId);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: 500 }}>
      <GroupList
        title="Groups"
        groups={groups}
        selected={selectedGroup}
        onSelect={groupsModel.selectGroupIdRequested}
        sx={{ width: '33%', pt: 3 }}
      />
      <Divider orientation="vertical" flexItem />
      <GroupDetails
        groups={groups}
        title="Employees"
        currentGroupId={selectedGroup}
        sx={{ pt: 3 }}
      />
    </Box>
  );
};
