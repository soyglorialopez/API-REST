'use strict'
const {
    getData,
    upsert,
    deleteData
} = require('../utils/fetch');

class Post {
    constructor() { };
    async getAllPosts(query) {
        let url
        let key = Object.keys(query);
        key[0] == 'postId' ? url = `posts/${query[key]}` : url = `posts?${key[0]}=${query[key]}`
        return await  getData(url) ;
    }

    async getLast(limit) {
         let posts = await getData(`posts`);
        posts.reverse();
        let last = posts.slice(0, limit);
        return last
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
        return await getData(`posts/${id}`);
    }

    async create( body) {
        return await upsert(
            `posts`,
            'POST',
            body,
            { 'Content-type': 'application/json; charset=UTF-8' });
    }

    async upsert( body) {
        return await upsert(
            `posts/${body.id}`,
            'PUT',
            body,
            { 'Content-type': 'application/json; charset=UTF-8' });
    }
    async patch( body) {
        return await upsert(
            `posts/${body.id}`,
            'PATCH',
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

module.exports = Post