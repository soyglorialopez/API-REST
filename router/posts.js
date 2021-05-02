'use strict'
const express = require('express');
const router = express.Router();
const response = require('../utils/response');
const service = require('../services/posts');
const postsService = new service() 


router.get('/', async (req, res) => {
   
    try {
        const posts = await postsService.getAllPosts(req.query);
        Object.keys(posts) == 0 ? response(res, '', 200, "there aren't posts",'') : response(res, '', 200, '', posts);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.get('/last/:limit', async (req, res) => {
    try {
        const posts = await postsService.getAllPosts(req.params.limit);
        response(res, '', 200, '', posts);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.post('/create', async (req, res) => {
    try {
        const post = await postsService.create(req.body)
        response(res, '', 201, '', post);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.put('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const post = await postsService.upsert(req.body)
            response(res, '', 200, '', post);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.patch('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const post = await postsService.patch(req.body);
        response(res, '', 200, '', post);

    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.delete('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const posts = await postsService.delete(req.params.id);
        response(res, '', 200,  `post with id ${req.params.id} was removed,`, '');
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});


module.exports = router