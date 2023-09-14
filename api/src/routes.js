const { Router } = require('express');
const router = Router();

const ContactController = require('./app/controllers/ContactController');


router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);
router.delete('/contacts/:id', ContactController.delete);
module.exports = router;

// app.post('/', (req, res) => { })
// app.create('/', (req, res) => { })
// app.delete('/', (req, res) => { })
