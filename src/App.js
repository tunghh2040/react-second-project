import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './Components/Header';
import TableUser from './Components/TableUser';

function App() {
  return (
    <div className="App-container">
      <Header />
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
