import { useStore } from 'effector-react';
import React from 'react';

import { EditableTextField } from 'shared/ui/components/editable-text-field';
import { Box } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import { groupsModel } from 'entities/company/groups';

import * as model from '../model';

export const RenameGroupTextField: React.FC<{
  value: string;
  groupId: string;
}> = ({ value, groupId }) => {
  const [name, setName] = React.useState(value);
  const [canEdit, setCanEdit] = React.useState(false);
  const lastCreatedGroup = useStore(groupsModel.$lastCreatedGroupName);

  React.useEffect(() => {
    if (value === lastCreatedGroup) {
      groupsModel.lastCreatedGroupNameUpdated('');
      setCanEdit(true);
    }
  }, [lastCreatedGroup, value]);

  const handleBlur = () => {
    if (canEdit) {
      model.renamedGroup({ name, groupId });
      setCanEdit(false);
    }
  };

  return (
    <Box onBlur={handleBlur}>
      <EditableTextField
        sx={{
          '.MuiTypography-root': {
            fontStyle: theme.typography.body1,
            color: theme.palette.text.primary,
          },
          '.MuiInputBase-input': {
            p: 0,
          },
          '& fieldset': {
            border: 'none',
            borderBottom: `1px solid ${theme.palette.border.grey}`,
            borderRadius: 0,
          },
        }}
        value={name}
        onChange={setName}
        keepEditing={canEdit}
        canEdit={() => canEdit}
        type="string"
        popover={false}
      />
    </Box>
  );
};
