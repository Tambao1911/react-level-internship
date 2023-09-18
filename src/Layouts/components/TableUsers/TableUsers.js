import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import _ from 'lodash'
import Table from "react-bootstrap/Table";
import { FetchApiUsers } from "~/components/services/FetchApi";
import ModalAddUser from "~/components/Modal/ModalAddNewUser";
import ModalEditUser from "~/components/Modal/ModalEditUser";
import ModalConfim from "~/components/Modal/ModalConfim";

function TableUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [dataUse, setDataUser] = useState({});
  const [dataUseDelete, setDataUserDelete] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [sortBy, setSortBy] = useState('asc')
  const [sortField, setSortField] = useState('id')
  const handleClose = () => {
    setShowModal(false);
    setShowEditUser(false);
    setIsShowModalDelete(false)
  };

  const handleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await FetchApiUsers(page);
    if (res && res.data) {
      setTotal(res.total);
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleOnEdit = (user) => {
    setDataUser(user);
    setShowEditUser(true);
  };

  const handleEditUserModal = (user) => {
    let newListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    newListUser[index].first_name = user.first_name;
    setListUsers(newListUser);
  }

  const handleDeleUser = (user) => {
    setIsShowModalDelete(true)
    setDataUserDelete(user)
  }

  const handleDeleteUserModal = (user) => {
    let newListUser = _.cloneDeep(listUsers);
    newListUser = newListUser.filter(item => item.id !== user.id);
    setListUsers(newListUser);
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let newListUser = _.cloneDeep(listUsers);
    newListUser = _.orderBy(newListUser, [sortField], [sortBy]);
    setListUsers(newListUser)

  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              ID
              <div onClick={() => handleSort('desc', 'id')}>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
              <div onClick={() => handleSort('asc', 'id')}>
                <i className="fa-solid fa-arrow-up"></i>
              </div>
            </th>
            <th>Email</th>
            <th>First Name
            </th>
            <th>Last Name
              <div onClick={() => handleSort('desc', 'last_name')}>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
              <div onClick={() => handleSort('asc', 'last_name')}>
                <i className="fa-solid fa-arrow-up"></i>
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => (
              <tr key={`usser-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleOnEdit(item)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleUser(item)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddUser
        show={showModal}
        handleClose={handleClose}
        setShowModal={setShowModal}
        handleUpdateUser={handleUpdateUser}
      />
      <ModalEditUser
        show={showEditUser}
        handleClose={handleClose}
        dataUse={dataUse}
        handleEditUserModal={handleEditUserModal}
      />
      <ModalConfim
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUseDelete={dataUseDelete}
        handleDeleteUserModal={handleDeleteUserModal}
      />
    </>
  );
}

export default TableUsers;
