'use strict'

const fetch = require('node-fetch');

module.exports = {
  getData: async (url) => {
    try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/${url}`);
      return data.json();
    } catch (error) {
      console.error(error)
    };
    
  },
  upsert: async (url, method, body, headers) => {
    try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/${url}`, {
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
      const data = await fetch(`https://jsonplaceholder.typicode.com/${url}`, {
        method: method    
      });
      return data.json();
    } catch (error) {
      console.error(error)
    };
    
  }
};
