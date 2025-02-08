import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Loader from './components/Loader/Loader.tsx';
import { withQueryParam } from './helpers';
import './App.css';

const PostsPage = lazy(() => import('./pages/PostsPage.tsx'));
const PostPage = lazy(() => import('./pages/PostPage.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'));

const FullPostPage = withQueryParam(PostPage, 'details');

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<PostsPage />}>
          <Route path="" element={<FullPostPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
