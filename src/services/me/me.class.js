/* eslint-disable no-unused-vars */
var steem = require('steem')
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
      let postService = this.options.app.service('post');
      let db = await postService.find({query:
        {author: params.query.author, $limit: 10, $sort: {time: -1}, $skip: parseInt(params.query.skip) * 10}
      })
      if (parseInt(params.query.skip) === 0) {
        let author = await steem.api.getAccountsAsync([params.query.author]);
        author[0].rep = steem.formatter.reputation(author[0].reputation);
        db.user = author;
      }
      return db;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
