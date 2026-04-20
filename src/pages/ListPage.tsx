import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";



function ListPage() {
  const qc = useQueryClient();

  const {data} = useQuery({
    queryKey: ['tasks'],
    queryFn: async(data: any) =>{
      const res = await axios.get('http://localhost:3000/tasks', data);
      return res.data
    }
  });

  const {mutate} = useMutation({
    mutationFn: async(id: number) =>{
      await axios.delete(`http://localhost:3000/tasks/${id}`);
    },
    onSuccess: () =>{
      message.success("Xóa thành công");
      qc.invalidateQueries({queryKey: ['tasks']})
    },
    onError: () =>{
      message.error("Xóa thất bại")
    }
  });
 
  const columns = [
    {title: 'ID', dataIndex: 'id'},
    {title: 'Name', dataIndex: 'name'},
    {title: 'Image', dataIndex: 'image', render: (image: string) =>(
      <img src={image} alt="task" width="100" />
    )},
    {title: 'Date', dataIndex: 'date', render: (date: string) =>(
      new Date(date).toLocaleDateString("vi-VN")
    )},
    {title: 'Duration', dataIndex: 'duration'},
    {title: 'Content', dataIndex: 'content'},
    {title: 'Priority', dataIndex: 'priority'},
    {title: 'Action', key: 'action', render: (_:any, record: any) =>(
      <>
      <Popconfirm title="Bạn có chắn chắn muốn xóa hay không?" onConfirm={() =>mutate(record.id)}>
        <Button danger>
          Delete
        </Button>
      </Popconfirm>
        <Link to={`/tasks/edit/${record.id}`}>
        <Button type="primary" style={{marginLeft: 8}}>
          Edit
        </Button>
        </Link>
        </>
    )},
  ]
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data}  />
      </div>
    </div>
  );
}
export default ListPage;
