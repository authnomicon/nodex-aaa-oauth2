exports = module.exports = function(server, processTransaction, completeTransaction, prompt, errorLogging) {

  return [
    server.resume(
      processTransaction,
      completeTransaction
    ),
    //prompt(),
  ];
};

exports['@require'] = [
  '../../../server',
  '../../handlers/authorize/processtransaction',
  '../../handlers/authorize/completetransaction',
  '../../middleware/prompt',
  'http://i.bixbyjs.org/http/middleware/errorLogging'
];
