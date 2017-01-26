exports = module.exports = function(issueCb) {
  var oauth2orize = require('oauth2orize');
  
  // TODO: Make modes pluggable
  return oauth2orize.grant.token({
    modes: {
      //form_post: require('oauth2orize-fprm'),
      web_message: require('oauth2orize-wmrm'),
      idpiframe: require('oauth2orize-idpiframerm')
    }
  }, issueCb);
};

exports['@implements'] = 'http://schema.modulate.io/js/aaa/oauth2/Response';
exports['@type'] = 'token';
exports['@require'] = [ './token/issuecb' ];