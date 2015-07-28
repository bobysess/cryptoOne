  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var multer = require('multer'); 
  var usersRouter=require('./routes/users');
  var signaturesRouter=require('./routes/signatures');
  var documentsRouter=require('./routes/documents');
  var groupsRouter=require('./routes/groups');
  var secretkeysRouter=require('./routes/secret_keys');
  var sharedDocumentsRouter=require('./routes/shared_documents');
  var menbershipsRouter=require('./routes/menberships');
  var indexRouter = require('./routes/index');
 


  
  // configuration
  app.use(express.static('public'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(multer()); // for parsing multipart/form-data
  app.use('/users', usersRouter);
  app.use('/signatures', signaturesRouter);
  app.use('/documents', documentsRouter);
  app.use('/groups', groupsRouter);
  app.use('/secret_keys', secretkeysRouter);
  app.use('/shared_documents', sharedDocumentsRouter);
  app.use('/menberships', menbershipsRouter);
  app.use('/', indexRouter);


  var server = app.listen(3001, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
