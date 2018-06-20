// mods-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const mods = new Schema({
    steem: String,
    banned: {type: Boolean, default: false},
    votes: {type: Number, default: 0}
  }, {
    timestamps: true
  });

  return mongooseClient.model('mods', mods);
};
