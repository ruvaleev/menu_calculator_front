import qs from 'qs';

const authorizedUser = { email: 'correct@email.com', password: 'password' };

const authorized = (email, password) => (
  email === authorizedUser.email && password === authorizedUser.password
);

const authorizedResponse = [
  200, 
  {
    access_token: 'd6cedbcf70a5eaa2004a309ee05757a7a717f68642a1349dfd34f9777866b6c8'
  }
]
const unauthorizedResponse = [401, { code: 'unauthorized' }]

const authenticationHandlers = function(mock) {
  mock.onPost('/auth').reply(async function(config) {
    const { email, password } = qs.parse(config.data).user;

    const response = authorized(email, password)
      ? authorizedResponse
      : unauthorizedResponse;

    return response
  });

  mock.onDelete('/auth').reply(async function() {
    return [200]
  });
}

export default authenticationHandlers;
