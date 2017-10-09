/**
 * https://www.interviewcake.com/question/stock-price
 *
 * Suppose we could access yesterday's stock prices as an array, where:
 *
 * The indices are the time in minutes past trade opening time, which was 9:30am local time.
 * The values are the price in dollars of Apple stock at that time.
 * So if the stock cost $500 at 10:30am, stockPricesYesterday[60] = 500.
 *
 * Write an efficient function that takes stockPricesYesterday and returns the best profit I could have made from 1 purchase and 1 sale of 1 [company] stock yesterday.
 *
 * @param {number[]} stockPricesYesterday array of stock prices
 * @returns {number} max profit
 */
function GetMaxProfit(stockPricesYesterday) {
  if (stockPricesYesterday.length < 2) {
    throw new Error('need at least 2 prices for this to work');
  }

  let minPrice = stockPricesYesterday[0];
  let maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

  stockPricesYesterday.forEach((price) => {
    const potentialProfit = price - minPrice;

    maxProfit = Math.max(maxProfit, potentialProfit);

    minPrice = Math.min(minPrice, price);
  });

  return maxProfit;
}

export default GetMaxProfit;
