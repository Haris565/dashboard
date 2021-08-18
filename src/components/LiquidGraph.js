import { Liquid } from '@ant-design/charts' ; 
function LiquidGraph() {
    var config = { 
        percent : 0.25 , 
        outline : { 
          border : 4 , 
          distance : 8 , 
        } ,
        wave : { length : 128 } , 
        style : { 
            color:'white',
           
          }
      } ;
      return < Liquid { ... config } /> ;
}

export default LiquidGraph
