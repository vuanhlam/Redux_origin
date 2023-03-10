import FormAddNew from "./FormAddNew";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../action/actions";

function TableUser() {
  //   const [listUsers, setListUsers] = useState([]);

  const dispatch = useDispatch();

  const listUsers = useSelector((state) => state.user.users);
  const isLoaing = useSelector((state) => state.user.isLoaing);
  const isError = useSelector((state) => state.user.isError);

  useEffect(() => {
    // fetchAllUsers();
    dispatch(fetchAllUsers());
  }, []);
  

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
  };

  return (
    <>
      <Container>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>User Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isError === true ? (
              <>
                <div>Something wrongs, please try again ...</div>
              </>
            ) : (
              <>
              {
                    isLoaing === true 
                    ? 
                    <><div>Loading data ...</div></> 
                    : 
                    <>
                        {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((user, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(user.id)}
                                >
                                Delete
                                </button>
                            </td>
                            </tr>
                        ))}
                    </>
                }
              </>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default TableUser;
