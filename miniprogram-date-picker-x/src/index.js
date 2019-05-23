Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'startDate' // 多组件切换配置 => 指定
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    years: [],
    months: [],
    days: [],
    tempYearPos: [0],
    tempMonthPos: [0],
    tempDayPos: [0]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initDate () {
      // 初始化年月日
      var date = new Date();
      var years = [];
      var months = [];
      var days = [];
      for (let i = 2016; i <= date.getFullYear(); i++) {
        years.push(i);
      }
      for (let i = 1; i <= 12; i++) {
        let month = 0;
        month = i < 10 ? '0' + i : i;
        months.push(month);
      }
      days = this.getDays(date.getFullYear(), date.getMonth() + 1);
      this.setData({
        years: years,
        months: months,
        days: days
      }, () => {
        let currentYearIndex = this.data.years.length - 1;
        this.setData({
          tempYearPos: [currentYearIndex],
          tempMonthPos: [date.getMonth()],
          tempDayPos: [date.getDate() - 1]
        })
      });
    },
    // 计算日
    getDays (year, month) {
      var days = [];
      month = parseInt(month, 10);
      var date = new Date(year, month, 0);
      var maxDay = date.getDate();
      for (let i = 1; i <= maxDay; i++) {
        let day = 0;
        day = i < 10 ? '0' + i : i;
        days.push(day);
      }
      return days;
    },
    // 年变化
    yearOnChange (e) {
      //年改变，月要滑到一月，天要重新计算该年该月多少天
      var days = [];
      var curYear = this.data.years[e.detail.value];
      days = this.getDays(curYear, 1);
      this.setData({
        days: days
      }, () => {
        this.setData({
          tempYearPos: e.detail.value,
          tempMonthPos: [0],
          tempDayPos: [0]
        });
        this.outputDateFn();
      });
    },
    // 月变化
    monthOnChange (e) {
      var days = [];
      var curYear = this.data.years[this.data.tempYearPos];
      var curMonth = this.data.months[e.detail.value];
      days = this.getDays(curYear, curMonth);
      this.setData({
        days: days
      }, () => {
        this.setData({
          tempMonthPos: e.detail.value,
          tempDayPos: [0]
        })
        this.outputDateFn();
      });
    },
    // 日变化
    dayOnChange (e) {
      this.setData({
        tempDayPos: e.detail.value
      }, () => {
        this.outputDateFn();
      });
    },
    // 输出选择时间
    outputDateFn () {
      let data = {
        year: this.data.years[this.data.tempYearPos],
        month: this.data.months[this.data.tempMonthPos],
        day: this.data.days[this.data.tempDayPos]
      };
      // 向外层父级传递数据
      this.triggerEvent('dataChangeCFn', { type: this.data.type, data });
    }
  },
  attached: function () {
    this.initDate();
  }
});
