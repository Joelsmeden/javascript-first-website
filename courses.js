export const fetchCourses = async () => {
  try {
    const response = await fetch('http://localhost:3000/courses');
    const courses = await response.json();

    if (courseId) {
      showBookingPage(courseId, courses);
    } else {
      displayCourses(courses);
    }
  } catch (error) {
    console.error('Kunde inte ladda kurserna:', error);
    courseGrid.innerHTML =
      '<p>Kunde inte ladda kurserna. Startade du json-server?</p>';
  }
};
