import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Đăng ký tài khoản
        </h1>

        <Form  layout="vertical">
          <Form.Item
            label="Username"
            name="username"
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-12 text-base"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
