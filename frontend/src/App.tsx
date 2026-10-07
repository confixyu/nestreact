import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './features/auth/pages/LoginPage';
import { CourseDetailPage } from './features/courses/pages/CourseDetailPage';
import { CoursesPage } from './features/courses/pages/CoursesPage';
import { AppLayout } from './shared/components/AppLayout';
import { NotFoundPage } from './shared/components/NotFoundPage';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { EditCoursePage } from './features/courses/pages/EditCoursePage';
import { NewCoursePage } from './features/courses/pages/NewCoursePage';
import { Role } from './features/auth/types';
import { RequireRole } from './features/auth/components/RequireRole';
import { EnrollmentsPage } from './features/enrollments/pages/EnrollmentsPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { GuestRoute } from './features/auth/components/GuestRoute';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/courses" replace />} />
        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route element={<RequireRole role={Role.TEACHER} />}>
            <Route path="courses/new" element={<NewCoursePage />} />
            <Route path="courses/:courseId/edit" element={<EditCoursePage />} />
          </Route>
          <Route element={<RequireRole role={Role.STUDENT} />}>
            <Route path="enrollments" element={<EnrollmentsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;