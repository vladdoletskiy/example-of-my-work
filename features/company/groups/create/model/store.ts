import { createStore, createEvent, sample } from 'effector';

import { groupsModel } from 'entities/company/groups';

export const changedStateForm = createEvent<boolean>();

export const createGroupRequested = createEvent<string>();

export const $isOpenForm = createStore<boolean>(false);

$isOpenForm.on(changedStateForm, (_, state) => state);

sample({
  clock: createGroupRequested,
  target: groupsModel.createGroupFx,
});
