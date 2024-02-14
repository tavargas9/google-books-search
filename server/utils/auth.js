const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    try {
      const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
      console.log('Generated token:', token);
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
      throw error;
    }

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
