(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['moment'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('moment'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.moment);
  }
}(this, function(moment) {
  'use strict';
  moment.fn.previousDatesByTimespan = function(timespan) {
    const dates = [];
    switch (timespan) {
      case 'weekly':
        {
          const startTime = moment().clone().subtract(1, 'weeks').startOf('day');
          const stopTime = moment().clone().startOf('day');
          while (startTime.diff(stopTime) < 0) {
            dates.push(startTime.clone());
            startTime.add('days', 1);
          }
          return dates;
        }
      case 'monthly':
        {
          const startTime = moment().clone().subtract(1, 'months').startOf('week');
          const stopTime = moment().clone().startOf('week');
          while (startTime.diff(stopTime) < 0) {
            dates.push(startTime.clone());
            startTime.add('week', 1);
          }
          return dates;
        }
      default:
        return dates;
    }
  }
  return moment;
}));
