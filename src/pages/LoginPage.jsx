import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.id && user?.username) {
        navigate("/dashboard");
      } else {
        localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/users?username=${values.username}`
      );
      const users = await res.json();

      if (users.length === 0) {
        Swal.fire("Gagal", "Username tidak ditemukan", "error");
      } else {
        const user = users[0];
        if (user.password === values.password) {
          localStorage.setItem("user", JSON.stringify(user));
          Swal.fire("Sukses", "Login berhasil", "success").then(() => {
            navigate("/dashboard");
          });
        } else {
          Swal.fire("Gagal", "Password salah", "error");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Terjadi kesalahan saat login", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm px-4">
        <Card title="Login">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Masukkan username" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Masukkan password" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
  
  
};

export default LoginPage;
