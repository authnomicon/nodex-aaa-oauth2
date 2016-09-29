exports = module.exports = function(acs) {
  
  return function issueCode(client, redirectURI, user, ares, areq, locals, cb) {
    var bound = {
      client: client,
      redirectURI: redirectURI,
      user: user,
      // TODO
      //service: locals.service,
      //grant: locals.grant,
      //scope: ares.scope
    };
    
    // TODO: Ensure that code has a TTL of 10 minutes
    acs.set(bound, function(err, code) {
      if (err) { return cb(err); }
      return cb(null, code);
    });
  };
};

exports['@implements'] = 'http://schema.modulate.io/js/aaa/oauth2/issueCodeFunc';
exports['@require'] = [ 'http://schemas.modulate.io/js/aaa/oauth2/ACS' ];
