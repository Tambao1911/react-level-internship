import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './Layouts/components/Header';
import TableUsers from './Layouts/components/TableUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <div className='app-container'>
            <Header />
            <Container>
                <TableUsers />
            </Container>
            <ToastContainer />
        </div>

    );
}

export default App;
