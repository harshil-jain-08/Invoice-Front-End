import dayjs from "dayjs";
import "./table.css";
import React, { useContext } from "react";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  PencilSquare,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

const TableHeader = ({ heads }) => {
  return heads.map((data) => {
    if (data === "updated_at") return undefined;
    return (
      <th key={data} width={data === "description" ? "40%" : "auto"}>
        {" "}
        {data.toUpperCase()}
      </th>
    );
  });
};

const TableBody = ({
  results,
  heads,
  from,
  setter,
  setShow,
  changeStat,
  updateStat,
}) => {
  let navigate = useNavigate();
  const edit = (id) => {
    navigate(`/${from}/edit/${id}`);
  };
  return results.map((val, idx) => {
    return (
      <tr
        key={val["id"]}
        onClick={() => {
          if (from === "selector") {
            setter(val);
            setShow(0);
          }
        }}
      >
        {heads.map((v) => {
          if (v === "created_at" || v === "date") {
            let date = dayjs(val[v]);
            date = dayjs(date).format("DD MMM YYYY");
            return <td key={v}>{date}</td>;
          }
          if (v === "updated_at") return undefined;
          if (v === "paid status")
            return (
              <td key={val["paid status"]}>
                <span
                  className={val[v]}
                  onClick={() => {
                    changeStat(val["id"], val["amount"]);
                    updateStat();
                  }}
                >
                  {val[v]}
                </span>
              </td>
            );
          return <td key={v}>{val[v]}</td>;
        })}
        {from === "selector" ? (
          <></>
        ) : (
          <td key={"edit"}>
            <PencilSquare
              size={"1.5em"}
              onClick={() => {
                edit(val["id"]);
              }}
            />
          </td>
        )}
      </tr>
    );
  });
};

const Table = ({ data, from, setter, updateStat }) => {
  const [page, setPage] = useState(1);
  const { setShow, changeStat } = useContext(InvoiceContext);
  const [search, setSearch] = useState("");
  if (data === null || data.length === 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>No Entries</td>
          </tr>
        </tbody>
      </table>
    );
  }
  const handleChange = (e) => {
    const str = e.target.value.toLowerCase();
    setSearch(str);
  };
  var heads = Object.keys(data[0] || {});
  if (from === "selector") {
    heads = heads.filter((r) => {
      return r !== "id" && r !== "created_at";
    });
  }
  const results = data.filter((row) => {
    if (search === "") return data;
    var b = false;
    heads.map((v) => {
      if (v === "updated_at" || v === "created_at") return false;
      let st = row[v].toString();
      b = b || st.includes(search);
      return null;
    });
    return b;
  });

  const decreasePage = () => {
    if (page > 1) setPage((page) => page - 1);
  };

  const increasePage = () => {
    if (page < maxPage) setPage((page) => page + 1);
  };

  var maxPage = Math.ceil(results.length / 6);

  const pageData = results.slice(
    (page - 1) * 6,
    Math.min(results.length, page * 6)
  );

  return (
    <>
      <div className="table-search">
        <i className="fa fa-search icon"></i>
        <input
          type={"text"}
          className="search-bar"
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
      <div className="fixed-table">
        <table>
          <thead>
            <tr>
              <TableHeader heads={heads} />
              <th key={"edit"} style={{ width: "5%" }}></th>
            </tr>
          </thead>
          <tbody>
            <TableBody
              results={pageData}
              heads={heads}
              from={from}
              setter={setter}
              setShow={setShow}
              changeStat={changeStat}
              updateStat={updateStat}
            />
          </tbody>
        </table>
        <span className="page">
          <ArrowLeftCircle onClick={() => decreasePage()} />
          {page}
          <ArrowRightCircle onClick={() => increasePage()} />
        </span>
      </div>
    </>
  );
};

export default Table;
