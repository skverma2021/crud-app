import React from 'react';

const MenuOptions = ({ items }) => {
  const rows = [];
  items.forEach((i) => {
    rows.push(<MenuItem value={i.id}>{i.cityName}</MenuItem>);
  });
  return <div>MenuOptions</div>;
};

export default MenuOptions;

// function ProductTable({ products }) {
//     const rows = [];
//     let lastCategory = null;

//     products.forEach((product) => {
//       if (product.category !== lastCategory) {
//         rows.push(
//           <ProductCategoryRow
//             category={product.category}
//             key={product.category} />
//         );
//       }
//       rows.push(
//         <ProductRow
//           product={product}
//           key={product.name} />
//       );
//       lastCategory = product.category;
//     });

//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
