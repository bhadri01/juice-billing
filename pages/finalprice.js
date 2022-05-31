import Head from "next/head";
import Router from "next/router";
import { useState, useEffect } from "react";

const tt = (list) => {
  let t = 0;
  list.forEach((e) => {
    t = t + parseInt(e.price) * parseInt(e.quantity);
  });
  return t;
};

const qt = (list) => {
  let t = 0;
  list.forEach((e) => {
    t += parseInt(e.quantity);
  });
  return t;
};
const pt = (list) => {
  let t = 0;
  list.forEach((e) => {
    t += parseInt(e.price);
  });
  return t;
};
export default function Listadd() {
  const [list, setlist] = useState();
  useEffect(() => {
    setlist(JSON.parse(localStorage.getItem("products")));
  }, []);
  console.log(list);
  return (
    <div>
      <Head>
        <title>total price for the added list</title>
        <meta name="description" content="total price for the added list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="finalprice-body">
        <div className="final-invoice">
          <div className="final-data">
            <h1>juice store</h1>
            <div className="finaladress">
              <div>
                <span>address</span>
                <span>invoice</span>
              </div>
              <div>
                <span>12/345 anna nagur, salem-636006</span>
                <span>{Date().toString().slice(0, 16)}</span>
              </div>
            </div>
            <table>
              <thead>
                <th>s.no</th>
                <th>name</th>
                <th>quantity</th>
                <th>price</th>
                <th>total</th>
              </thead>
              <tbody>
                {list
                  ? list.map((a, i) => (
                      <tr key={a.code}>
                        <td>{i + 1}</td>
                        <td>{a.name}</td>
                        <td>{a.quantity}</td>
                        <td>{a.price}</td>
                        <td>{parseInt(a.price) * parseInt(a.quantity)}</td>
                      </tr>
                    ))
                  : ""}
                <tr className="final-total">
                  <td colSpan="2">total</td>
                  <td>{list ? qt(list) : ""}</td>
                  <td>{list ? pt(list) : ""}</td>
                  <td>{list ? tt(list) : ""}</td>
                </tr>
              </tbody>
            </table>
            <h2>thank&lsquo;s for shopping</h2>
            <div className="final-footer">
              12/345 anna nagur, salem, tamilnadu, india-636006
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
