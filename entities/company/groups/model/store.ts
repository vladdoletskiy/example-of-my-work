import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import { Group } from '../types';

import {
  addParticipants,
  createGroup,
  deleteGroup,
  deleteParticipant,
  getGroups,
  renameGroup,
} from './api';

const domain = createDomain('entities/company/groups');

export const selectGroupIdRequested = domain.event<string>();
export const participantsChanged = domain.event<Record<string, string>>();
export const lastCreatedGroupNameUpdated = domain.event<string>();

export const getGroupsFx = domain.effect(getGroups);
export const createGroupFx = domain.effect(createGroup);
export const addParticipantsFx = domain.effect(addParticipants);
export const deleteGroupFx = domain.effect(deleteGroup);
export const deleteParticipantFx = domain.effect(deleteParticipant);
export const renameGroupFx = domain.effect(renameGroup);

export const $groups = domain.store<Group[]>([]);
export const $participants = domain.store<Record<string, string>>({});
export const $selectedGroupId = domain.store<string>('');
export const $lastCreatedGroupName = domain.store<string>('');

$lastCreatedGroupName.on(lastCreatedGroupNameUpdated, (state, name) => name);

$groups.on(getGroupsFx.doneData, (_, groups) => groups);
$participants.on(participantsChanged, (_, participants) => participants);

showFxErrors([
  getGroupsFx.failData,
  addParticipantsFx.failData,
  createGroupFx.failData,
  deleteGroupFx.failData,
  deleteParticipantFx.failData,
  renameGroupFx.failData,
]);
