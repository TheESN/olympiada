import React from "react";

const TableBody = props => {
  const { headers, rows } = props;
  const columns = headers ? headers.length : 0;
  const showSpinner = rows === null;

  function buildRow(row, headers) {
    return (
      <tr key={row.id}>
        {headers.map((value, index) => {
          return <td key={index}>{row[value]}</td>;
        })}
      </tr>
    );
  }

  return (
    <tbody>
      {!showSpinner &&
        rows &&
        rows.map(value => {
          return buildRow(value, headers);
        })}
    </tbody>
  );
};

export default TableBody;
