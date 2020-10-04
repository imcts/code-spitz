import PieChart from './PieChart.js';

export default {
  name: 'charts-tab',
  components: {
    PieChart
  },
  props: {
    isActive: Boolean
  },
  data() {
    return {
      incomeData: [],
      expensesData: []
    };
  },
  methods: {
    updateCategoryTotals() {
      const { income, expenses } = $store.wasm.getCategoryTotals();
      this.incomeData = income;
      this.expensesData = expenses;
    }
  },
  watch: {
    isActive() {
      this.updateCategoryTotals();
    }
  },
  template: `
    <div class="uk-width-1-1 uk-margin-remove-top">
      <div
        uk-grid
        class="uk-child-width-1-2 uk-padding uk-padding-remove-top"
      >
        <div>
          <pie-chart title="Income" :chartData="incomeData">
          </pie-chart>
        </div>
        <div>
          <pie-chart title="Expenses" :chartData="expensesData">
          </pie-chart>
        </div>
      </div>
    </div>
  `
};
