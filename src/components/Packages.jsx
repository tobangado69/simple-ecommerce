import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  InputNumber,
  Typography,
} from "antd";
import Swal from "sweetalert2";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const [form] = Form.useForm();

  const fetchPackages = () => {
    setLoading(true);
    fetch("http://localhost:3001/packages")
      .then((res) => res.json())
      .then(setPackages)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAdd = () => {
    setEditingPackage(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingPackage(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus paket?",
      text: "Data ini tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3001/packages/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Dihapus!", "Paket berhasil dihapus", "success");
      fetchPackages();
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingPackage) {
        // update
        await fetch(`http://localhost:3001/packages/${editingPackage.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        Swal.fire("Berhasil", "Paket berhasil diupdate", "success");
      } else {
        // create
        await fetch("http://localhost:3001/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        Swal.fire("Berhasil", "Paket berhasil ditambahkan", "success");
      }
      setModalVisible(false);
      fetchPackages();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Paket", dataIndex: "name" },
    { title: "Harga (Rp)", dataIndex: "price" },
    {
      title: "Aksi",
      render: (record) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record.id)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <Typography.Title level={4}>Daftar Paket Internet</Typography.Title>
      <Button type="primary" className="mb-4" onClick={handleAdd}>
        Tambah Paket
      </Button>
      <Table
        rowKey="id"
        dataSource={packages}
        columns={columns}
        loading={loading}
        pagination={false}
      />

      <Modal
        open={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        title={editingPackage ? "Edit Paket" : "Tambah Paket"}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Nama Paket"
            rules={[{ required: true, message: "Masukkan nama paket" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Harga (Rp)"
            rules={[{ required: true, message: "Masukkan harga paket" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Packages;
