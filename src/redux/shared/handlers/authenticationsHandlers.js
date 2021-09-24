import qs from 'qs';

const authorizedUser = { email: 'correct@email.com', password: 'password' };

const authorized = (email, password) => (
  email === authorizedUser.email && password === authorizedUser.password
);

const authorizedResponse = [
  200, 
  {
    access_token: 'd6cedbcf70a5eaa2004a309ee05757a7a717f68642a1349dfd34f9777866b6c8',
    user: {
      "id": "53a9dc43-4806-44bf-bd4b-6b18c457c88b",
      "created_at": "2021-09-21T08:18:54.252Z",
      "updated_at": "2021-09-21T08:18:54.252Z",
      "name": "Todd Wilkinson",
      "email": "correct@email.com",
      "gender": 0,
      "birthdate": "1984-09-21",
      "height": 212,
      "current_weight": 111.0,
      "goal_weight": 53.0
    }
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

  mock.onPost('/omniauth').reply(async function(config) {
    const token = qs.parse(config.data).omniauth.access_token;

    return token == 'invalidToken'
      ? unauthorizedResponse
      : authorizedResponse;
  });

  mock.onDelete('/auth').reply(async function() {
    return [200]
  });
}

export default authenticationHandlers;
