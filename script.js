<script>
document.addEventListener('DOMContentLoaded', function() {
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
function updateActiveLink() {
let current = '';
sections.forEach(section => {
const sectionTop = section.offsetTop;
if (window.pageYOffset >= sectionTop - 100) {
current = section.getAttribute('id');
}
});
navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href').substring(1) === current) {
link.classList.add('active');
}
});
}
window.addEventListener('scroll', updateActiveLink);
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
e.preventDefault();
const formData = new FormData(contactForm);
const data = Object.fromEntries(formData);
console.log('Form submitted:', data);
const successMessage = document.createElement('div');
successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
successMessage.textContent = 'Message sent successfully!';
document.body.appendChild(successMessage);
setTimeout(() => {
successMessage.remove();
}, 3000);
contactForm.reset();
});
});


</script>



