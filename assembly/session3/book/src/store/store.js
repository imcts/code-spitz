import {
  apiFetchTransactions,
  apiAddTransaction,
  apiEditTransaction,
  apiRemoveTransaction
} from './api.js';
import WasmTransactions from './WasmTransactions.js';

export const store = {
  wasm: null,
  state: {
    transactions: [],
    activeTransactionId: 0,
    balances: {
      initialRaw: 0,
      currentRaw: 0,
      initialCooked: 0,
      currentCooked: 0
    }
  },

  getCategories() {
    const categories = this.state.transactions.map(
      ({ category }) => category
    );
    return _.uniq(categories).sort();
  },

  populateTransactions(transactions) {
    const sortedTransactions = _.sortBy(transactions, [
      'transactionDate',
      'id'
    ]);
    this.state.transactions = sortedTransactions;
    store.wasm.populateInWasm(sortedTransactions, this.getCategories());
    this.recalculateBalances();
  },
  
  recalculateBalances() {
    const { initialRaw, initialCooked } = this.state.balances;
    const { currentRaw, currentCooked } = this.wasm.getCurrentBalances(
      initialRaw,
      initialCooked
    );
    this.state.balances = {
      initialRaw,
      currentRaw,
      initialCooked,
      currentCooked
    };
  },

  addTransaction(newTransaction) {
    newTransaction.id = _.maxBy(this.state.transactions, 'id').id + 1;
    store.wasm.addToWasm(newTransaction);
    apiAddTransaction(newTransaction).then(() => {
      this.state.transactions.push(newTransaction);
      this.hideTransactionModal();
    });
  },

  editTransaction(editedTransaction) {
    store.wasm.editInWasm(editedTransaction);
    apiEditTransaction(editedTransaction).then(() => {
      this.state.transactions = this.state.transactions.map(
        transaction => {
          if (transaction.id === editedTransaction.id) {
            return editedTransaction;
          }
          return transaction;
        }
      );
      this.hideTransactionModal();
    });
  },

  removeTransaction(transaction) {
    const transactionId = transaction.id;
    store.wasm.removeFromWasm(transactionId);

    // We're passing the whole transaction record into the API call
    // for the sake of consistency:
    apiRemoveTransaction(transaction).then(() => {
      this.state.transactions = this.state.transactions.filter(
        ({ id }) => id !== transactionId
      );
      this.hideTransactionModal();
    });
  },

  showTransactionModal(transactionId) {
    this.state.activeTransactionId = transactionId || 0;
    const transactModal = document.querySelector('#transactionModal');
    UIkit.modal(transactModal).show();
  },

  hideTransactionModal() {
    this.state.activeTransactionId = 0;
    const transactModal = document.querySelector('#transactionModal');
    UIkit.modal(transactModal).hide();
  },

  getActiveTransaction() {
    const { transactions, activeTransactionId } = this.state;
    const foundTransaction = transactions.find(transaction =>
      transaction.id === activeTransactionId);
    return foundTransaction || { id: 0 };
  },

  updateInitialBalance(amount, fieldName) {
    this.state.balances[fieldName] = amount;
  }
};

export const initializeStore = async () => {
  const wasmTransactions = new WasmTransactions();
  store.wasm = await wasmTransactions.initialize();
  const transactions = await apiFetchTransactions();
  store.populateTransactions(transactions);
};
