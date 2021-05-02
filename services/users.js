'use strict'
const {
    getData,
    upsert,
    deleteData
} = require('../utils/fetch');

class User {
    constructor() { };
    async getAllUsers(query) {
        let key = Object.keys(query);
        return await getData(`users?${key[0]}=${query[key]}`);
    }

    async getPosts(query) {
        return await getData(`posts?userId=${query}`);
    }

    async getComments(query) {
        return await getData(`comments?email=${query}`);
    }

    async getSpecificUser(query, id) {
        let keys = Object.keys(query) 
        if (keys[0]) {
            let queries = [];
            let url, data
            for (const q in  query) {
                q != 'comments' ? url = `${q}?userId=${id}` : url = `${q}?email=${query[q]}`
                data = await getData(url);
                  queries.push(data);
            };
            return queries
        }
        return await getData(`users/${id}`);
    }

    async create( body) {
        return await upsert(
            `users`,
            'POST',
            body,
            { 'Content-type': 'application/json; charset=UTF-8' });
    }

    async upsert( body) {
        return await upsert(
            `users/${body.id}`,
            'PUT',
            body,
            { 'Content-type': 'application/json; charset=UTF-8' });
    }

    async delete( id) {
        return await deleteData(
            `users/${id}`,
            'DELETE',
            { 'Content-type': 'application/json; charset=UTF-8' });
    }
  
}

module.exports = User