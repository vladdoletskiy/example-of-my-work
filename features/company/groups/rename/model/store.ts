import { createStore, createEvent, sample } from 'effector';

import { groupsModel } from 'entities/company/groups';

export const changedStateForm = createEvent<boolean>();

export const renamedGroup = createEvent<{ name: string; groupId: string }>();

export const $isOpenForm = createStore<boolean>(false);

$isOpenForm.on(changedStateForm, (_, state) => state);

sample({
  clock: renamedGroup,
  target: groupsModel.renameGroupFx,
});
