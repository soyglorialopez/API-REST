'use strict'
const express = require('express');
const router = express.Router();
const {
    getData,
    upsert,
   deleteData
} = require('../utils/fetch');

router.get('/', async (req, res) => {
    try {
        const post = await getData(`posts`);
        Object.keys(post) == 0 ?  res.status(200).json({
            msg: "there aren't posts"
        }) :  res.status(200).json(posts) 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Error",
            body: error
        })
    };
});

router.get('/last/:limit', async (req, res) => {
    try {        
        const posts = await getData(`posts`);
        posts.reverse();
       let last = posts.slice(0, req.params.limit)
        res.status(200).json(last) 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Error",
            body: error
        })
    };
});

router.post('/create', async (req, res) => {
    try {
        const post = await upsert(
            'posts',
            'POST',
            req.body,
            { 'Content-type': 'application/json; charset=UTF-8' });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.put('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const post = await upsert(
            `posts/${req.params.id}`,
            'PUT',
            req.body,
            { 'Content-type': 'application/json; charset=UTF-8' });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.patch('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const post = await upsert(
            `posts/${req.params.id}`,
            'PATCH',
            req.body,
            { 'Content-type': 'application/json; charset=UTF-8' });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.delete('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const posts = await deleteData(
            `posts/${req.params.id}`,
            'DELETE'
        );
        res.status(201).json({
            msg: `post with id ${req.params.id} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});


module.exports = router