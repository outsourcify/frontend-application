import menu from '~~/assets/data/menu/index';
import { UserRole } from '~~/types/entity/auth';

/**
 * Load menu items depend by user role
 */
export const useMenu = () => {
  // TODO: get role from logged in user
  const role: UserRole = 'ROLE_AGENCY';

  return menu[role];
};
