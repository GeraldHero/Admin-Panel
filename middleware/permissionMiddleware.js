export const checkPermission = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ msg: 'Not authorized!' });
  }
  return next();
};

export const checkParamsIdPermission = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  if (!req.user.isAdmin || req.user._id === req.params.id)
    throw new Error('Not authorized');

  return next();
};
