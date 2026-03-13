import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const authMiddleware = (request, response, next) => {
  //console.log(request.headers);
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authToken.split(' ')[1];

  try {
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw Error();
      }

      request.userID = decoded.id;
      request.userIsAdmin = decoded.admin;
      request.userName = decoded.name;
    });
  } catch (_err) {
    return response.status(401).json({ error: 'Token is invalid' });
  }

  return next();
};

export default authMiddleware;
