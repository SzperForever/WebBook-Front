import Vue from 'vue'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie);

var Util = {

  user: {
    username: null,
    userId: null
  },
  chart: {
    bookList: [],
    sumPrice: 0
  },
  set: function (name, data) {
    console.log("Insert into cookie : ", JSON.stringify(data));
    Vue.cookie.set(name, JSON.stringify(data))
  },
  get: function (name) {
    var result = Vue.cookie.get(name)
    if (result == undefined) return undefined
    return JSON.parse(result);
  },
  setUser: function (username, userId) {
    this.user.username = username;
    this.user.userId = userId;
    this.set('user', this.user, 1);
  },
  getUser: function () {
    return this.get('user');
  },
  addFailTimes: function () {
    if (this.get("lock") == undefined){
       this.set("lock","1");
    }
    let fails = parseInt(this.get('lock'));
    fails++;
    this.set("lock",fails);
    if(fails >= parseInt("3")){
      return true;
    }
    else{
      return false;
    }

  },
  clearLockTimes : function(){
      this.set('lock',0);
  },
  addToChart: function (book, bookNum) {
    if (bookNum > book.stock) {
      return {
        state: 'fail',
        reason: '库存不足'
      }
    }


    if (this.get('chart') != undefined) {
      this.chart = this.get('chart')
    }

    let bookInOrder = {
      id: book.id,
      name: book.name,
      price: book.price,
      stock: book.stock,
      imgPath: book.imgPath,
      num: bookNum
    };


    for (var i = 0; i < this.chart.bookList.length; ++i) {
      let value = this.chart.bookList[i];
      if (value.id === bookInOrder.id) {
        console.log('Compare');
        value.num += bookInOrder.num;

        if (value.num > value.stock) {
          return {
            state: 'fail',
            reason: '库存不足'
          }
        }

        this.set('chart', this.chart);

        return {
          state: 'success'
        };
      }
    }

    console.log("push");

    this.chart.bookList.push(bookInOrder);
    this.chart.bookList.sumPrice += (book.price * bookNum);
    console.log("chart : ", this.chart)
    this.set('chart', this.chart);
    return {
      state: 'success'
    }

  },
  getChart() {
    return this.get('chart')
  },
  post(url, data, func, contentType = null) {
    if (data != null) {
      if (contentType == null) {
        $.ajax({
          url: 'http://localhost:8080/' + url + '.do',
          type: 'POST',
          data: data,
          success: func
        })
      }
      else {
        $.ajax({
          url: 'http://localhost:8080/' + url + '.do',
          type: 'POST',
          data: data,
          contentType: contentType,
          success: func
        })

      }
    }
    else {
      $.ajax({
        url: 'http://localhost:8080/' + url + '.do',
        type: 'POST',
        success: func
      })
    }

  }
};


export default Util
