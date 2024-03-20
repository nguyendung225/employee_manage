// export const authRoles = {
//   sa: ['SA'],
//   admin: ['SA', 'ADMIN'],
//   editor: ['SA', 'ADMIN', 'EDITOR'],
//   guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST']
// }
export const authRoles = {
  admin: ['ROLE_ADMIN'],
  user: ['ROLE_ADMIN', 'ROLE_USER'],
  manage: ['ROLE_ADMIN', 'ROLE_MANAGE'],
  guest: ['ROLE_ADMIN', 'ROLE_MANAGE', 'ROLE_USER'],
};