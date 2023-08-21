import { createEvent, createEffect, createStore, sample } from 'effector';

import { askUser } from 'shared/ui/lib/ask-user';

import { employeeModel } from 'entities/company/employee';
import { groupsModel } from 'entities/company/groups';

export const deleteUserRequested = createEvent<{ userIds: string[]; groupId: string }>();

const deleteWarningFx = createEffect(async (): Promise<boolean> => {
  const answer = await askUser({
    title: 'Are you sure?',
    text: `These employees will be
    removed from this group`,
    declineBtnConfig: { title: 'Cancel', color: 'primary' },
    confirmBtnConfig: { title: 'Delete', color: 'secondary' },
  });

  if (!answer) {
    throw new Error('Declined');
  }
  return true;
});

const $selectedUserIds = createStore<{ userIds: string[]; groupId: string }>({
  userIds: [],
  groupId: '',
});
$selectedUserIds.on(deleteUserRequested, (_, { userIds, groupId }) => ({
  userIds,
  groupId,
}));

sample({
  clock: deleteUserRequested,
  target: deleteWarningFx,
});

sample({
  clock: deleteWarningFx.done,
  source: { selectedUserIds: $selectedUserIds, employees: employeeModel.$employeeList },
  fn: ({ selectedUserIds, employees }) => {
    const userIdsSet = new Set(selectedUserIds.userIds);
    const groupEmployee = employees.filter((e) => userIdsSet.has(e.userId));
    return { users: groupEmployee, groupId: selectedUserIds.groupId };
  },
  target: groupsModel.deleteParticipantFx,
});

sample({
  clock: groupsModel.deleteParticipantFx.done,
  target: employeeModel.reloadDataRequested,
});
