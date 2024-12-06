// Idea 1: Simplified Form Validation

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("volunteer-form");
    const fnameInput = document.getElementById("fname");
    const lnameInput = document.getElementById("lname");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const fnameError = document.getElementById("fname-error");
    const lnameError = document.getElementById("lname-error");
    const emailError = document.getElementById("email-error");

    // Function to validate individual fields
    const validateField = (input, errorElement, validationFn, errorMessage) => {
        if (!validationFn(input.value)) {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    };

    // Validation functions
    const isNotEmpty = (value) => value.trim() !== "";
    const isEmail = (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    // Real-time validation
    fnameInput.addEventListener("input", () => {
        validateField(
            fnameInput,
            fnameError,
            isNotEmpty,
            "First name is required."
        );
    });

    lnameInput.addEventListener("input", () => {
        validateField(
            lnameInput,
            lnameError,
            isNotEmpty,
            "Last name is required."
        );
    });

    emailInput.addEventListener("input", () => {
        validateField(
            emailInput,
            emailError,
            isEmail,
            "Please enter a valid email address."
        );
    });

    // Form submission handler
    form.addEventListener("submit", (event) => {
        const isFnameValid = validateField(
            fnameInput,
            fnameError,
            isNotEmpty,
            "First name is required."
        );

        const isLnameValid = validateField(
            lnameInput,
            lnameError,
            isNotEmpty,
            "Last name is required."
        );

        const isEmailValid = validateField(
            emailInput,
            emailError,
            isEmail,
            "Please enter a valid email address."
        );

        // If any validation fails, prevent form submission
        if (!isFnameValid || !isLnameValid || !isEmailValid) {
            event.preventDefault();
        }
    });
});


// Idea 2: Advanced Filtering Options

 <!-- JavaScript for Filters -->
    <script>
        document.getElementById('applyFilters').addEventListener('click', () => {
            // Initialize filters object
            const filters = {};

            // Age Group Filter
            const ageGroupSelect = document.getElementById('ageGroup');
            const selectedAgeGroups = Array.from(ageGroupSelect.selectedOptions).map(option => option.value);
            if (selectedAgeGroups.length > 0) {
                filters.ageGroup = selectedAgeGroups;
            }

            // Weekend Only Filter
            const weekendOnly = document.getElementById('weekendOnly').checked;
            filters.weekendOnly = weekendOnly;

            // Timeframe Filter
            const timeframe = document.getElementById('timeframe').value;
            if (timeframe) {
                filters.timeframe = timeframe;
            }

            // Apply Filters to Event Cards
            const eventCards = document.querySelectorAll('.event-card');
            let visibleCount = 0;

            eventCards.forEach(card => {
                const cardAgeGroup = card.getAttribute('data-age-group').split(',');
                const cardTimeframe = card.getAttribute('data-timeframe');
                const cardWeekend = card.getAttribute('data-weekend') === 'true';

                let matches = true;

                // Check Age Group Filter
                if (filters.ageGroup && !filters.ageGroup.some(group => cardAgeGroup.includes(group))) {
                    matches = false;
                }

                // Check Weekend Only Filter
                if (filters.weekendOnly && !cardWeekend) {
                    matches = false;
                }

                // Check Timeframe Filter
                if (filters.timeframe && filters.timeframe !== cardTimeframe) {
                    matches = false;
                }

                // Show or Hide Card
                if (matches) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Display the number of matching results
            alert(`${visibleCount} event(s) found.`);
        });


// Idea 3: Autocomplete Search

// Function to apply filters to the activity list
function applyFilters() {
    const ageRange = document.getElementById("age-range").value;
    const activityType = document.getElementById("activity-type").value;

    // Get all activity list items
    const activities = document.querySelectorAll("#activity-list .activity");

    activities.forEach(activity => {
        const activityAge = activity.getAttribute("data-age");
        const activityTypeValue = activity.getAttribute("data-type");

        // Apply filtering logic
        if ((ageRange === "all" || ageRange === activityAge) && (activityType === "all" || activityType === activityTypeValue)) {
            activity.style.display = "block";  // Show the activity
        } else {
            activity.style.display = "none";  // Hide the activity
        }
    });
}

// Initial filter application when the page loads
document.addEventListener("DOMContentLoaded", () => {
    applyFilters();  // Apply filters on page load to show all activities
});


// Countdown timer
<script>
        // Countdown Logic
        const countDownDate = new Date("Dec 17, 2024 16:30:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("demo").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s `;
        };

        const x = setInterval(updateCountdown, 1000);

        // Filter Events Logic
        const applyFilters = () => {
            const ageGroup = document.getElementById("ageGroup").selectedOptions;
            const weekendOnly = document.getElementById("weekendOnly").checked;
            const timeframe = document.getElementById("timeframe").value;

            // Get all event cards
            const eventCards = document.querySelectorAll(".event-card");

            // Loop through all events and apply the filters
            eventCards.forEach(card => {
                const ageGroupData = card.getAttribute("data-age-group").split(',');
                const cardTimeframe = card.getAttribute("data-timeframe");
                const cardWeekend = card.getAttribute("data-weekend") === 'true';

                let matchesFilters = true;

                // Check Age Group Filter
                const selectedAgeGroups = Array.from(ageGroup).map(option => option.value);
                if (!selectedAgeGroups.some(group => ageGroupData.includes(group))) {
                    matchesFilters = false;
                }

                // Check Weekend Filter
                if (weekendOnly && !cardWeekend) {
                    matchesFilters = false;
                }

                // Check Timeframe Filter
                if (timeframe !== "all" && timeframe !== cardTimeframe) {
                    matchesFilters = false;
                }

                // Show or Hide the event card based on the filters
                if (matchesFilters) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        };

        document.getElementById("applyFilters").addEventListener("click", applyFilters);
    </script>

