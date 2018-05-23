exports = module.exports = function(IoC, tokens, logger) {
  var Tokens = require('tokens').Tokens;
  
  
  var itokens = new Tokens();
  
  return Promise.resolve(itokens)
    .then(function(itokens) {
      var components = IoC.components('http://schemas.authnomicon.org/js/http/oauth2/tokens/authorization-code/Schema');
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(schemas) {
          schemas.forEach(function(schema, i) {
            var type = components[i].a['@type'];
            logger.info('Loaded OAuth 2.0 authorization code schema: ' + type);
            itokens.schema(type, schema);
          });
        })
        .then(function() {
          return itokens;
        });
    })
    .then(function(itokens) {
      var api = {};
      
      api.encode = function(type, msg, to, cb) {
        console.log('ENCODE AUTHORIZATION CODE TOKEN!');
        console.log(msg);
        console.log(to)
        
        var encoder;
        try {
          encoder = itokens.createEncoder(type);
        } catch (ex) {
          return cb(ex);
        }
        
        encoder.encode(msg, function(err, claims) {
          console.log(err);
          console.log(claims);
          
          if (err) { return cb(err); }
          tokens.seal(claims, to, null, function(err, token) {
            console.log('I SEALED!');
            console.log(err);
            console.log(token);
            
            if (err) { return cb(err); }
            return cb(null, token);
          });
        });
      };
      
      api.decode = function(token, cb) {
        console.log('DECODE!');
        //console.log(type);
        console.log(token);
        
        tokens.unseal(token, function(err, claims) {
          console.log('UNSEALED?');
          console.log(err);
          console.log(claims);
          
          
          var decoder;
          try {
            decoder = itokens.createDecoder();
          } catch (ex) {
            return cb(ex);
          }
          
          decoder.decode(claims, function(err, msg) {
            if (err) { return cb(err); }
            return cb(null, msg);
            
          });
        });
      };
      
      return api;
    });
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/http/oauth2/tokens/authorization-code';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/tokens',
  'http://i.bixbyjs.org/Logger'
];