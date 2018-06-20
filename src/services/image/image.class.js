/* eslint-disable no-unused-vars */
var {getFile} = require('@memeit.lol/images');
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    if(params.query.type === 'image') {
      return getFile('/media/' + params.query.filename);
    } else if(params.query.type === 'stickers') {
      return getFile('/media/Stickers/' + params.query.category + '/' + params.query.filename);
    } else {
      return [];
    }
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
