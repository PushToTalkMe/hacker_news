import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home';
import { Post } from './pages/Post/Post';
import './App.css';

function App() {
  return (
    <div className="App">
			<BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post'>
            <Route path=':postId' element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App };
