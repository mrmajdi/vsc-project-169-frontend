// @vsc repo:vsc-project-169-frontend file:src/App.tsx task:f2-src-app-tsx module:frontend session:169
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Spinner from './components/ui/Spinner';

const Home = lazy(() => import('./pages/Home/index'));
const PostDetail = lazy(() => import('./pages/PostDetail/index'));
const CreatePost = lazy(() => import('./pages/CreatePost/index'));
const EditPost = lazy(() => import('./pages/EditPost/index'));
const Login = lazy(() => import('./pages/Login/index'));
const Register = lazy(() => import('./pages/Register/index'));
const Profile = lazy(() => import('./pages/Profile/index'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-8">
          <Suspense
            fallback={
              <Spinner
                className="mx-auto my-8"
                aria-label="در حال بارگذاری"
              />
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/:id/edit" element={<EditPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export default App;
