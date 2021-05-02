'use strict'
const express = require('express');
const router = express.Router();
const response = require('../utils/response');
const service = require('../services/comments');
const commentsService = new service() 


router.post('/create', async (req, res) => {
    try {
        const comment = await commentsService.create(req.body)
            response(res, '', 201, '', comment);
    } catch (error) {
        console.error(error);
         response(res, error, 500, "Internal Server Error", '');
    };
});

router.get('/', async (req, res) => {
    try {
        const comments = await commentsService.getAllComments();
         response(res, '', 200, '', comments);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await commentsService.getSpecificComment(req.params.id);
       response(res, '', 200, '', comment);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.delete('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const comment = await commentsService.delete(req.params.id);
        response(res, '', 200,  `comment with id ${req.params.id} deleted`, '');
    } catch (error) {
        console.error(error);
         response(res, error, 500, "Internal Server Error", '');
    };
});
module.exports = router