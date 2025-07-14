// File: src/pages/DashboardPage.jsx
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import CustomerList from "../components/CustomerList";
import TransactionList from "../components/TransactionList";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-6">
      <Card
        title={`Welcome, ${user.name}`}
        extra={<Button onClick={handleLogout}>Logout</Button>}
      >
        <CustomerList />
        <div className="my-6" />
        <TransactionList />
      </Card>
    </div>
  );
};

export default DashboardPage;
