import Head from "next/head";
import Router from "next/router";
import { useState, useEffect } from "react";
import product from "../components/productlist.json";

export default function Listadd() {
  const [list, setlist] = useState({
    code: "",
    name: "",
    price: "",
    quantity: "",
  });
  const [co, setco] = useState("");
  useEffect(() => {
    if (co) {
      const prod = product.products.filter((a) => list.code == a.code);
      if (prod.length) {
        setlist({ ...list, name: prod[0].name, price: prod[0].price });
        setco("");
      }
    }
    return console.log("finished");
  }, [co, list]);

  const [addedlist, setaddedlist] = useState([]);
  const changehandler = (e) => {
    if (e.target.name === "code") {
      setco(e.target.value);
    }
    setlist((a) => ({ ...a, [e.target.name]: e.target.value }));
  };
  const addlist = () => {
    if (list.code && list.name && list.price && list.quantity) {
      setaddedlist((a) => [...a, list]);
      setlist({ code: "", name: "", price: "", quantity: "" });
    } else {
      alert("All Field Required");
    }
  };
  return (
    <div>
      <Head>
        <title>Add list of products</title>
        <meta
          name="description"
          content="add a list products to generate final product"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="listadd-body">
        <div className="list-container">
          <header>
            <h1 className="gradient-text">add products</h1>
          </header>
          <div className="addlist-head">
            <div>
              <input
                type="number"
                placeholder="product id"
                name="code"
                value={list.code}
                onChange={changehandler}
              />
              <input
                type="number"
                placeholder="product quantity"
                name="quantity"
                value={list.quantity}
                onChange={changehandler}
              />
              <input
                type="text"
                placeholder="product name"
                name="name"
                value={list.name}
                onChange={changehandler}
              />
              <input
                type="number"
                placeholder="product price"
                name="price"
                value={list.price}
                onChange={changehandler}
              />
            </div>
            <div>
              <input type="button" value="add product" onClick={addlist} />
            </div>
          </div>
          <div className="list-details">
            <table>
              <thead>
                <tr>
                  <th>s:no</th>
                  <th>product id</th>
                  <th>name</th>
                  <th>quantity</th>
                  <th>price</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                {addedlist.map((a, i) => (
                  <tr key={a.code}>
                    <td>{i + 1}</td>
                    <td>{a.code}</td>
                    <td>{a.name}</td>
                    <td>{a.quantity}</td>
                    <td>{a.price}</td>
                    <td>{parseInt(a.price) * parseInt(a.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="list-generate">
            {addedlist.length == 0 ? (
              ""
            ) : (
              <input
                onClick={() => {
                  localStorage.setItem("products", JSON.stringify(addedlist));
                  Router.push("/finalprice");
                }}
                type="button"
                value="generate quotation"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
