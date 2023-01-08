// import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, NavLink, } from 'react-router-dom'
import {Books} from './pages/Books'
import {Home} from './pages/Home'
import {BookDetails} from './pages/BookDetails'
import {BookNew} from './pages/BookNew'
import {NotFound} from './pages/NotFound'
import {BookLayout} from './BookLayout'
import { BookList } from './pages/BookList';
import { About } from './pages/About'
  
// thẻ navlink có thuộc tính isActive, children ... còn Link thì không
function App() {
  return (
    <>
      <h1>Routing in React</h1>
      <nav>
        <ul>
          
          <li><Link to='/books'>Books</Link></li>
          <li>
            <NavLink style={({ isActive }) => {return isActive ? { 'color': 'red'} : {}}} to='/about'>
              {({isActive}) => {return isActive ? "Active About" : "About"}}
            </NavLink></li>
        </ul>
      </nav>
      <Routes element={<h2>I want this to be defautl</h2>}>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/books' element={<BookLayout/>}>
          <Route index element={<BookList />}></Route>
          <Route path=':id' element={<BookDetails />}></Route>
          <Route path='new' element={<BookNew />}></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
