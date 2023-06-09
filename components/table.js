import { useState } from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import data from '@/database/data.json';
import { getUser } from '@/lib/helper';

export default function Table() {
  const [tableData, setTableData] = useState(data);

  getUser().then((res) => console.log(res));

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-16 py-2">
            <span className="text-gray-700">Supplier Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-700">Address</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-700">Phone number</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-700">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {tableData.map((obj, i) => (
          <Tr {...obj} key={i} index={i} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ supplierName, address, phone, index, handleDelete }) {
  return (
    <tr className="bg-purple-700 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <span className="text-center ml-2 font-semibold">
          {supplierName || 'Unknown'}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{address || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{phone || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2 flex justify-around gap-2">
        <button className="cursor">
          <BiEdit size={22} color={'rgb(34,197,94)'}></BiEdit>
        </button>
        <button
          className="cursor"
          onClick={() => handleDelete(index)}
        >
          <BiTrashAlt size={22} color={'rgb(244,63,94)'}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
