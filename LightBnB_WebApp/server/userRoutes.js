const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('PAssed!');
        return user;
      }
      console.log('Failed!!!');
      return null;
    });
  }
  exports.login = login;

  const addReservation = (propertyId, startDate, endDate, userId) => {
    return database.addReservation(propertyId, startDate, endDate, userId)
      .then(reserve => reserve)
      .catch(err => 'An error happened' +  err);
  };
  

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });
  
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.post('/reserve', (req, res) => {
    console.log('FROM /reserve route!', req.body);
    const {propertyId, startDate, endDate, userId} = req.body;
    addReservation(propertyId, startDate, endDate, userId)
      .then(book => res.send(book))
      .catch(e => res.send(e));
  });

  // router.post('/reserve', (req, res) => {
  //   req.session.userId = null;
  //   res.send({});
  // });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
    
        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });

  return router;
}