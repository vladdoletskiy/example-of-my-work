import { combine, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { employeeModel } from 'entities/company/employee';
import { groupsModel } from 'entities/company/groups';
import { Group } from 'entities/company/groups/types';

export const Gate = createGate();

const domain = createDomain('widgets/company/groups');
domain.onCreateStore((store) => store.reset(Gate.close));

export const userSelected = domain.event<string>();
export const userUnselected = domain.event<string>();
export const allUsersSelected = domain.event<string[]>();
export const allUsersUnselected = domain.event();
export const hideSelectedUsersRequested = domain.event();
export const reloadRequested = domain.event();

export const $selectedGroup = domain.store<Group | null>(null);
export const $selectedUserIds = domain
  .store<string[]>([])
  .reset([groupsModel.deleteParticipantFx.done, hideSelectedUsersRequested]);

export const $loading = combine(
  [employeeModel.getEmployeeListFx.pending, groupsModel.deleteParticipantFx.pending],
  (loadings) => loadings.some(Boolean),
);

$selectedUserIds
  .reset([employeeModel.getEmployeeListFx.pending])
  .on(userSelected, (selectedUsers, userId) => [...selectedUsers, userId])
  .on(userUnselected, (selectedUsers, userId) => selectedUsers.filter((user) => user !== userId))
  .on(allUsersSelected, (_, users) => users)
  .on(allUsersUnselected, () => []);

sample({
  clock: $selectedGroup,
  fn: (group) =>
    group?.participants.reduce<Record<string, string>>((acc, participant) => {
      acc[participant.id] = participant.id;

      return acc;
    }, {}) ?? {},
  target: groupsModel.participantsChanged,
});

sample({
  clock: groupsModel.getGroupsFx.doneData,
  source: { selectedGroupId: groupsModel.$selectedGroupId, groups: groupsModel.$groups },
  filter: ({ groups }) => !!groups.length,
  fn: ({ selectedGroupId }, newGroups) => {
    if (!selectedGroupId || !newGroups.some((group) => group.id === selectedGroupId)) {
      return newGroups[0].id;
    }
    return selectedGroupId;
  },
  target: groupsModel.$selectedGroupId,
});

sample({
  clock: [
    Gate.open,
    reloadRequested,
    groupsModel.deleteGroupFx.done,
    groupsModel.renameGroupFx.done,
    groupsModel.createGroupFx.done,
    groupsModel.addParticipantsFx.done,
    employeeModel.$employeeList,
    employeeModel.addEmployeesToGroupPopupOpened,
  ],
  source: employeeModel.$employeeList,
  fn: (participants) =>
    participants.map((employee) => ({
      userId: employee.userId,
      id: employee.id,
      groupIDs: employee.groupIDs,
      email: employee.email,
      name: employee.name,
      picture: employee.picture,
      organizationNames: employee.organizationNames,
      roleName: employee.roleName,
    })),
  target: groupsModel.getGroupsFx,
});

sample({
  clock: groupsModel.selectGroupIdRequested,
  target: groupsModel.$selectedGroupId,
});

sample({
  clock: [groupsModel.$selectedGroupId, groupsModel.$groups],
  source: { id: groupsModel.$selectedGroupId, groups: groupsModel.$groups },
  fn: ({ id, groups }) => groups.find((g) => g.id === id) ?? null,
  target: $selectedGroup,
});

sample({
  clock: groupsModel.deleteGroupFx,
  target: allUsersUnselected,
});
