const { login } = require('./controller/authController'); // Assuming your auth.js file contains the login function
const User = require('./models/User'); // Mock the User model
const { createTokenUser, attachCookiesToResponse } = jest.fn(); // Mock the helper functions

jest.mock('./models/User'); // Mock the entire User model

// Inside your test cases (explained below)
test('throws error for invalid credentials', async () => {
  const userObject = { username: 'johndoe', password: 'secret' };
  User.findOne.mockReturnValue(userObject);

  // Modify this line to test different password comparison scenarios
  bcrypt.compare.mockReturnValue(false); // Simulate an incorrect password

  const req = { body: { username: 'johndoe', password: 'wrongpassword' } };
  const res = { status: jest.fn(), json: jest.fn() };

  await expect(login(req, res)).rejects.toThrowError(UnauthenticatedError);
  expect(res.status).not.toHaveBeenCalled();
});