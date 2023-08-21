import { useStore } from 'effector-react';
import React from 'react';

import { ActionsMenu } from 'shared/ui/components/actions-menu';
import { BasicTable } from 'shared/ui/components/table';
import { CompanyOfPeopleIcon, MoreVertIcon } from 'shared/ui/icons';
import { Box, Typography, SxProps, Checkbox } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import { Employee, Group } from 'entities/company/groups/types';

import { ParticipantSelect } from 'features/company/groups/add-participant';
import { CreateGroupForm } from 'features/company/groups/create';
import { DeleteGroupButton } from 'features/company/groups/delete-group';
import { RenameGroupButton, RenameGroupForm } from 'features/company/groups/rename';

import * as model from '../model';

import { GroupTableRow } from './group-table-row';

const popupElementStyle = {
  px: 2,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  '& button': {
    fontSize: 16,
    fontWeight: 400,
    '& .MuiSvgIcon-root': { fontSize: 24 },
    '& .MuiButton-startIcon': { ml: 0 },
  },
  '&:hover': { bgcolor: 'background.default' },
};

const tableColumns = [
  { name: 'Name', styles: { borderBottom: 'none' }, key: 'name' },
  {
    name: 'Organization/Store',
    styles: { borderBottom: 'none' },
    key: 'organization',
  },
  { name: 'Role', styles: { borderBottom: 'none' }, key: 'role' },
];

export const GroupDetails: React.FC<{
  groups: Group[];
  currentGroupId: string | null;
  sx?: SxProps;
  title: string;
}> = ({ groups, currentGroupId, sx, title }) => {
  const currentGroup = useStore(model.$selectedGroup);
  const selectedUserIds = useStore(model.$selectedUserIds);
  const loading = useStore(model.$loading);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        ...sx,
      }}
    >
      <CreateGroupForm />
      {groups.length ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 5,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <CompanyOfPeopleIcon />
              <Typography sx={{ fontStyle: theme.typography.subtitle2, pl: 1.5 }}>
                {title} {`(${currentGroup?.participants?.length ?? 0})`}
              </Typography>
            </Box>
            <ActionsMenu
              minWidth={188}
              menu={{ icon: <MoreVertIcon /> }}
              items={[
                <Box sx={popupElementStyle} key={'rename-group'}>
                  <RenameGroupButton />
                </Box>,
                <Box sx={popupElementStyle} key={'delete-group'}>
                  <DeleteGroupButton groupId={currentGroupId || ''} />
                </Box>,
              ]}
            />
          </Box>
          <Box sx={{ px: 5, pt: 2 }}>
            <ParticipantSelect groupId={currentGroupId || ''} />
          </Box>
          <Box
            sx={{
              mr: 1.5,
              pt: 0.5,
              pl: 2,
              pb: 2.5,
            }}
          >
            <BasicTable
              rows={currentGroup?.participants ?? []}
              loading={loading}
              showPaginator={!!currentGroup && currentGroup.participants.length > 11}
              columnsTitles={[
                {
                  name: (
                    <Checkbox
                      disabled={loading}
                      checked={
                        currentGroup?.participants.length === selectedUserIds.length &&
                        selectedUserIds.length > 0
                      }
                      indeterminate={
                        currentGroup?.participants.length !== selectedUserIds.length &&
                        selectedUserIds.length > 0
                      }
                      color="default"
                      sx={{ p: 0 }}
                      onChange={() => {
                        if (currentGroup?.participants?.length === selectedUserIds.length) {
                          model.allUsersUnselected();
                        } else {
                          model.allUsersSelected(
                            currentGroup?.participants?.map((user) => user.userId) || [],
                          );
                        }
                      }}
                    />
                  ),
                  styles: { width: 56, borderBottom: 'none', padding: 0, textAlign: 'right' },
                  key: 'checkbox',
                },
                ...tableColumns,
              ]}
              renderRow={(user: Employee, idx: number) => (
                <GroupTableRow
                  selected={selectedUserIds.includes(user.userId)}
                  key={idx}
                  user={user}
                />
              )}
            />
          </Box>
          <RenameGroupForm groupName={currentGroup?.name ?? ''} groupId={currentGroupId ?? ''} />
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', py: 4.5 }}>
          <Typography
            sx={{ fontStyle: theme.typography.h6, color: theme.palette.text.secondary }}
          >{`You don't have any group created`}</Typography>
          <Typography
            sx={{ fontStyle: theme.typography.h6, color: theme.palette.text.secondary }}
          >{`Create your first group`}</Typography>
        </Box>
      )}
    </Box>
  );
};
