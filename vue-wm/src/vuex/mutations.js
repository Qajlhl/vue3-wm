import { ADDGOODS } from "./mutations-cart";

export default {
    [ADDGOODS](state, value) {
        if(state.cartList.length === 0)
        {
            state.cartList = value;
            return;
        }
        let temp = [];
        let flag = 0;
        for (let j = 0; j < value.length;j++) {
            for (let i = 0; i < state.cartList.length; i++) 
            {
                if(value[j].id === state.cartList[i].id)
                {
                    state.cartList[i].total += value[j].total;
                    flag = 1;
                }
            }
            //新加入购物车的产品
            if(flag === 0) temp.push(value[j]);
            flag = 0; 
        }

        while(temp.length > 0)
        {
            state.cartList.push(temp.pop());
        }
    },
    edit(state)
    {
        state.isEdit = !state.isEdit;
    },
    DeleteGoods(state,value)
    {
        state.cartList = value;
    },
    orders(state,value)
    {
        state.newOrder = value;
    },
    FinalOrder(state){
        state.newOrderEnd = state.newOrderEnd.concat(state.newOrder);
    },
    addAddress(state,value)
    {
        state.userList.map((item) => {
            if(value.isDefault)
            {
                item.isDefault = false;
            }
        });

        state.userList.push(value);
    },
    editAddress(state,value)
    {
        state.userList = state.userList.map((item) => {
            if( value.isDefault && !item.isDefault )
            {
                item.isDefault = false;
            }
            return item.id == value.id? value : item;
        })
    },
    deleteAddress(state,value)
    {
        state.userList = state.userList.filter((item) => {
            return !(item.id == value.id);
        });

        if(value.isDefault)
        {
            state.userList[0].isDefault = true;
        }
    },
    editSign(state,value)
    {
        state.describe = value;
    }
}