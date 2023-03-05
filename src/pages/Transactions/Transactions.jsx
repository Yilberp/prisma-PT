import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  delTransaction,
  list,
  newTransaction,
} from "../../services/transaction.service";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import ModalRegister from "./components/ModalRegister";
import toast from "react-hot-toast";
import { resetUser } from "../../redux/states/user";

const structureBill = {
  id: "",
  type: "1",
  value: "0",
  observation: "",
};

export default function Transactions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);
  const [data, setData] = useState([]);
  const [dataBill, setDataBill] = useState(structureBill);
  const [modal, setModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (!userState.login) {
      navigate("/", { replace: true });
    }
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const result = await list(userState.username);
    setItems(result.map((item, index) => index + 1));
    setData(result);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const deleteOrCreate = () => {
    if (isCreate) {
      onSubmitTransaction();
    } else {
      deleteTransaction();
    }
  };

  const onSubmitTransaction = async () => {
    try {
      const res = await newTransaction(userState.username, dataBill);
      if (res.error) {
        toast.error(res.mensaje);
        return;
      }
      toast.success("Registro creado correctamente");
      setDataBill(structureBill);
      getTransactions();
      toggle();
    } catch (error) {
      toast.error(error.message || "Ha ocurrido un error");
    }
  };

  const deleteTransaction = async () => {
    try {
      const res = await delTransaction(userState.username, dataBill.id);
      if (res.mensaje) {
        toast.error("No fue posible eliminar el registro");
        return;
      }
      toast.success("Registro eliminado correctamente");
      setItems(res.map((item, index) => index + 1));
      setData(res);
      setDataBill(structureBill);
      toggle();
    } catch (error) {
      toast.error(error.message || "Ha ocurrido un error");
    }
  };

  const logOut = () => {
    dispatch(resetUser());
    navigate("/", { replace: true });
  };

  return (
    <main className="row">
      <aside className="col-3  col-lg-3 min-vh-100 bg-light p-5">
        <div className="mb-4 text-center">
          <h1 className="mb-0 font-prisma font-prisma-bold lh-1">PRISMA</h1>
          <p className="mb-0 font-prisma font-prisma-thin letter-spacing">
            DIGITAL
          </p>
        </div>
        <ul className="m-0 p-0">
          <li className="mb-2">
            <button
              className="btn btn-primary text-white w-100"
              onClick={() => {
                setDataBill(structureBill);
                setIsCreate(true);
                toggle();
              }}
            >
              <FontAwesomeIcon icon={faAdd} /> Registrar movimiento
            </button>
          </li>
          <li className="">
            <button
              className="btn btn-secondary text-white w-100"
              onClick={logOut}
            >
              Cerrar sesion
            </button>
          </li>
        </ul>
      </aside>
      <section className="col-9 col-lg-9 p-4 list">
        <ModalRegister
          modal={modal}
          toggle={toggle}
          onSubmit={deleteOrCreate}
          isCreate={isCreate}
          dataBill={dataBill}
          setDataBill={setDataBill}
        />
        <h4>Movimientos</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fecha</th>
              <th scope="col">Detalle</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => {
                  setIsCreate(false);
                  setDataBill(item);
                  toggle();
                }}
              >
                <th scope="row">{item.id}</th>
                <td>{new Date(item.date_bill).toLocaleDateString()}</td>
                <td>{item.observation}</td>
                <td>
                  {"$ "}
                  {(item.value * (item.type === "1" ? 1 : -1)).toLocaleString(
                    "es-CO"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          nextClassName="nextClassName"
          previousClassName="previousClassName"
          activeClassName="activeClassName"
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          nextLabel="siguiente >"
          previousLabel="< anterior"
          renderOnZeroPageCount={null}
        />
      </section>
    </main>
  );
}
