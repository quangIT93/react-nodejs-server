const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewave/auth');

const postController = require('../Controllers/PostController');

router.get('/', verifyToken, postController.getItem);
router.post('/', verifyToken, postController.postItem);
router.put('/:id', verifyToken, postController.updateItem);
router.delete('/:id', verifyToken, postController.deleteItem);

module.exports = router;
