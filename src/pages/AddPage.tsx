import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Card, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function AddPage() {
  

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Thêm mới
      </h1>
      <Form 
        
        layout="vertical"
        className="space-y-2"
      >

        <Form.Item
          label="Name"
          name="name"
          className="text-center"
        >
          <Input
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          className="text-center"
        >
          <Input
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          className="text-center"
        >
          <Input
            size="large"
            type="date"
          />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          className="text-center"
        >
          <Input
            size="large"
            type="number"
          />
        </Form.Item>

        

        <Form.Item
          label="Content"
          name="content"
          className="text-center"
        >
          <Input.TextArea
            size="large"
            rows={3}
          />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          className="text-center"
        >
          <Select
            size="large"
            className="text-left"
            placeholder="--Chọn trạng thái--"
            options={[
              {
                label: "Medium",
                value: "Medium"
              },
              {
                label: "High",
                value: "High"
              },
              {
                label: "Low",
                value: "Low"
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