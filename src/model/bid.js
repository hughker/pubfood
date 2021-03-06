/**
 * pubfood
 */

'use strict';

var util = require('../util');
var PubfoodObject = require('../pubfoodobject');

/**
 * Bid is the result of a partner [BidProvider]{@link pubfood/provider.BidProvider} request.
 *
 * @class
 * @param {string|number} value the bid value. Default: empty string.
 * @memberof pubfood#model
 */
function Bid(value) {
  if (this.init_) {
    this.init_();
  }
  /** @property {Array.<number, number>} [sizes] the dimension sizes of the slot bid */
  this.sizes =  [];
  /** @property {string} [slot] the slot name */
  this.slot;
  /** @property {string|number} value the bid value. Default: empty string */
  this.value = util.asType(value) === 'undefined' ? '' : value;
  /** @property {string} type derived bid value type: from {@link util.asType}  */
  this.type = util.asType(this.value);
  /** @property {string} [label] optional label for adserver key targeting for bid value e.g. <code>label=2.00</code> */
  this.label;
  /** @property {string} [provider] the bid provider name */
  this.provider;
  /** @property {object} [targeting] ad server targeting key/values in addition to the bid value */
  this.targeting = {};
}

/**
 * Create a new [Bid]{@link pubfood#model.Bid} from an object.
 *
 * @param {BidObject} config bid object literal
 * @returns {pubfood#model.Bid|null} instance of [Bid]{@link pubfood#model.Bid}
 * @private
 */
Bid.fromObject = function(config) {
  var b = new Bid(), o = util.clone(config);
  for (var k in o) {
    b[k] = o[k];
  }
  var vType = util.asType(b.value);
  b.type = vType !== 'undefined' ? vType : '';
  return b;
};

/**
 * Sets the bid's value
 * @param {string|number} v the bid value for the ad server key/value targeting
 * @return {pubfood#model.Bid}
 */
Bid.prototype.setValue = function(v) {
  this.value = util.asType(v) === 'undefined' ? '' : v;
  this.type = util.asType(this.value);
  return this;
};

/**
 * Sets the bid's slot size
 *
 * @todo maybe combine with Bid.prototype.dimensions
 *
 * @param {string|number} w
 * @param {string|number} h
 * @return {pubfood#model.Bid}
 */
Bid.prototype.addSize = function(w, h) {
  var width = Math.abs(~~w);
  var height = Math.abs(~~h);

  this.sizes.push([width, height]);
  return this;
};

util.extends(Bid, PubfoodObject);
module.exports = Bid;
