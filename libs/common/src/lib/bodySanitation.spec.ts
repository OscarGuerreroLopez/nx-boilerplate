import { SanitiseBody } from './bodySanitation';

describe('body sanitation test', () => {
  it('Should sanitaize the object', () => {
    const unsanitisedBody = {
      name: 'a name',
      lname: 'Smith',
      password: 'apassword',
      email: 'bla@gmail.com',
    };

    const result = SanitiseBody(unsanitisedBody);

    expect(result).toStrictEqual({
      name: 'a name',
      lname: '********',
      password: '********',
      email: 'bl*@*.com',
    });
  });

  it('Should sanitaize nested objects', () => {
    const unsanitisedBody = {
      name: 'Aname',
      data: {
        name: 'a name',
        lname: 'Smith',
        password: 'apassword',
        email: 'bla@gmail.com',
      },
    };
    const result = SanitiseBody(unsanitisedBody);

    expect(result).toStrictEqual({
      name: 'Aname',
      data: {
        name: 'a name',
        lname: '********',
        password: '********',
        email: 'bl*@*.com',
      },
    });
  });
});
('********');
