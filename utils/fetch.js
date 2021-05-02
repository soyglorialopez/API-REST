'use strict'

const fetch = require('node-fetch');
const baseUrl = 'https://jsonplaceholder.typicode.com';
module.exports = {
  getData: async (url) => {
    try {
      const data = await fetch(`${baseUrl}/${url}`);
      console.log(`${baseUrl}/${url}`)
      return data.json();
    } catch (error) {
      console.error(error)
    };
    
  },
  upsert: async (url, method, body, headers) => {
    try {
      const data = await fetch(`${baseUrl}/${url}`, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
      });
      return data.json();
    } catch (error) {
      console.error(error)
    };
    
  },
  deleteData: async (url, method) => {
    try {
      const data = await fetch(`${baseUrl}/${url}`, {
        method: method    
      });
      return data.json();
    } catch (error) {
      console.error(error)
    };
    
  }
};
