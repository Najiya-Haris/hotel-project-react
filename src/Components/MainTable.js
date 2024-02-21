import { Table } from "antd";

const PrimaryTable = ({columns,data}) => {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default PrimaryTable;
