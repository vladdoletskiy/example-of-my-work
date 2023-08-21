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

import * as model from '../model/store';

export const CreateGroupForm: React.FC = () => {
  const open = useStore(model.$isOpenForm);
  const [name, setName] = React.useState('');

  return (
    <Dialog open={open}>
      <DialogTitle>New group</DialogTitle>
      <DialogContent sx={{ width: 300 }}>
        <DialogContentText>Enter name for group</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=""
          type="text"
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
            model.createGroupRequested(name);
          }}
          disabled={!name}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
