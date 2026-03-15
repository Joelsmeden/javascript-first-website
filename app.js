if (localStorage.getItem('isLoggedIn') !== 'true') {
  alert('Åtkomst nekad! Du måste logga in först.');
  window.location.href = 'login.html';
}

const courseGrid = document.getElementById('course-grid');
const bookingSection = document.getElementById('bookingSection');

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

const createTextElement = (tag, text, className) => {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.className = className;
  return el;
};

const createCourseImage = (src, alt) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
};

const createInfoSpan = (label, value) => {
  const span = document.createElement('span');
  const strong = document.createElement('strong');
  strong.textContent = `${label}: `;
  span.appendChild(strong);
  span.appendChild(document.createTextNode(value));
  return span;
};

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
  courseGrid.innerHTML = '';

  courseList.forEach((course) => {
    const card = document.createElement('article');
    card.className = 'course-card';

    const badge = createTextElement('div', course.type, 'course-badge');
    const image = createCourseImage(course.image, course.title);

    const content = document.createElement('div');
    content.className = 'course-content';

    const ref = createTextElement('span', `Ref: ${course.id}`, 'course-id');
    const title = createTextElement('h3', course.title);
    const desc = createTextElement('p', course.description);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'course-info';
    infoDiv.appendChild(createInfoSpan('Längd', course.length));
    infoDiv.appendChild(createInfoSpan('Start', course.startDate));

    const btn = createTextElement('a', 'Boka kurs', 'btn-book');
    btn.href = `./booking/booking.html?id=${course.id}`;

    card.appendChild(badge);
    card.appendChild(image);

    content.appendChild(ref);
    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(infoDiv);
    content.appendChild(btn);

    card.appendChild(content);

    courseGrid.appendChild(card);
  });
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
