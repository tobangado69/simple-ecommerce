import { useEffect, useState } from "react";
import { Table, Select, Button, Typography, Modal } from "antd";
import Swal from "sweetalert2";

const TransactionList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [packages, setPackages] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [editVisible, setEditVisible] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [editPackageId, setEditPackageId] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:3001/packages")
      .then((res) => res.json())
      .then(setPackages);

    fetch(
      `http://localhost:3001/transactions?userId=${user.id}&_expand=package`
    )
      .then((res) => res.json())
      .then(setTransactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuy = async () => {
    if (!selectedPackage) {
      Swal.fire("Pilih Paket", "Silakan pilih paket data", "warning");
      return;
    }

    const res = await fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        packageId: selectedPackage,
        date: new Date().toISOString().split("T")[0],
      }),
    });

    if (res.ok) {
      Swal.fire("Berhasil", "Paket berhasil dibeli", "success");
      setSelectedPackage(null);

      const newTransaction = await res.json();
      const pkg = packages.find((p) => p.id === newTransaction.packageId);
      setTransactions([...transactions, { ...newTransaction, package: pkg }]);
    } else {
      Swal.fire("Gagal", "Pembelian gagal", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus transaksi?",
      text: "Data ini tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3001/transactions/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Dihapus!", "Transaksi berhasil dihapus", "success");
      fetchData();
    }
  };

  const handleEdit = (record) => {
    setEditTransaction(record);
    setEditPackageId(record.package?.id);
    setEditVisible(true);
  };

  const handleUpdate = async () => {
    if (!editTransaction || !editPackageId) return;

    await fetch(`http://localhost:3001/transactions/${editTransaction.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageId: editPackageId }),
    });

    setEditVisible(false);
    Swal.fire("Berhasil", "Transaksi berhasil diubah", "success");

    const selectedPkg = packages.find((p) => p.id === editPackageId);

    setTransactions((prev) =>
      prev.map((trx) => {
        if (trx.id === editTransaction.id) {
          return {
            ...trx,
            packageId: editPackageId,
            package: selectedPkg, 
          };
        }
        return trx;
      })
    );
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Package", dataIndex: ["package", "name"] },
    {
      title: "Price",
      render: (record) => (record.package ? `Rp${record.package.price}` : "-"),
    },
    { title: "Date", dataIndex: "date" },
    {
      title: "Action",
      render: (record) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={4}>Your Transactions</Typography.Title>
      <div className="flex gap-2 mb-4">
        <Select
          style={{ width: 200 }}
          placeholder="Select Package"
          options={packages.map((p) => ({
            value: p.id,
            label: `${p.name} - Rp${p.price}`,
          }))}
          value={selectedPackage}
          onChange={setSelectedPackage}
        />
        <Button type="primary" onClick={handleBuy}>
          Buy
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={transactions}
        columns={columns}
        pagination={false}
      />

      <Modal
        title="Edit Transaksi"
        open={editVisible}
        onOk={handleUpdate}
        onCancel={() => setEditVisible(false)}
        okText="Simpan"
        cancelText="Batal"
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Pilih paket baru"
          value={editPackageId}
          onChange={setEditPackageId}
          options={packages.map((p) => ({
            value: p.id,
            label: `${p.name} - Rp${p.price}`,
          }))}
        />
      </Modal>
    </>
  );
};

export default TransactionList;
