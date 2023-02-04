// @flow
type UserType = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    roles: string,
    phone?: null | number,
    postalCode?: null | number,
    postalAddress?: null | string,
    streetAddress?: null | string,
    createdAt?: string,
    updatedAt?: string
};

export default UserType;
