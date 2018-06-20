/* eslint-disable no-unused-vars */
var steem = require('steem')
var {stickers, images} = require('@memeit.lol/images')
var { getWeights } = require('./info.helper')
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async getReplies (author, permlink) {
    let replies = await steem.api.getContentRepliesAsync(author, permlink);
    await Promise.all(replies.map(async function (r) {
      let user = await steem.api.getAccountsAsync([r.author]);
      r.info = user[0];
      if (r.children === 0) {
        return r;
      } else {
        r.replies = await this.getReplies(r.author, r.permlink)
      }
    }.bind(this)))
    return replies;
  }

  async find (params) {
    if (params.query.type === 'post') {
      let postService = this.options.app.service('post');
      let db = await postService.find({query:
        {author: params.query.author, permlink: params.query.permlink}
      })
      let post = await steem.api.getContentAsync(params.query.author, params.query.permlink);
      let author = await steem.api.getAccountsAsync([params.query.author]);
      author[0].rep = steem.formatter.reputation(author[0].reputation);
      post.info = author[0];
      if(db.data.length !== 0) post.db = db.data[0];
      return post;
    } else if (params.query.type === 'user') {
      let user = await steem.api.getAccountsAsync([params.query.author]);
      user[0].rep = steem.formatter.reputation(user[0].reputation);
      return user;
    } else if (params.query.type === 'comments') {
      let replies = await this.getReplies(params.query.author, params.query.permlink);
      return replies;
    } else if (params.query.type === 'images') {
      return images;
    } else if (params.query.type === 'stickers') {
      return stickers;
    } else if (params.query.type === 'delegators') {
      return await getWeights('memeit.lol', this.options.app.service('mods'))
    } else return [];
  }

  async get (id, params) {
    return {

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
