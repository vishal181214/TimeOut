import axios from "axios";
import "./App.css";
// import PagiNation from "./PagiNation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import Report from "./Report";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      const result = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      if (result) setProducts(result.data.products);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
    console.log(products);
  };

  const selectPageHandler = (selectedPage) =>{
    if(selectedPage >= 1 && selectedPage<=products.length/10 && selectedPage !== page)
    setPage(selectedPage)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <PagiNation /> */}
      <h3>Hey We are Here</h3>
      {/* {
        products.length > 0 && 
        <div className="products">
          {
            products.slice(page*10-10,page*10).map((item,index)=>{
              return (
                <span className="products_single" key={index}>
                  <img src={item.thumbnail} alt=""/>
                  <span>{item.title}</span>
                </span>
              )
            })
          }
        </div>
      }
      {
        products.length > 0 && 
        <div className="pagination">
          <span className={page > 1 ? "" : "pagination_disbled"}
          onClick={()=>selectPageHandler(page-1)}>Prev</span>
          {[...Array(products.length / 10)].map((_,i)=>{
            return <span key={i} 
            className={page === i+1 ? "pagination_selected":""}
            onClick={()=>selectPageHandler(i+1)}>{i+1}</span>
          })}
          <span onClick={()=>selectPageHandler(page+1)}
          className={page < products.length/10 ? "" : "pagination_disbled"}>Next</span>
        </div>
      } */}
      <Report/>
    </div>
  );
}

export default App;
