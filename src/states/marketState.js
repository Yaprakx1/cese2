import { Alert } from "react-native";
import { create } from "zustand";

export const useMarketStore=create((set)=>({
    markets:[],
    addMarket:item=>set(state=>({
        markets:[...state.markets,item]
    })),
    setMarket: (markets) => set({ markets }),
    
  addProduct:(id,product,quantity)=>set(
        state=>({
            markets:state.markets.map(
                (market)=>{
                    if(market.id===id){
                        market.products.push({id:new Date().getTime(),name:product,quantity:quantity})
                    }
                    return market
                }
            )
        }
  )
)
}))