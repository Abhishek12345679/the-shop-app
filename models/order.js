import moment from "moment";

class order {
    constructor(id, orderItems, orderAmount, orderDate) {
        (this.id = id),
        (this.orderItems = orderItems),
        (this.orderAmount = orderAmount),
        (this.orderDate = orderDate);
    }

    get readableDate() {
        // return this.orderDate.toLocaleDateString("de-DE", {
        //     year: "numeric",
        //     month: "long",
        //     day: "numeric",
        //     hour: "2-digit",
        //     minute: "2-digit"
        // });
        return moment(this.orderDate).format('MMMM Do YYYY,hh:mm')
    }
}

export default order;