// https://www.interviewcake.com/question/stock-price
var GetMaxProfit = function(stock_prices_yesterday) {

  if (stock_prices_yesterday.length < 2) {
    throw new Error("need at least 2 prices for this to work");
  }

  var min_price, max_profit, potential_profit;

  min_price = stock_prices_yesterday[0];
  max_profit = stock_prices_yesterday[1] - stock_prices_yesterday[0];

  stock_prices_yesterday.forEach(function(price, index) {

    if (index > 0) { // skip the first step since we inited the vars to those at the top

      potential_profit = price - min_price;

      if (potential_profit > max_profit) {
        max_profit = potential_profit;
      }

      if (price < min_price) {
        min_price = price;
      }

    }

  });

  return max_profit;
};

module.exports = GetMaxProfit;
