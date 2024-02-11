import React, { useState } from 'react';
import './DataTable.css'; // Assurez-vous d'ajuster le nom du fichier CSS

const DataTable = ({ data, dataType }) => {
  const [tableData, setTableData] = useState(data);

  const handleDataChange = (id, newData) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, ...newData } : item))
    );
  };

  return (
    <div className='containerDataTable'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            {dataType === 'users' ? <th>Rôle</th> : <th>Type</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              {dataType === 'users' ? (
                <td>
                  <select
                    value={item.role}
                    onChange={(e) => handleDataChange(item.id, { role: e.target.value })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Utilisateur">Utilisateur</option>
                    <option value="Modérateur">Modérateur</option>
                  </select>
                </td>
              ) : (
                <td>
                  <select
                    value={item.type}
                    onChange={(e) => handleDataChange(item.id, { type: e.target.value })}
                  >
                    <option value="Japonais">Japonais</option>
                    <option value="Mexicain">Mexicain</option>
                    <option value="FastFood">FastFood</option>
                    <option value="Marocain">Marocain</option>
                    <option value="Tunisien">Tunisien</option>
                  </select>
                </td>
              )}
              <td>
                <button onClick={() => handleDataChange(item.id, { action: 'Supprimer' })}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
