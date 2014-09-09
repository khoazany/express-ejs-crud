var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var article = new Article({ 
    title: 'Zildjian',
    url: 'http://www.google.com',
    text: 'This is love'
  });

/*  
  article.save(function (err) {
  if (err) return next(err);
    console.log('meow');
  });
*/

Article.find(function (err, articles) {
  if (err) return next(err);
  res.format({
    html: function () {
      res.render('index', {
        title: 'Test App',
        articles: articles
      });
    },
    json: function () {
      res.json({ title: 'Test App'});
    },
    default: function () {
        /*
        res.send(406, 'Not Acceptable');
        */
      }
    });
});
});

router.get('/haha', function (req, res, next) {
  res.render('haha', {
    lover: 'LOL'
  });
});

// List
router.get('/articles', function (req, res, next) {
  Article.find(function (err,articles) {
    if (err) return next(err);
    res.send(articles.map(function (article) {
      return article._doc;
    }));
  });
});

// Add form
router.get('/article/add', function (req, res, next) {
  res.render('add-article',{title: 'Add new article'});
});

// Add a new article action
router.post('/article/action/add', function (req, res, next) {
  var article = new Article({
    title: req.body.title,
    url: req.body.url,
    text: req.body.text
  });

  article.save( function (err) {
    if (err) return next(err);
  });

  return res.redirect('/');
});

// Edit form
router.get('/article/update/:id', function (req, res, next) {
  Article.findById(req.params.id, function (err, article) {
    res.render('update-article',{
      title: 'Update article',
      article: article
    });
  });
  });

// Edit a new article action
router.put('/article/action/update/:id', function (req, res, next) {
  Article.findById(req.params.id, function (err, article) {
    article.title = req.body.title;
    article.url = req.body.url;
    article.text = req.body.text;

    article.save( function (err) {
      if (err) return next(err);
    });

    return res.send(article);
  });
});

router.delete('/article/delete/:id', function (req, res, next) {
  Article.findById(req.params.id, function (err, article) {
      return article.remove(function(err) {
        if(err){
          return next(err);
        } else {
          return res.send("");
        }
      });
  });
});
