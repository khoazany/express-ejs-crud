// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

ArticleSchema.virtual('author')
	.get(function(){
		return "Pham Minh Khoa";
	});

mongoose.model('Article', ArticleSchema);

