import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Invoice from "./Invoice";
import CreateArea from "./CreateArea";

function App() {
  const [invoices, setInvoices] = React.useState([]);

  function addInvoice(invoice, event) {
    setInvoices((prevItems) => {
      return [...prevItems, invoice];
    });
    event.preventDefault();
  }

  function deleteInvoice(invoiceIndex) {
    console.log(invoiceIndex);
    setInvoices((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== invoiceIndex;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addInvoice} invoices={invoices}/>
      {invoices.map((value, index) => {
        return (
          <Invoice
            key={index}
            id={index}
            invoiceNo={value[0]}
            invoiceDate={value[1]}
            partyName={value[2]}
            panCard={value[3]}
            rate={value[4]}
            tax={value[5]}
            onDelete={deleteInvoice}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
