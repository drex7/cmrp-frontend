import {defineAuth} from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: true,
    },
    userAttributes: {
        phoneNumber: {
            mutable: true,
            required: false,
        },
        fullname: {
            required: false,
            mutable: true,
        },
        'custom:region': {
            dataType: "String",
            mutable: true,
        },
        'custom:city': {
            dataType: "String",
            mutable: true,
        },
    }
});
