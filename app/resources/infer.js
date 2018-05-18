exports = module.exports = function() {
  
  return function(cb) {
    
    process.nextTick(function() {
      cb(null, 'http://www.example.com/');
    });
    
  };
};

exports['@singleton'] = true;
exports['@require'] = [
  './infer'
];