import { createEvent, sample } from 'effector';

import { Employee, employeeModel } from 'entities/company/employee';
import { groupsModel } from 'entities/company/groups';

export const addParticipantsRequested = createEvent<{ users: Employee[]; groupId: string }>();

sample({
  clock: addParticipantsRequested,
  filter: (data) => Boolean(data.groupId),
  target: groupsModel.addParticipantsFx,
});

sample({
  clock: groupsModel.addParticipantsFx.done,
  target: employeeModel.reloadDataRequested,
});
