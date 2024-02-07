import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "./model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./course-action-types";

export const courseFeatureKey = "courses";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

console.log("Initial State");
console.log(initialCoursesState);

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.setAll(action.courses, { ...state, allCoursesLoaded: true });
  }),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const coursesSelectors = adapter.getSelectors();
