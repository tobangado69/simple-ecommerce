// File: src/components/CustomerList.jsx
import { useEffect, useState } from "react";
import { Table, Typography } from "antd";


const CustomerList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Username", dataIndex: "username" },
    { title: "Name", dataIndex: "name" },
  ];

  return (
    <>
      <Typography.Title level={4}>Customer List</Typography.Title>
      <Table
        rowKey="id"
        dataSource={users}
        columns={columns}
        pagination={false}
      />
    </>
  );
};

export default CustomerList;
