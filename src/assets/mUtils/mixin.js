export const  MixinSetInterval = {
  data(){
    return{
      intervals:[],
      timeouts:[],
    }
  },
  methods: {
    setInterval: function () {
      return this.intervals.push(setInterval.apply(null, arguments));
    },
    setTimeout: function () {
      return this.timeouts.push(setTimeout.apply(null, arguments));
    },
    clearInterval: function (index) {
      console.log(index)
      clearInterval(this.intervals[index - 1]);
      this.intervals[index - 1] = -1;
    },
    clearTimeout: function (index) {
      clearInterval(this.timeouts[index - 1]);
      this.timeouts[index - 1] = -1;
    },
  },
  beforeDestroy: function () {
    this.intervals.map(this.clearInterval);
    this.timeouts.map(this.clearTimeout);
  },

};
