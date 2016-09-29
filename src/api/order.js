export default class Order {
    constructor(orderType, orderBy, fallback) {
        this.setOrderType(orderType);
        this.setOrderBy(orderBy, fallback);
    }

    setOrderType(orderType) {
        if (orderType != undefined && orderType != null && orderType != "") {
            orderType = orderType.trim().toUpperCase();
            this.order_type = (
                orderType == "DESC" || orderType == "ASC"
            ) ? orderType : "DESC";
        } else {
            this.order_type = "DESC";
        }
    }

    setOrderBy(orderBy, fallback) {
        if (orderBy != undefined && orderBy != null && orderBy != "") {
            this.order_by = orderBy;
        } else {
            this.order_by = fallback;
        }
    }
}