exports = module.exports = function(/*prompt,*/ resume, /*exit*/ /*, yieldLogin */ /*, yieldConsent*/) {
  
  /*
  return {
    resume: prompt,
    exit: exit,
    yields: {
      'login': yieldLogin
    }
  };
  */
  
  return {
    //prompt: prompt,
    resume: resume,
    //exit: exit,
    //yields: {
    //  'login': yieldLogin
    //}
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt2';
exports['@name'] = '/oauth2/authorize';
exports['@require'] = [
  //'./authorize/prompt',
  './authorize/resume',
  //'./authorize/exit',
  //'./authorize/yield/login',
  //'./authorize/yield/consent'
];
