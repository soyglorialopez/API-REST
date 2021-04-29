'use strict'
const express = require('express');
const router = express.Router();
const {
    getData,
    postData
} = require('../utils/fetch');

router.post('/create', async (req, res) => {
    try {
        const comment = await postData(
            'comments',
            'POST',
            req.body,
            { 'Content-type': 'application/json; charset=UTF-8' });
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});

router.get('/', async (req, res) => {
    try {
        const comment = await getData(`comments`);
        Object.keys(comment) == 0 ?  res.status(400).json({
            msg: "Bad Request"
        }) :  res.status(200).json(comment) 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Error",
            body: error
        })
    };
});

router.get('/:id', async (req, res) => {
    try {
        const comment = await getData(`comments/${req.params.id}`);
        Object.keys(comment) == 0 ?  res.status(400).json({
            msg: "Bad Request"
        }) :  res.status(200).json(comment) 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Error",
            body: error
        })
    };
});

router.delete('/:id', async (req, res) => {
    req.body['id'] = req.params.id;
    try {
        const comment = await deleteData(
            `comments/${req.params.id}`,
            'DELETE'
        );
        res.status(201).json({
            msg: `comment with id ${req.params.id} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error" })
    };
});
module.exports = router