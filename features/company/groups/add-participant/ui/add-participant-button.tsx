import { useStore } from 'effector-react';
import React from 'react';

import { Button } from 'shared/ui/kit';

import { employeeModel } from 'entities/company/employee';
import { groupsModel } from 'entities/company/groups';

import * as model from '../model';

export const AddParticipantsButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const employees = useStore(employeeModel.$selectedEmployees);
  const employee = useStore(employeeModel.$selectedOneEmployee);

  const selectedGroupId = useStore(groupsModel.$selectedGroupId);

  return (
    <Button
      onClick={() => {
        model.addParticipantsRequested({
          users: employee ? [employee] : Object.values(employees),
          groupId: selectedGroupId,
        });
        employeeModel.addEmployeesToGroupPopupOpened(false);
      }}
      variant="contained"
      disabled={disabled}
      sx={{ px: 2.5 }}
    >
      Move
    </Button>
  );
};
