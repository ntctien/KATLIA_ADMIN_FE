import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tooltip } from "antd";
import { viewIcon, editIcon, deleteIcon } from "../images/actions";
import AddDiscountModal from "../modals/promotion/AddDiscountModal";
import DiscountProductsModal from "../modals/promotion/DiscountProductsModal";
import appApi from "../api/appApi";
import * as routes from "../api/apiRoutes";

const data = [
  {
    key: "1",
    discountId: "66o84akdbafasd",
    name: "Black Friday Sale",
    percent: "28.58",
    start: "00:00 13-11-2022",
    end: "00:00 13-11-2022",
  },
];

const Promotion = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  const handleAdd = () => {
    setCurrItem(null);
    setAddOpen(true);
  };

  const handleEdit = (value) => {
    setCurrItem(value);
    setAddOpen(true);
  };

  const handleView = (value) => {
    setCurrItem(value);
    setViewOpen(true);
  };

  const columns = [
    {
      title: "Discount ID",
      dataIndex: "discountId",
      sorter: (a, b) => a.discountId.localeCompare(b.discountId),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Discount Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      sorter: (a, b) => a.percent.localeCompare(b.percent),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value + "%"}</p>,
    },
    {
      title: "Start At",
      dataIndex: "start",
      sorter: (a, b) => a.start.localeCompare(b.start),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "End At",
      dataIndex: "end",
      sorter: (a, b) => a.end.localeCompare(b.end),
      defaultSortOrder: "descend",
      render: (value) => <p className="table-cell">{value}</p>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (value) => (
        <div className="flex gap-x-[20px] justify-center">
          <Tooltip title="List products for discount">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(67, 204, 248, 0.9)" }}
              onClick={() => handleView(value)}
            >
              <center>
                <img src={viewIcon} alt="View" />
              </center>
            </button>
          </Tooltip>
          <Tooltip title="Edit discount">
            <button
              className="action-button"
              style={{ backgroundColor: "rgba(249, 175, 94, 0.9)" }}
              onClick={() => handleEdit(value)}
            >
              <center>
                <img src={editIcon} alt="Edit" />
              </center>
            </button>
          </Tooltip>
          <button
            className="action-button"
            style={{ backgroundColor: "rgba(253, 56, 56, 0.9)" }}
          >
            <center>
              <img src={deleteIcon} alt="Cancel" />
            </center>
          </button>
        </div>
      ),
    },
  ];

  //Get all discount list
  const getAllDiscountList = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjA2NjYyMX0.DghrX5Qt0oUmiG4gO47pktnmM5364Kwq6x1rO1FAS8o";
      const result = await appApi.get(
        routes.GET_ALL_DISCOUNT_LIST,
        routes.getAccessTokenHeader(token)
      );
      console.log(result);

    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  }

  useEffect(() => {
    if (currentUser) getAllDiscountList();
  }, [currentUser]);

  //Add new discount
  const addNewDiscount = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzQ2ZTgzMDIwNjE5M2M4N2RlMWFjMzIiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY3MjA2NjYyMX0.DghrX5Qt0oUmiG4gO47pktnmM5364Kwq6x1rO1FAS8o";
      const result = await appApi.post(
        routes.ADD_NEW_DISCOUNT,
        routes.getAddNewDiscountBody("30/12 Sale", 25, "2022-12-30T14:10:55.531Z", "2022-12-31T14:10:55.531Z"),
        routes.getAccessTokenHeader(token)
      );
      console.log(result);
      
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  } 

  return (
    <div>
      <div className="row">
        <h1 className="title">Promotion</h1>
        <p className="subtitle">2 Promotions found</p>
      </div>
      <div className="mt-[12px] flex justify-end gap-x-[10px]">
        <button
          onClick={handleAdd}
          className="px-[17px] py-[11px] rounded-5 bg-primary text-[#9098B1] font-bold text-14"
        >
          Add Discount
        </button>
        <button className="clear-button">
          <p>Clear Filter</p>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        s
        className="mt-5 pagination-active table-header"
      />
      <AddDiscountModal
        open={addOpen}
        handleCancel={() => setAddOpen(false)}
        currentItem={currItem}
      />
      <DiscountProductsModal
        open={viewOpen}
        handleCancel={() => setViewOpen(false)}
        id={currItem?.discountId}
      />
    </div>
  );
};

export default Promotion;
