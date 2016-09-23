export default class Order {
    constructor(orderType, orderBy, fallback) {
        this.setOrderType(orderType);
        this.setOrderBy(orderBy, fallback);
    }

    setOrderType(orderType) {
        if (orderType != undefined && orderType != null && orderType != "") {
            orderType = orderType.trim().toUpperCase();
            this.orderType = (
                orderType == "DESC" || orderType == "ASC"
            ) ? orderType : "DESC";
        } else {
            this.orderType = "DESC";
        }
    }

    setOrderBy(orderBy, fallback) {
        if (orderBy != undefined && orderBy != null && orderBy != "") {
            this.orderBy = orderBy;
        } else {
            this.orderBy = fallback;
        }
    }
}