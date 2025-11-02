// ServicePro - Main Application JavaScript

// Sample data for service providers
const sampleProviders = [
    {
        id: 1,
        name: "John Smith",
        service: "Event Staff",
        rating: 4.8,
        reviews: 127,
        hourlyRate: 25,
        image: "https://i.pravatar.cc/150?img=12",
        verified: true
    },
    {
        id: 2,
        name: "Sarah Johnson",
        service: "Hospitality",
        rating: 4.9,
        reviews: 203,
        hourlyRate: 30,
        image: "https://i.pravatar.cc/150?img=5",
        verified: true
    },
    {
        id: 3,
        name: "Michael Brown",
        service: "Personal Assistant",
        rating: 4.7,
        reviews: 89,
        hourlyRate: 28,
        image: "https://i.pravatar.cc/150?img=13",
        verified: true
    },
    {
        id: 4,
        name: "Emily Davis",
        service: "Event Staff",
        rating: 4.9,
        reviews: 156,
        hourlyRate: 27,
        image: "https://i.pravatar.cc/150?img=9",
        verified: true
    },
    {
        id: 5,
        name: "David Wilson",
        service: "Hospitality",
        rating: 4.6,
        reviews: 94,
        hourlyRate: 26,
        image: "https://i.pravatar.cc/150?img=14",
        verified: true
    },
    {
        id: 6,
        name: "Lisa Anderson",
        service: "Personal Assistant",
        rating: 4.8,
        reviews: 112,
        hourlyRate: 29,
        image: "https://i.pravatar.cc/150?img=10",
        verified: true
    },
    {
        id: 7,
        name: "James Martinez",
        service: "Event Staff",
        rating: 4.7,
        reviews: 78,
        hourlyRate: 24,
        image: "https://i.pravatar.cc/150?img=15",
        verified: true
    },
    {
        id: 8,
        name: "Jennifer Taylor",
        service: "Hospitality",
        rating: 4.9,
        reviews: 189,
        hourlyRate: 31,
        image: "https://i.pravatar.cc/150?img=16",
        verified: true
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProviders();
    setupSmoothScrolling();
    setMinDate();
});

// Load service providers
function loadProviders() {
    const providersList = document.getElementById('providersList');
    if (!providersList) return;

    providersList.innerHTML = sampleProviders.map(provider => `
        <div class="bg-white rounded-lg shadow-lg p-6 card-hover text-center">
            <img src="${provider.image}" alt="${provider.name}" class="w-24 h-24 rounded-full mx-auto mb-4">
            <h3 class="text-xl font-bold mb-2">${provider.name}</h3>
            ${provider.verified ? '<span class="text-green-500 text-sm"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
            <p class="text-gray-600 mb-2">${provider.service}</p>
            <div class="flex justify-center items-center mb-2">
                <span class="text-yellow-500">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(provider.rating))}
                </span>
                <span class="ml-2 text-gray-600">${provider.rating} (${provider.reviews})</span>
            </div>
            <p class="text-purple-600 font-bold mb-4">$${provider.hourlyRate}/hour</p>
            <button onclick="bookProvider(${provider.id})" class="gradient-bg text-white px-6 py-2 rounded-lg hover:opacity-90 w-full">
                Book Now
            </button>
        </div>
    `).join('');
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('fixed')) {
        const modals = ['loginModal', 'registerModal', 'bookingModal'];
        modals.forEach(modalId => {
            if (event.target.id === modalId) {
                closeModal(modalId);
            }
        });
    }
});

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login
    console.log('Login attempt:', { email, password });

    // Store user data (in real app, this would be handled by backend)
    const userData = {
        email: email,
        loggedIn: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(userData));

    alert('Login successful!');
    closeModal('loginModal');

    // In a real app, redirect to dashboard
    updateUIForLoggedInUser();
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const userType = document.getElementById('registerUserType').value;
    const password = document.getElementById('registerPassword').value;

    // Validate password strength
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Simulate registration
    console.log('Registration:', { name, email, phone, userType });

    // Store user data
    const userData = {
        name: name,
        email: email,
        phone: phone,
        userType: userType,
        loggedIn: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(userData));

    alert('Registration successful! Welcome to ServicePro!');
    closeModal('registerModal');

    updateUIForLoggedInUser();
}

// Handle booking
function handleBooking(event) {
    event.preventDefault();

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.loggedIn) {
        alert('Please login to book a service');
        closeModal('bookingModal');
        openModal('loginModal');
        return;
    }

    const service = document.getElementById('bookingService').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const duration = document.getElementById('bookingDuration').value;
    const location = document.getElementById('bookingLocation').value;
    const details = document.getElementById('bookingDetails').value;

    // Create booking object
    const booking = {
        id: Date.now(),
        service: service,
        date: date,
        time: time,
        duration: duration,
        location: location,
        details: details,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // Store booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    console.log('Booking created:', booking);

    alert('Booking request submitted successfully! We will contact you shortly.');
    closeModal('bookingModal');

    // Reset form
    event.target.reset();
}

// Handle contact form
function handleContactForm(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    event.target.reset();
}

// Book specific provider
function bookProvider(providerId) {
    const provider = sampleProviders.find(p => p.id === providerId);
    if (provider) {
        console.log('Booking provider:', provider);
        openModal('bookingModal');

        // Pre-select service type based on provider
        const serviceSelect = document.getElementById('bookingService');
        if (serviceSelect) {
            const serviceValue = provider.service.toLowerCase().replace(' ', '-');
            serviceSelect.value = serviceValue;
        }
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.loggedIn) {
        // In a real app, update navigation to show user menu
        console.log('User logged in:', user.email);
    }
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Set minimum date for booking to today
function setMinDate() {
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Check login status on page load
(function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.loggedIn) {
        updateUIForLoggedInUser();
    }
})();

// Export functions for use in HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleBooking = handleBooking;
window.handleContactForm = handleContactForm;
window.bookProvider = bookProvider;
