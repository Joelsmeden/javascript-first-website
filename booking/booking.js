const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

const displayCourseName = document.getElementById('displayCourseName');
const bookingForm = document.getElementById('bookingForm');

const fetchCourseDetails = async () => {
  try {
    const response = await fetch(`http://localhost:3000/courses/${courseId}`);
    const course = await response.json();
    displayCourseName.innerText = course.title;
  } catch (error) {
    displayCourseName.innerText = 'Kursen hittades inte';
  }
};

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const bookingData = {
    courseId: courseId,
    courseTitle: displayCourseName.innerText,
    customerName: formData.get('customerName'),
    email: formData.get('email'),
    date: new Date().toLocaleDateString(),
  };

  try {
    const response = await fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      alert('Bokningen är sparad!');
      window.location.href = '../index.html';
    }
  } catch (error) {
    console.error('Något gick fel:', error);
  }
});

fetchCourseDetails();
