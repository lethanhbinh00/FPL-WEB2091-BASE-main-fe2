import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Card, Select, message, InputNumber } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProductInput {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

function AddPage() {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: async(data: ProductInput) =>{
      const res = await axios.post("http://localhost:3000/products", data);
      return res.data;
    },
    onSuccess: () =>{
      message.success("Them thanh cong");
      queryClient.invalidateQueries({queryKey: ["products"]});
      form.resetFields();
      nav("/products");
    },
    onError: () =>{
      message.error("Them that bai");
    }
  })

  const onFinish = (value: ProductInput) =>{
    mutation.mutate(value);
  }


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Thêm sản phẩm mới
      </h1>
      <Form form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-2"
      >

        <Form.Item
          label="Name"
          name="name"
          className="text-center"
          rules={[
            {required: true, message: "Không được để trống"},
          ]}
        >
          <Input
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          className="text-center"
          rules={[
            {required: true, message: "Không được để trống"},
            {type: "url", message: "Định dạng URL không hợp lệ"},
          ]}
        >
          <Input
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          className="text-center"
          rules={[
            {required: true, message: "Không được để trống"},
            {min: 0, message: "Giá phải là số dương"},
          ]}
        >
          <InputNumber
            min={0}
            size="large"
          />

        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className="text-center"
          rules={[
            {required: true, message: "Không được để trống"},
          ]}
        >
          <Input
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          className="text-center"
          rules={[
            {required: true, message: "Không được để trống"},
          ]}
        >
          <Select
            size="large"
            className="text-left"
            placeholder="--Chọn sản phẩm--"
            options={[
              {
                label: "Phone",
                value: "Phone"
              },
              {
                label: "Laptop",
                value: "Laptop"
              },
              {
                label: "Tablet",
                value: "Tablet"
              }
            ]}
          />
        </Form.Item>

        <Form.Item className="pt-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full h-12 text-base font-medium"
            loading={mutation.isPending}
          >
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
);
}
export default AddPage;