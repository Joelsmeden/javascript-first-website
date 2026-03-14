if (localStorage.getItem('isLoggedIn') !== 'true') {
  alert('Åtkomst nekad! Du måste logga in först.');
  window.location.href = 'login.html';
}

const courseGrid = document.getElementById('course-grid');
const bookingSection = document.getElementById('bookingSection');

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

const fetchCourses = async () => {
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

const displayCourses = (courseList) => {
  if (!courseGrid) return;

  const courseCardsHTML = courseList
    .map((course) => {
      return `
        <article class="course-card">
          <div class="course-badge">${course.type}</div>
          <img src="${course.image}" alt="${course.title}" />
          <div class="course-content">
            <span class="course-id">Ref: ${course.id}</span>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-info">
              <span><strong>Längd:</strong> ${course.length}</span>
              <span><strong>Start:</strong> ${course.startDate}</span>
            </div>
            <a href="./booking/booking.html?id=${course.id}" class="btn-book">
               Boka kurs
            </a>
          </div>
        </article>
      `;
    })
    .join('');

  courseGrid.innerHTML = courseCardsHTML;
};

function showBookingPage(id, courseList) {
  const sectionHeader = document.querySelector('.section-header');

  if (courseGrid) courseGrid.style.display = 'none';
  if (sectionHeader) sectionHeader.style.display = 'none';
  if (bookingSection) bookingSection.style.display = 'block';

  const selectedCourse = courseList.find((c) => c.id === id);
  if (selectedCourse) {
    document.getElementById('selectedCourseTitle').innerText =
      selectedCourse.title;
  }
}

fetchCourses();
