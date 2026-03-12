const addCourseForm = document.getElementById('addCourseForm');

addCourseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(addCourseForm);

  const newCourse = {
    id: formData.get('id'),
    title: formData.get('title'),
    length: formData.get('length'),
    startDate: formData.get('startDate'),
    description: formData.get('description'),
    price: formData.get('price'),
    type: 'Klassrum',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
  };

  try {
    const response = await fetch('http://localhost:3000/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });

    if (response.ok) {
      alert('Kursen har sparats!');
      addCourseForm.reset();
    }
  } catch (error) {
    console.error('Kunde inte spara kursen:', error);
    alert('Ett fel uppstod när kursen skulle sparas.');
  }
});

const fetchAndDisplayBookings = async () => {
  const bookingsList = document.getElementById('bookingsList');

  try {
    const response = await fetch('http://localhost:3000/bookings');
    const bookings = await response.json();

    if (bookings.length === 0) {
      bookingsList.innerHTML = '<p>Inga bokningar finns ännu.</p>';
      return;
    }

    let html = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Kund</th>
                        <th>Kurs</th>
                        <th>Kurs-ID</th>
                        <th>Datum</th>
                    </tr>
                </thead>
                <tbody>
        `;

    bookings.forEach((booking) => {
      html += `
                <tr>
                    <td>${booking.customerName}</td>
                    <td>${booking.courseTitle}</td>
                    <td>${booking.courseId}</td>
                    <td>${booking.date}</td>
                </tr>
            `;
    });

    html += '</tbody></table>';
    bookingsList.innerHTML = html;
  } catch (error) {
    console.error('Kunde inte ladda bokningar:', error);
    bookingsList.innerHTML =
      '<p>Ett fel uppstod vid laddning av bokningar.</p>';
  }
};

fetchAndDisplayBookings();
