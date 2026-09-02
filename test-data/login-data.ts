export const loginTestData = [
  {
    testName: 'valid credentials',
    username: 'standard_user',
    password: 'secret_sauce',
    shouldLogin: true,
    expectedError: '',
  },
  {
    testName: 'invalid username',
    username: 'invalid_user',
    password: 'secret_sauce',
    shouldLogin: false,
    expectedError:
      'Username and password do not match any user in this service',
  },
  {
    testName: 'invalid password',
    username: 'standard_user',
    password: 'invalid_password',
    shouldLogin: false,
    expectedError:
      'Username and password do not match any user in this service',
  },
];