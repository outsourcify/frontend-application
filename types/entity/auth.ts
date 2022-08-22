export interface Credential {
  email: string;
  password: string;
}
export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export type UserRole =
  | 'ROLE_SUPER_ADMIN'
  | 'ROLE_ADMIN'
  | 'ROLE_AGENCY_MANAGER'
  | 'ROLE_CRM_SALES'
  | 'ROLE_CRM_MANAGER'
  | 'ROLE_ACCOUNTING'
  | 'ROLE_AGENCY';
