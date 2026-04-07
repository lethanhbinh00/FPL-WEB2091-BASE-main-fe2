import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Card, Select, message, Spin, InputNumber } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductInput {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
 
function EditPage() {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const [form] = Form.useForm();
  const {id} = useParams();

  const {data, isLoading} = useQuery({
    queryKey: ["products", id],
    queryFn: async() =>{
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  })

  useEffect(() =>{
    if(data){
      form.setFieldsValue(data);
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: async(values: ProductInput) =>{
      const res = await axios.put(`http://localhost:3000/products/${id}`, values);
      return res.data;
    },
    onSuccess: () =>{
      message.success("Cập nhật thành công");
      queryClient.invalidateQueries({queryKey: ["products"]});
      nav("/products");
    },
    onError: () =>{
      message.error("Cập nhật thất bại");
    }
  })

  const onFinish = (value: ProductInput) =>{
    mutation.mutate(value);
  }

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Cập nhật sản phẩm
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
          <Input
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
);
}
export default EditPage;