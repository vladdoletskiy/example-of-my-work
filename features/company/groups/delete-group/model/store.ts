import { createEvent, createEffect, sample } from 'effector';

import { actionableNotificationModel } from 'shared/ui/components/actionable-notification';
import { askUser } from 'shared/ui/lib/ask-user';

import { groupsModel } from 'entities/company/groups';

export const deletionConfirmationRequested = createEvent<string>();
export const deleteGroupRequested = createEvent<string>();

const deleteWarningFx = createEffect(async (groupId: string): Promise<string> => {
  const answer = await askUser({
    title: 'Are you sure?',
    text: `All information about this group
    will be deleted.`,
    declineBtnConfig: { title: 'Cancel', color: 'primary' },
    confirmBtnConfig: { title: 'Delete', color: 'secondary' },
  });

  if (!answer) {
    throw new Error('Declined');
  }
  return groupId;
});

sample({
  clock: deletionConfirmationRequested,
  target: deleteWarningFx,
});

sample({
  clock: deleteGroupRequested,
  target: groupsModel.deleteGroupFx,
});

sample({
  clock: deleteWarningFx.doneData,
  fn: (groupId) => ({
    text: 'Group deleting',
    onClose: () => deleteGroupRequested(groupId),
    onBtnPress: () => null,
  }),
  target: actionableNotificationModel.newConfigReceived,
});
