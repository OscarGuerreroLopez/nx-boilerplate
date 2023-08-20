import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

describe('POST /user', () => {
  let token;
  it('should create a new user', async () => {
    const userData = {
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar@oscar.com',
      password: 'AAbbc123@',
    };

    const response = await axios.post(`${BASE_URL}/user`, userData, {});

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ result: true });
  });

  it('should return 400 for invalid user data', async () => {
    const invalidUserData = {
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar@oscar.com',
      password: 'Abc', // Invalid password
    };

    try {
      await axios.post(`${BASE_URL}/user`, invalidUserData);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toEqual('Wrong params, check logs');
    }
  });
  it('should login a user', async () => {
    const userData = {
      email: 'oscar@oscar.com',
      password: 'AAbbc123@',
    };

    const response = await axios.post(`${BASE_URL}/user/login`, userData);

    expect(response.status).toBe(200);
    token = response.data.token;
  });

  it('should get the new new user', async () => {
    const response = await axios.get(`${BASE_URL}/user?email=oscar@oscar.com`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);

    expect(response.data.result.email).toEqual('oscar@oscar.com');
    expect(response.data.result.role).toEqual('Guess');
    expect(response.data.result.status).toEqual('active');
  });

  it('should fail if user tries to access admin route', async () => {
    try {
      await axios.get(`${BASE_URL}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toEqual('Not Authorized');
    }
  });

  it('should fail if user tries add extra params to create route', async () => {
    try {
      const userData = {
        fname: 'Oscar',
        lname: 'Lopez',
        email: 'oscar@oscar.com',
        password: 'AAbbc123@',
        extraField: 'should reject this',
      };

      await axios.post(`${BASE_URL}/user`, userData, {});
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toEqual('Wrong params, check logs');
    }
  });
});
