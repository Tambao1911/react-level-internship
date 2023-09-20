import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './Layouts/components/Header';
import TableUsers from './Layouts/components/TableUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Layouts/components/Home';
import { Routes, Route } from 'react-router';
import Login from './Layouts/Form/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './components/Context/UserContext';

function App() {
    const { loginContext } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
        }
    }, [])
    return (
        <div className='app-container'>
            <Header />
            <Container>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/users' element={<TableUsers />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Container>
            <ToastContainer />
        </div>

    );
}

export default App;
