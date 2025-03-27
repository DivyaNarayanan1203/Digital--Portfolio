
// Pop-Up Functionality
const popUpButton = document.getElementById('popUpButton');
const popUp = document.getElementById('popUp');
const closeButton = document.querySelector('.close');

// Open Pop-Up
popUpButton.addEventListener('click', () => {
    popUp.style.display = 'block';
});

// Close Pop-Up
closeButton.addEventListener('click', () => {
    popUp.style.display = 'none';
});

// Close Pop-Up when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === popUp) {
        popUp.style.display = 'none';
    }
});

// Job Posting Form Submission
const jobForm = document.getElementById('job-form');
const jobListings = document.getElementById('job-listings');

jobForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    // Create new job card
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
        <img src="${image}" alt="Company Logo">
        <h3>${title}</h3>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button class="apply-button">Apply Now</button>
        <button class="save-button">Save Job</button>
    `;

    // Append new job card to job listings
    jobListings.appendChild(jobCard);

    // Clear form fields
    jobForm.reset();

    // Show success message
    alert('Job posted successfully!');
});

// Job Application and Save Functionality
jobListings.addEventListener('click', (event) => {
    if (event.target.classList.contains('apply-button')) {
        const jobTitle = event.target.parentElement.querySelector('h3').textContent;
        alert(`You applied for: ${jobTitle}`);
    }

    if (event.target.classList.contains('save-button')) {
        const jobTitle = event.target.parentElement.querySelector('h3').textContent;
        alert(`You saved: ${jobTitle}`);
    }
});
