const PersonController = require('../controllers/person.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api',  PersonController.index);
    app.post('/api/people', authenticate, PersonController.createPerson);     
    app.get('/api/people',  PersonController.getAllPeople); 
    app.get('/api/people/:id', PersonController.getPerson);
    app.put('/api/people/:id',  authenticate, PersonController.updatePerson);
    app.delete('/api/people/:id',  authenticate, PersonController.deletePerson);
}