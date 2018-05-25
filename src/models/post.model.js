module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const post = new Schema({
    title: String,
    author: String,
    permlink: String,
    voted: {type: Boolean, default: false},
    hidden: {type: Boolean, default: true},
    score: {type: Number, default: 0},
    votes: [{
      mod: String,
      approved: Number,
      time: {type: Date, default: Date.now}
    }],
    img: String,
    time: {type: Date, default: Date.now}
  });
  return mongooseClient.model('post', post);
};
