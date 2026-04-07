import { useMutation } from '@tanstack/react-query';
import { Button, Card, Form, Input } from 'antd';
import Password from 'antd/es/input/Password';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

function Register() {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const mutation = useMutation({
        mutationFn: async(data: RegisterInput) =>{
            const res = await axios.post("http://localhost:3000/register", {
                username: data.username,
                email: data.email,
                password: data.password
            });
            return res.data;
        },
        onSuccess: () =>{
            form.resetFields();
            toast.success("Đăng ký thành công");
            nav("/login");
        },
        onError: () =>{
            toast.error("Đăng ký thất bại");
        }
    })

    const onFinish = (value: RegisterInput) =>{
        mutation.mutate(value);
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">

        <h1 className="text-3xl font-semibold mb-8 text-center">
          Đăng ký tài khoản
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Không được để trống" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Không được để trống" },
              { type: "email", message: "Email không hợp lệ" }
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Không được để trống" },
              { min: 6, message: "Tối thiểu 6 ký tự" }
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-12 text-base"
              loading={mutation.isPending}
            >
              Đăng ký
            </Button>
          </Form.Item>

        </Form>

      </Card>
    </div>
  );
}

export default Register