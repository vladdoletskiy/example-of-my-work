import { useStore } from 'effector-react';
import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from 'shared/ui/kit';

import * as model from '../model';

export const RenameGroupForm: React.FC<{ groupName: string; groupId: string }> = ({
  groupName,
  groupId,
}) => {
  const open = useStore(model.$isOpenForm);
  const [name, setName] = React.useState(groupName);

  React.useEffect(() => {
    setName(groupName);
  }, [groupName]);

  return (
    <Dialog open={open}>
      <DialogTitle>Rename group</DialogTitle>
      <DialogContent sx={{ width: 300 }}>
        <DialogContentText>Enter new name for group</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={name}
          label="Group Name"
          type="email"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => model.changedStateForm(false)}>Cancel</Button>
        <Button
          onClick={() => {
            model.changedStateForm(false);
            model.renamedGroup({ name, groupId });
          }}
        >
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  );
};
