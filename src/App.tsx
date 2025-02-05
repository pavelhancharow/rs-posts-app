import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Loader from './components/Loader/Loader.tsx';
import './App.css';

const PostsPage = lazy(() => import('./pages/PostsPage.tsx'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
