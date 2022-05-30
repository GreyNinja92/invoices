import React from "react";
import $ from "jquery";

function CreateArea(props) {
  const invoices = props.invoices;
  const [invoiceNo, setInvoiceNo] = React.useState("");
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [invoiceNoError, setInvoiceNoError] = React.useState("none");
  const [invoiceDate, setInvoiceDate] = React.useState("");
  const [invoiceDateError, setInvoiceDateError] = React.useState("none");
  const [partyName, setPartyName] = React.useState("");
  const [partyNameError, setPartyNameError] = React.useState("none");
  const [panCard, setPanCard] = React.useState("");
  const [panCardError, setPanCardError] = React.useState("none");
  const [rate, setRate] = React.useState("");
  const [rateError, setRateError] = React.useState("none");
  const [tax, setTax] = React.useState("");
  const [taxError, setTaxError] = React.useState("none");
  const regEx = /^[\/\\\w]*$/;
  const regEx2 = /\b([a-z]+)\b/gi;
  const regEx3 = /^[a-zA-Z0-9]*$/;
  const regEx4 = /^[0-9]*\.[0-9]{2}$/;

  function invoiceNoChange(event) {
    console.log(invoices);
    const value = event.target.value;
    const isDuplicate = $.grep(invoices, function (invoice) {
      return invoice[0] === value;
    }).length;
    setIsDuplicate(isDuplicate !== 0);

    if (
      regEx.test(value) === true &&
      (invoices.length ? isDuplicate === 0 : true)
    ) {
      setInvoiceNo(value);
      setInvoiceNoError("none");
    } else {
      setInvoiceNo(value);
      setInvoiceNoError("block");
    }
  }

  function invoiceDateChange(event) {
    const value = event.target.value;
    const sortedInvoices = invoices.sort();
    const typedDate = new Date(value);
    let conditionSatisfied = false,
      nextInvoiceDate = null,
      lastInvoiceDate = null;
    if (invoices.length === 0) {
      conditionSatisfied = true;
    } else {
      for (let i = 0; i < invoices.length; i++) {
        if (sortedInvoices[i][0] < invoiceNo) {
          lastInvoiceDate = sortedInvoices[i][1];
        } else {
          nextInvoiceDate = sortedInvoices[i][1];
          break;
        }
      }
    }
    conditionSatisfied =
      (nextInvoiceDate ? typedDate <= new Date(nextInvoiceDate) : true) &&
      (lastInvoiceDate ? typedDate >= new Date(lastInvoiceDate) : true);

    if (conditionSatisfied) {
      setInvoiceDate(value);
      setInvoiceDateError("none");
    } else {
      setInvoiceDate(value);
      setInvoiceDateError("block");
    }
  }

  function partyNameChange(event) {
    const value = event.target.value;
    if (regEx2.test(value) === true) {
      setPartyName(value);
      setPartyNameError("none");
    } else {
      setPartyName(value);
      setPartyNameError("block");
    }
  }

  function panCardChange(event) {
    const value = event.target.value;
    if (regEx3.test(value) === true) {
      setPanCard(value);
      setPanCardError("none");
    } else {
      setPanCard(value);
      setPanCardError("block");
    }
  }

  function rateChange(event) {
    const value = event.target.value;
    if (regEx4.test(value) === true) {
      setRate(value);
      setRateError("none");
    } else {
      setRate(value);
      setRateError("block");
    }
  }

  function taxChange(event) {
    const value = event.target.value;
    if (regEx4.test(value) === true) {
      setTax(value);
      setTaxError("none");
    } else {
      setTax(value);
      setTaxError("block");
    }
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          if (
            [
              invoiceNoError,
              invoiceDateError,
              partyNameError,
              panCardError,
              rateError,
              taxError,
            ].includes("block")
          ) {
            alert("Please fill all the fields correctly");
            event.preventDefault();
          } else {
            props.onAdd(
              [invoiceNo, invoiceDate, partyName, panCard, rate, tax],
              event
            );
            setInvoiceNo("");
            setInvoiceDate("");
            setPartyName("");
            setPanCard("");
            setRate("");
            setTax("");
          }
        }}
      >
        <input
          onChange={invoiceNoChange}
          name="invoice_no"
          placeholder="Invoice No"
          value={invoiceNo}
          required
        />
        <p id="invoice_error" style={{ display: invoiceNoError }}>
          {isDuplicate
            ? "Invoice already exists"
            : "Please enter a valid invoice no."}
        </p>
        <input
          type="date"
          onChange={invoiceDateChange}
          name="invoice_date"
          placeholder="Invoice Date"
          value={invoiceDate}
          disabled={invoiceNo === ""}
          required
        />
        <p id="invoice_error" style={{ display: invoiceDateError }}>
          Please enter a valid invoice date. Invoices with higher nos exist with
          earlier dates.
        </p>
        <input
          onChange={partyNameChange}
          name="party_name"
          placeholder="Party Name"
          value={partyName}
          disabled={invoiceNo === ""}
          required
        />
        <p id="invoice_error" style={{ display: partyNameError }}>
          Please enter a valid party name.
        </p>
        <input
          onChange={panCardChange}
          name="pan_card"
          placeholder="Pan Card"
          value={panCard}
          disabled={invoiceNo === ""}
        />
        <p id="invoice_error" style={{ display: panCardError }}>
          Please enter a valid pan card.
        </p>
        <input
          onChange={rateChange}
          type="number"
          step=".01"
          name="rate"
          placeholder="Rate"
          value={rate}
          disabled={invoiceNo === ""}
          required
        />
        <p id="invoice_error" style={{ display: rateError }}>
          Rate must be number with 2 decimal places.
        </p>
        <input
          onChange={taxChange}
          type="number"
          step=".01"
          name="tax"
          placeholder="Tax"
          value={tax}
          disabled={invoiceNo === ""}
          required
        />
        <p id="invoice_error" style={{ display: taxError }}>
          Tax must be number with 2 decimal places.
        </p>
        <p style={{ marginLeft: "0.5rem" }}>
          Total : {(parseFloat(rate) + parseFloat(tax)).toFixed(2)}
        </p>
        <input type="submit" value="Add" class="button" />
      </form>
    </div>
  );
}

export default CreateArea;
