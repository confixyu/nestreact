import { useState } from 'react';

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 120;

export interface CourseFormValues {
  title: string;
  description: string;
}

interface CourseFormProps {
  initialValues?: CourseFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  serverError: string | null;
  onSubmit: (values: CourseFormValues) => void;
}

export function CourseForm({
  initialValues = { title: '', description: '' },
  submitLabel,
  isSubmitting,
  serverError,
  onSubmit,
}: CourseFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(): void {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < TITLE_MIN_LENGTH || trimmedTitle.length > TITLE_MAX_LENGTH) {
      setValidationError(`El título debe tener entre ${TITLE_MIN_LENGTH} y ${TITLE_MAX_LENGTH} caracteres`);
      return;
    }
    setValidationError(null);
    onSubmit({ title: trimmedTitle, description: description.trim() });
  }

  const error = validationError ?? serverError;

  return (
    <form
      className="course-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <label>
        Título
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        Descripción (opcional)
        <textarea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
}