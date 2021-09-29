const { Router } = require('express');
const { signin, renderDashboard } = require('../controllers/auth.controllers');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

router.post('/SignIn', signin);
router.get('/dashboard', [
    validateJwt
], renderDashboard);


module.exports = router;