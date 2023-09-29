import { writable, derived } from 'svelte/store';
import type { Course } from '$lib/utils/types';

export const courses = writable<Course[]>([]);
export const courseInProgress = derived(courses, ($courses) =>
  $courses.length > 0 ? $courses.slice(0, 3) : []
);
export const courseMetaDeta = writable({
  isLoading: true
});

export const createCourseModal = writable({
  open: false,
  title: '',
  description: '',
  emails: '',
  tutors: '',
  students: ''
});

export const copyCourseModalInitialState = {
  open: false,
  courseIdToCopy: null,
  id: '',
  title: '',
  isSaving: false,
  error: null
};

export const copyCourseModal = writable({ ...copyCourseModalInitialState });
