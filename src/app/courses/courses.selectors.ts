import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Course } from "./model/course";
import {
  CoursesState,
  courseFeatureKey,
  coursesSelectors,
} from "./course-reducers";

export const selectCoursesState =
  createFeatureSelector<CoursesState>(courseFeatureKey);

export const selectAllCourses = createSelector(
  selectCoursesState,
  coursesSelectors.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "BEGINNER")
);

export const selectAdvanceCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);
