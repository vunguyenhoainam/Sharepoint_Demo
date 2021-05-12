import React, { useState, useEffect } from "react";
import FormAdd from "./components/FormAdd";
import FormEdit from "./components/FormEdit";
import "./components/css/style.css";
import moment from 'moment';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const App = () => {

  sp.setup({ pageContext: { web: { absoluteUrl: "http://localhost:8080" } } });

  const loadData = (filters) => {
    let fil = filters ? filters : `ID ne 0`;
    sp.web.lists.getByTitle("ListDemo").items.select("ID, Products, Description, Price, Warranty, Created").filter(fil).top(100).get().then(item => setDataApp(item)).catch(error => console.log(error));
  }

  useEffect(loadData, [])

  const [dataApp, setDataApp] = useState([]);
  const [idItem, setIdItem] = useState();
  const [sttEdit, setSttEdit] = useState(false);

  const [dataSearchProduct, setdataSearchProduct] = useState("");
  const [dataSearchPrice, setdataSearchPrice] = useState("");

  const handleSearch = () => {
    let txtFilter = dataSearchProduct ? `substringof('${dataSearchProduct}',Products)` : "";

    if(dataSearchPrice){
      if(txtFilter){
        txtFilter += " or Price eq " + dataSearchPrice;
      }
      else{
        txtFilter = "Price eq " + dataSearchPrice;
      }
    }
    loadData(txtFilter);
  }

  const handleEdit = (data) => { 
    setSttEdit(data);
  }
  const handleDelete = async(id) => {
    await sp.web.lists.getByTitle("ListDemo").items.getById(id).delete();
    const dataNew = dataApp.filter((item) => (item.ID !== id));
    setDataApp(dataNew);
  }
  const handleAll = (id) => { 
    setSttEdit(!sttEdit);
    setIdItem(id);
  }

  // console.log("dataApp :",dataApp);

  return (
    <div className="container">
      <FormAdd loadData={loadData}/>
      <div className="form-main">
        <table border={1} className="table-main">
          <tbody>
            <tr>
              <td colSpan={7}>
                <h3>
                  Data Sharepoint <span>{`(${dataApp.length} items)`}</span>
                </h3>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>
                <div className="search">
                  <div className="search-products">
                    <input type="text" spellCheck="false" placeholder="Search Products..." onChange={(e) => {setdataSearchProduct(e.target.value)}} />
                    <i className="fal fa-search" onClick={handleSearch}></i>
                  </div>
                  <div className="search-price">
                    <input type="text" placeholder="Search Price..." onChange={(e) => {setdataSearchPrice(e.target.value)}} />
                    <i className="fal fa-search" onClick={handleSearch}></i>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>ID</th>
              <th>Products</th>
              <th>Description</th>
              <th>Price</th>
              <th>Warranty</th>
              <th>Created</th>
              <th>Tools</th>
            </tr>
            {
                dataApp.map((item) => (
                <tr key={item.ID}>
                  <td>{item.ID}</td>
                  <td>{item.Products}</td>
                  <td>{item.Description}</td>
                  <td>{`${item.Price}$`}</td>
                  <td>{item.Warranty ? "Yes" : "No"}</td>
                  <td>{moment(item.Created).format('DD/MM/YYYY, h:mm:ss a')}</td>
                  <td>
                    <div className="btn-control">
                      <i className="fas fa-edit btn-edit" onClick={() => {handleAll(item.ID)}} />
                      <i className="fas fa-trash btn-delete" onClick={() => {handleDelete(item.ID)}}/>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      { sttEdit ? <FormEdit 
                      handleEdit={handleEdit} 
                      idItem={idItem} 
                      dataApp={dataApp}
                      loadData={loadData}
                  /> : "" }
    </div>
  );
};

export default App;
