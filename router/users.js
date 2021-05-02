'use strict'
const express = require('express');
const { authToken, auth } = require('../middleware/auth');

const router = express.Router();
const response = require('../utils/response');
const service = require('../services/users');
const userService = new service() 


router.get('/', async (req, res) => {
  
    try {
        const users = await userService.getAllUsers(req.query);
        response(res, '', 200, '', users);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.get('/createdPosts', async (req, res) => {
    try {
        const users = await userService.getPosts(req.query.userId);
        response(res, '', 200, '', users);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.get('/createdComments', async (req, res) => {
    try {
        const comments = await userService.getComments(req.query.email);
        response(res, '', 200, '', comments);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.get('/:id', auth(), async (req, res) => {
    try {
        const users = await userService.getSpecificUser(req.query, req.params.id);
        Object.keys(users[0]) == 0 ? response(res, '', 400, `id ${req.params.id} doesn't exist`, '') : response(res, '', 200, '', users);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.post('/create/', async (req, res) => {
    try {
        const user = await userService.create(req.body)
            return response(res, '', 201, '', user);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.post('/signIn', async (req, res) => {
    try {
        let token = await authToken(req.body, res);
        return response(res, '', 200, '', token);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.put('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const user = await userService.upsert( req.body);
            return response(res, '', 200, '', user);
       
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});

router.delete('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const user = await userService.delete(req.params.id);
        return response(res, '', 200, `deleted user with id ${req.params.id}`, user);
    } catch (error) {
        console.error(error);
        response(res, error, 500, "Internal Server Error", '');
    };
});


module.exports = router