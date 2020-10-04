import initializeWasm from './initializeWasm.js';

export default class WasmTransactions {
  constructor() {
    this.instance = null;
    this.categories = [];
  }

  async initialize() {
    this.instance = await initializeWasm();
    return this;
  }
  
  getValidAmounts(transaction) {
    const { rawAmount, cookedAmount, type } = transaction;
    const getAmount = amount =>
      type === 'Withdrawal' ? -Math.abs(amount) : amount;
    return {
      validRaw: getAmount(rawAmount),
      validCooked: getAmount(cookedAmount)
    };
  }

  editInWasm(transaction) {
    const { id, category } = transaction;
    const { validRaw, validCooked } = this.getValidAmounts(transaction);
    const categoryId = this.getCategoryId(category);
    this.instance._editTransaction(id, categoryId, validRaw, validCooked);
  }

  removeFromWasm(transactionId) {
    this.instance._removeTransaction(transactionId);
  }

  populateInWasm(transactions, categories) {
    this.categories = categories;
    transactions.forEach(transaction => this.addToWasm(transaction));
  }
  
  addToWasm(transaction) {
    const { id, category } = transaction;
    const { validRaw, validCooked } = this.getValidAmounts(transaction);
    const categoryId = this.getCategoryId(category);
    this.instance._addTransaction(id, categoryId, validRaw, validCooked);
  }
  
  getCategoryId(category) {
    return this.categories.indexOf(category);
  }
  
  getCurrentBalances(initialRaw, initialCooked) {
    const currentRaw = this.instance._getFinalBalanceForType(
      AMOUNT_TYPE.raw,
      initialRaw
    );
    const currentCooked = this.instance._getFinalBalanceForType(
      AMOUNT_TYPE.cooked,
      initialCooked
    );
    return { currentRaw, currentCooked };
  }
  
  getCategoryTotals() {
    this.instance._recalculateForCategories();
    const categoryTotals = this.categories.map((category, idx) => ({
      category,
      id: idx,
      rawTotal: this.instance._getCategoryTotal(AMOUNT_TYPE.raw, idx),
      cookedTotal: this.instance._getCategoryTotal(AMOUNT_TYPE.cooked, idx)
    }));
    const totalsByGroup = { income: [], expenses: [] };
    categoryTotals.forEach(categoryTotal => {
      if (categoryTotal.rawTotal < 0) {
        totalsByGroup.expenses.push(categoryTotal);
      } else {
        totalsByGroup.income.push(categoryTotal);
      }
    });
    return totalsByGroup;
  }
}
