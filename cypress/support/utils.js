import {faker} from '@faker-js/faker';

export function createRandomUser() {
    return {
        uuserId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

export function createRandomUserEmail() {
    return {
        uuserId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}
