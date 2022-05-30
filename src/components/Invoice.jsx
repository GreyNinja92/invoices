import React from "react";
import lodash from "lodash";

function Invoice(props) {
  const propObject = props;
  return (
    <div className="invoice">
      {Object.keys(propObject).map((key) => {
        if (key !== "id" && key !== "onDelete") {
          return (
            <p>
              {lodash.startCase(key)} : {propObject[key]}
            </p>
          );
        }
      })}
      <p>
        Total : {(parseFloat(props.rate) + parseFloat(props.tax)).toFixed(2)}
      </p>
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Invoice;
