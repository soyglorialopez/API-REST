'use strict'
const {
    getData,
    upsert,
    deleteData
} = require('../utils/fetch');

class Comment {
    constructor() { };
    async getAllComments() {
        return await  getData(`comments`) ;
    }

    async getSpecificComment(id) {
        return await getData(`comments/${id}`);
    }

    async create( body) {
        return await upsert(
            `comments`,
            'POST',
            body,
            { 'Content-type': 'application/json; charset=UTF-8' });
    }

    async delete( id) {
        return await deleteData(
            `comments/${id}`,
            'DELETE',
            { 'Content-type': 'application/json; charset=UTF-8' });
    }
  
}

module.exports = Comment