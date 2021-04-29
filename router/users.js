'use strict'
const express = require('express');
const { authToken } = require('../auth');
const router = express.Router();
const auth = require('../auth');
const {
    getData,
    upsert,
    deleteData
} = require('../utils/fetch');


router.get('/', async (req, res) => {
    try {
        const users = await getData('users');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.get('/createdPosts', async (req, res) => {
    try {
        const users = await getData(`posts?userId=${req.query.userId}`);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.get('/createdComments', async (req, res) => {
    try {
        const users = await getData(`comments?email=${req.query.email}`);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.get('/createdAlbums', async (req, res) => {
    try {
        const users = await getData(`albums?userId=${req.query.userId}`);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.get('/:id', async (req, res) => {
    if (req.query) {
        let queries = [];
        let url
        for (const query in req.query) {
            query != 'comments' ? url =`${query}?userId=${req.params.id}` : url = `${query}?email=${req.query[query]}`
            try {
                let data = await getData(url)
                queries.push(data);
            } catch (error) {
                console.error(error);
            };
        };
       return res.status(200).json(queries)
    };
    try {
        const users = await getData(`users/${req.params.id}`);
        Object.keys(users) == 0 ? res.status(400).json({
            msg: `id ${req.params.id} doesn't exist`
        }) : res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: "Internal Error",
            body: error
        });
    };
});

router.post('/create/', async (req, res) => {
    try {
        const user = await upsert(
            'users',
            'POST',
            req.body,
            { 'Content-type': 'application/json; charset=UTF-8' });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.post('/signIn',  async (req, res) => {
    try {
        let token = await authToken(req.body);
        console.log(token)
    } catch (error) {
        // console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.put('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const user = await upsert(
            `users/${req.params.id}`,
            'PUT',
            req.body,
            { 'Content-type': 'application/json; charset=UTF-8' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" });
    };
});

router.delete('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const user = await deleteData(
            `users/${req.params.id}`,
            'DELETE'
        );
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});


module.exports = router