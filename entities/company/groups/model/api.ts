import { totalWorkflow } from 'shared/api';

import { Employee, Group } from '../types';

export const getGroups = async (participants: Employee[]): Promise<Group[]> => {
  const data = await totalWorkflow.UsersService.getGroupsByCurrentUser();

  const groups = data.map((group) => {
    const groupParticipants = participants.filter((participant) =>
      participant.groupIDs.includes(group?.id ?? ''),
    );

    const roles = groupParticipants.reduce<Record<string, number>>((acc, employee) => {
      const roleName = employee.roleName.toLowerCase();

      acc[roleName] = acc[roleName] ?? 0;
      acc[roleName]++;

      return acc;
    }, {});

    if (!group.id) {
      throw new Error('Server returned group without id');
    }

    return {
      name: group.name ?? '',
      id: group.id,
      createdBy: group.createdBy ?? '',
      createdOn: new Date(group.createdOn ?? ''),
      participants: groupParticipants,
      roles,
      description: group.description ?? '',
    };
  });

  return groups.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());
};

export const addParticipants = async ({
  users,
  groupId,
}: {
  users: Employee[];
  groupId: string;
}) => {
  const result = await Promise.allSettled(
    users.map((user) =>
      totalWorkflow.UsersService.patchUserByUserUuid({
        userUuid: user.id,
        requestBody: [
          {
            op: 'replace',
            path: '/groupIDs',
            value: [...user.groupIDs, groupId],
          },
        ],
      }),
    ),
  );

  return result.reduce<{ successful: number; failed: number }>(
    (acc, entry) => {
      if (entry.status === 'rejected') {
        return { ...acc, failed: acc.failed + 1 };
      }

      return { ...acc, successful: acc.successful + 1 };
    },
    {
      successful: 0,
      failed: 0,
    },
  );
};

export const createGroup = async (name: string): Promise<void> => {
  await totalWorkflow.GroupsService.postApiV1Groups({ requestBody: { name } });
};

export const deleteGroup = async (groupId: string): Promise<void> => {
  await totalWorkflow.GroupsService.deleteApiV1Groups({ groupId: groupId });
};

export const deleteParticipant = async ({
  users,
  groupId,
}: {
  users: Employee[];
  groupId: string;
}) => {
  const result = await Promise.allSettled(
    users.map((user) =>
      totalWorkflow.UsersService.patchUserByUserUuid({
        userUuid: user.id,
        requestBody: [
          {
            op: 'remove',
            path: '/groupIDs',
            value: user.groupIDs.filter((id) => id !== groupId),
          },
        ],
      }),
    ),
  );

  return result.reduce<{ successful: number; failed: number }>(
    (acc, entry) => {
      if (entry.status === 'rejected') {
        return { ...acc, failed: acc.failed + 1 };
      }

      return { ...acc, successful: acc.successful + 1 };
    },
    {
      successful: 0,
      failed: 0,
    },
  );
};

export const renameGroup = async ({
  name,
  groupId,
}: {
  name: string;
  groupId: string;
}): Promise<void> => {
  const group = await totalWorkflow.GroupsService.getApiV1Groups({ groupId });
  await totalWorkflow.GroupsService.putApiV1Groups({ requestBody: { ...group, name }, groupId });
};
