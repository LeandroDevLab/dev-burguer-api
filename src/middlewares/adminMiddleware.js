const adminMiddleware = (request, response, next) => {
  //console.log(request.headers);
  const IsUserAdmin = request.userIsAdmin;

  if (!IsUserAdmin) {
    return response.status(401).json({ error: 'Contact the support' });
  }

  return next();
};

export default adminMiddleware;
