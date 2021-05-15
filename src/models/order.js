import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  // criando método para date que é um objeto chamado como date string com o buildin js metodo q é usado em date objects
  get readableDate() {
    return moment(this.date).format('DD/MM/YYYY, HH:mm')
  }
}

export default Order;
