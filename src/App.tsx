import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './features/auth/pages/LoginPage';
import { CourseDetailPage } from './features/courses/pages/CourseDetailPage';
import { CoursesPage } from './features/courses/pages/CoursesPage';
import { AppLayout } from './shared/components/AppLayout';
import { NotFoundPage } from './shared/components/NotFoundPage';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/courses" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;