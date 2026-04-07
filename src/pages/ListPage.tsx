import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

function ListPage() {
  
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const {data = [], isLoading} = useQuery<Products[]>({
    queryKey: ["products"],
    queryFn: async() =>{
      const res = await axios.get("http://localhost:3000/products");
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async(id: number) =>{
      await axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () =>{
      message.success("Xoa thanh cong");
      queryClient.invalidateQueries({queryKey: ["products"]});
    },
    onError: () =>{
      message.error("Xoa that bai")
    }
  })

  const columns = [
    {title: "ID", dataIndex: "id"},
    {title: "Image", dataIndex: "image",
      render: (image: string) =>(
        <img src={image} width="100"/>
      )
    },
    {title: "Name", dataIndex: "name"},
    {title: "Price", dataIndex: "price"},
    {title: "Category", dataIndex: "category"},
    {title: "Description", dataIndex: "description"},
    {title: "Action", key: "action",
      render: (_:any , record: Products) =>(
        <>
          <Popconfirm title="Bạn có chắn chắn muốn xóa hay không?" onConfirm={() => deleteMutation.mutate(record.id)}>
              <Button danger loading={deleteMutation.isPending}>
                Delete
              </Button>
          </Popconfirm>
              <Button type="primary" style={{marginLeft: 8}} onClick={() => nav(`/products/edit/${record.id}`)}>
                Edit
              </Button>
        </>
      )
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách sản phẩm</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} rowKey="id" loading={isLoading} />
      </div>
    </div>
  );
}
export default ListPage;
