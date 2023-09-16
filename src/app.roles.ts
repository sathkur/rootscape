import { AccessControl } from "accesscontrol";

let grantList = [
    { role: 'Admin', resource: 'profile', action: 'create:any', attributes: '*, !views' },
    { role: 'Admin', resource: 'profile', action: 'read:any', attributes: '*' },
    { role: 'Admin', resource: 'profile', action: 'update:any', attributes: '*, !views' },
    { role: 'Admin', resource: 'profile', action: 'delete:any', attributes: '*' },

    { role: 'User', resource: 'profile', action: 'create:own', attributes: '*, !rating, !views' },
    { role: 'User', resource: 'profile', action: 'read:any', attributes: '*' },
    { role: 'User', resource: 'profile', action: 'update:own', attributes: '*, !rating, !views' },
    { role: 'User', resource: 'profile', action: 'delete:own', attributes: '*' },

    { role: 'Superadmin', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'Superadmin', resource: 'user', action: 'update:any', attributes: '*' },
    { role: 'Superadmin', resource: 'user', action: 'delete:any', attributes: '*' },


];

export const roles = new AccessControl(grantList);