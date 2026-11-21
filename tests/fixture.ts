import { test as base } from '@playwright/test';
import { userInfo } from 'node:os';

type MyFixtures = {
    hello: any;
    world: any;
};

export const test = base.extend<MyFixtures>({

    hello: async ({ }, use: any) => {
        console.log('Hello from fixture - Before Use');
        const myMessage = 'This is a message from the fixture';
        await use(myMessage);
        console.log('Hello from fixture - After Use');
    },

    world: async ({ hello }: { hello: any }, use: any) => {
        const { username } = userInfo();
        console.log("Hello " + username + " " + hello);
        await use(username);

    }
})