import React from 'react';

import { SearchIcon } from 'shared/ui/icons';
import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  TextField,
  Typography,
  SxProps,
  useMediaQuery,
} from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import { GroupCard, groupsModel } from 'entities/company/groups';
import { Group } from 'entities/company/groups/types';

import { CreateGroupButton } from 'features/company/groups/create';

export const GroupList: React.FC<{
  groups: Group[];
  sx?: SxProps;
  title: string;
  selected?: string | null;
  onSelect: (id: string) => void;
}> = ({ groups, sx, title, selected = null, onSelect = () => null }) => {
  const [search, setSearch] = React.useState('');

  const gtMd = useMediaQuery(theme.breakpoints.up('md'));
  const gtLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 400,
        ...(gtLg && { minWidth: 400 }),
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', pl: gtMd ? 5 : 2, pr: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontStyle: theme.typography.subtitle2 }}>{title}</Typography>
          <CreateGroupButton />
        </Box>
        {!!groups.length && (
          <Box sx={{ pt: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  pr: 0,
                },
                '& .MuiInputAdornment-root': {
                  mr: 1.5,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          pt: 0.5,
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <List
          dense
          component="div"
          role="list"
          sx={{
            width: '100%',
            position: 'relative',
            '& .Mui-selected': {
              '&::after': {
                borderRight: (theme) => `3px solid ${theme.palette.primary.main}`,
                height: '80%',
                top: '10%',
              },
            },
            '& ::after': {
              content: '""',
              position: 'absolute',
              height: '0%',
              borderRight: 'none',
              top: '50%',
              right: 0,
              transition: 'height 1s, top 1s',
            },
          }}
        >
          {groups
            .filter((group) => group.name?.toLowerCase().includes(search.toLowerCase()))
            .map((group) => (
              <ListItemButton
                key={group.id}
                sx={{ pl: gtMd ? 5 : 2, py: 0.5 }}
                selected={selected === group.id}
                onClick={() => {
                  onSelect(group.id);
                  groupsModel.selectGroupIdRequested(group.id);
                }}
              >
                <GroupCard group={group} selected={selected} />
              </ListItemButton>
            ))}
        </List>
      </Box>
    </Box>
  );
};
