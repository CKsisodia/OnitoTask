import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UsersList = (props) => {
  const navigate = useNavigate();
  const [printList, setPrintList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Age/Sex",
      selector: (row) => `${row.age}Y/${row.gender}`,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Govt Id",
      selector: (row) => row.IdDetail,
    },
    {
      name: "Gaurdian Details",
      selector: (row) => `${row.gaurdianLabel}${row.gaurdianDetail}`,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
  ];

  const userApiGet = async () => {
    try {
      const response = await axios.get(
        "https://test-task-abc-default-rtdb.firebaseio.com/userData.json"
      );
      const dataList = response.data;
      const userList = dataList ? Object.values(dataList) : [];
      setPrintList(userList);
      setFilteredData(userList);
    } catch (error) {
      console.log("api get error", error);
    }
  };
  useEffect(() => {
    userApiGet();
  }, []);

  useEffect(() => {
    const res = printList.filter((data) => {
      return data.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(res);
  }, [search]);

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#adf79c",
        fontWeight: 700,
        fontSize: "15px",
      },
    },
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "aqua",
          padding: "4px",
          borderRadius: "6px",
          marginLeft: "2%",
        }}
      >
        Go To Form
      </button>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        customStyles={customStyles}
        actions={
          <button
            style={{
              padding: "4px",
              backgroundColor: "lightgreen",
              borderRadius: "6px",
            }}
          >
            Print User Data
          </button>
        }
        subHeader
        subHeaderComponent={
          <div>
            <label>Search:-&nbsp;</label>
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
};

export default UsersList;
