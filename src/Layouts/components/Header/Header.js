import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from '~/assets/Img/logo192.png';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "~/components/Context/UserContext";

function Header() {
  const navigate = useNavigate()
  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('LogOut Succsess!');
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            App Users
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {(user && user.auth || window.location.pathname === '/') && <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <NavLink to="/" className='nav-link'>Home</NavLink>
              <NavLink className='nav-link' to="/users">Users</NavLink>
            </Nav>
            <Nav>
              {user && user.email && <span className="nav-link">Welcom{user.email}</span>}
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                {user && user.auth === true
                  ? <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  : <NavLink className='dropdown-item' to="/login" >Login</NavLink>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>}

        </Container>
      </Navbar>
    </>
  );
}

export default Header;
