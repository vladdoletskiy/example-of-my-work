export type Group = {
  name: string;
  id: string;
  createdBy: string;
  createdOn: Date;
  participants: Employee[];
  description?: string;
  roles: Record<string, number>;
};

export type Employee = {
  userId: string;
  id: GUID;
  groupIDs: string[];
  email: string;
  name: string;
  picture: string;
  organizationNames: string[];
  roleName: string;
};
