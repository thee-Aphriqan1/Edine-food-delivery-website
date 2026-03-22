import {ObjectId} from "mongodb";

export interface CartIttem{
    menuItemId:ObjectId;
    quantity:number;
    price:number;
}

export interface Cart{
    _id?: ObjectId;
    userId:ObjectId;
    items:CartIttem[];
    totalAmaount:number;
    updateAt:Date;
}
