import { Button, Card, Form, Input } from "antd";


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
            className="text-center"
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            className="text-center"
            
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="text-center"
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
