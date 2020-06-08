const router = require('express').Router();
const { Comment } = require('../../models');

// GET comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at']
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        comment.log(err);
        res.status(500).json(err);
    });
});

// POST comments
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); 

// DELETE comments
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(400).json({ message: 'No comment found with this id.' });
                return;
            }
            res.json(dbCommentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;