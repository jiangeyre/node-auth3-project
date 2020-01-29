const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, onlyDept('design'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function onlyDept(department) {
  return function(req, res, next) {
    if(req.user && req.user.department && req.user.department.toLowerCase() === department) {
      next();
    } else {
      res.status(403).json({ error: 'Nope, access denied.' })    
    }
  }
}

module.exports = router;
