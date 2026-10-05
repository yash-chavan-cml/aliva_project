const serviceInfo = [
    {
        key: 'blood-tests',
        name: 'Blood Tests',
        icon: 'fa-solid fa-droplet',
        iconClass: 'icon-blood',
        image: 'images/blood-test.webp',
        badge: 'Routine & Wellness',
        colorClass: 'tag-blood',
        description: 'Precision-led blood testing for CBC, infections, metabolic markers, and everyday wellness checks.',
        tests: ['Complete Blood Count (CBC)', 'Fasting Blood Sugar', 'Lipid / Cholesterol Profile', 'Vitamin D & B12 Panels', 'Liver Function Tests (LFT)']
    },
    {
        key: 'urine-tests',
        name: 'Urine Tests',
        icon: 'fa-solid fa-vial',
        iconClass: 'icon-urine',
        image: 'images/urine-test.webp',
        badge: 'Clinical Screening',
        colorClass: 'tag-urine',
        description: 'Routine urine screening that supports early detection, infection checks, and general kidney & metabolic monitoring.',
        tests: ['Routine Urine Examination (Microscopic)', 'Urine Culture & Sensitivity', 'Urine Albumin & Protein', 'Sugar & Ketone Body Screen']
    },
    {
        key: 'diabetes-tests',
        name: 'Diabetes Tests',
        icon: 'fa-solid fa-chart-line',
        iconClass: 'icon-diabetes',
        image: 'images/diabetes-test.webp',
        badge: 'Metabolic Health',
        colorClass: 'tag-diabetes',
        description: 'Track your glucose health with evidence-based diabetes screening and complete metabolic insight.',
        tests: ['Fasting Blood Glucose', 'Post-Prandial (PP) Glucose', 'HbA1c (3-Month Sugar Average)', 'Insulin Resistance Profile']
    },
    {
        key: 'thyroid-tests',
        name: 'Thyroid Tests',
        icon: 'fa-solid fa-dna',
        iconClass: 'icon-thyroid',
        image: 'images/thyroid-test.webp',
        badge: 'Hormone Balance',
        colorClass: 'tag-thyroid',
        description: 'Understand thyroid health with focused hormone tests that support energy, metabolism, and endocrine balance.',
        tests: ['Thyroid Stimulating Hormone (TSH)', 'Total & Free T3', 'Total & Free T4', 'Anti-TPO Antibody Panel']
    },
    {
        key: 'full-body-checkup',
        name: 'Full Body Checkup',
        icon: 'fa-solid fa-heart-pulse',
        iconClass: 'icon-fullbody',
        image: 'images/full-body-checkup.webp',
        badge: 'Complete Package',
        colorClass: 'tag-fullbody',
        description: 'A complete preventive screening package designed for early detection, organ health, and long-term care.',
        tests: ['Full Blood Panel (60+ Parameters)', 'Kidney & Liver Function Panels', 'Cardiac Lipid Profile', 'Diabetes & Thyroid Screening', 'Deficiency & Electrolyte Panel']
    },
    {
        key: 'health-checkup',
        name: 'Health Checkup',
        icon: 'fa-solid fa-shield-heart',
        iconClass: 'icon-health',
        image: 'images/health-checkup.webp',
        badge: 'Preventive Care',
        colorClass: 'tag-health',
        description: 'Smart general wellness testing for individuals and families wanting a clearer, holistic picture of overall health.',
        tests: ['Routine Wellness Blood Screen', 'Blood Pressure & Vital Signs Assessment', 'Basic Metabolic Screening', 'Preventive Health Scorecard']
    },
    {
        key: 'pathology-tests',
        name: 'Pathology Tests',
        icon: 'fa-solid fa-flask',
        iconClass: 'icon-pathology',
        image: 'images/pathology-test.webp',
        badge: 'Advanced Lab',
        colorClass: 'tag-pathology',
        description: 'Reliable pathology and molecular diagnostics for precise clinical diagnosis, monitoring, and treatment planning.',
        tests: ['Clinical Biochemistry & Hematology', 'Microbiology & Serology Testing', 'Immunology & Special Assays', 'Cytopathology & Tissue Diagnostics']
    },
    {
        key: 'home-sample-collection',
        name: 'Home Sample Collection',
        icon: 'fa-solid fa-house-medical',
        iconClass: 'icon-home',
        image: 'images/home-sample-collection.webp',
        badge: 'Doorstep Care',
        colorClass: 'tag-home',
        description: 'Safe, punctual, and comfortable sample collection at home by certified phlebotomists with temperature-controlled transit.',
        tests: ['Certified Phlebotomist Home Visit', '100% Sterile Single-Use Vacuum Tubes', 'Temperature-Controlled Sample Transit', 'Digital Report Delivery in 12–24h']
    }
];

const serviceInfoByKey = Object.fromEntries(serviceInfo.map((service) => [service.key, service]));
const serviceKeyLookup = Object.fromEntries(serviceInfo.map((service) => [service.name, service.key]));

function applyServiceRendering() {
    const serviceOptions = document.querySelectorAll('.service-option');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailList = document.getElementById('detail-list');
    const detailIcon = document.querySelector('.detail-icon');
    const detailImg = document.getElementById('detail-image');
    const detailBadge = document.getElementById('detail-badge');

    if (!serviceOptions.length || !detailTitle || !detailDescription || !detailList || !detailIcon) {
        return;
    }

    const defaultKey = 'blood-tests';
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get('service');
    const selectedKey = serviceInfoByKey[requestedService] ? requestedService : defaultKey;
    const selectedService = serviceInfoByKey[selectedKey];

    function renderService(service) {
        detailTitle.textContent = service.name;
        detailDescription.textContent = service.description;
        detailList.innerHTML = service.tests.map((test) => `<li>${test}</li>`).join('');
        detailIcon.className = `detail-icon ${service.iconClass}`;
        detailIcon.innerHTML = `<i class="${service.icon}"></i>`;
        if (detailImg) {
            detailImg.src = service.image;
            detailImg.alt = service.name;
        }
        if (detailBadge) {
            detailBadge.textContent = service.badge;
            detailBadge.className = `service-tag ${service.colorClass}`;
        }
    }

    renderService(selectedService);

    serviceOptions.forEach((option) => {
        const isActive = option.dataset.service === selectedKey;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-pressed', String(isActive));
    });

    serviceOptions.forEach((option) => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            const nextKey = option.dataset.service;
            const nextService = serviceInfoByKey[nextKey];
            if (!nextService) return;

            renderService(nextService);

            serviceOptions.forEach((item) => {
                const isActive = item === option;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            if (window.history && window.history.replaceState) {
                const newUrl = window.location.pathname + '?service=' + nextKey + (window.location.hash || '');
                window.history.replaceState(null, '', newUrl);
            }

            if (window.innerWidth <= 768) {
                const detailCard = document.querySelector('.service-detail-card');
                if (detailCard) {
                    detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    if (requestedService && serviceInfoByKey[requestedService]) {
        const directorySection = document.getElementById('service-directory');
        if (directorySection) {
            setTimeout(() => {
                directorySection.scrollIntoView({ behavior: 'smooth' });
            }, 80);
        }
    }
}

function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) return;
            const link = card.querySelector('a');
            if (link) {
                link.click();
            }
        });
    });
}

function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navPanel = document.querySelector('.nav-panel');

    if (menuToggle && navPanel) {
        menuToggle.addEventListener('click', (event) => {
            event.preventDefault();
            const isOpen = navPanel.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href) return;

                const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                const hashIndex = href.indexOf('#');
                const targetHash = hashIndex !== -1 ? href.substring(hashIndex) : null;
                const targetPage = hashIndex !== -1 ? href.substring(0, hashIndex) : href;

                const isCurrentPage = !targetPage || targetPage === currentPath;

                if (isCurrentPage && targetHash) {
                    const targetEl = document.querySelector(targetHash);
                    if (targetEl) {
                        event.preventDefault();
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                        if (window.history && window.history.replaceState) {
                            window.history.replaceState(null, '', href);
                        }
                    }
                }

                // Close mobile menu gracefully without breaking anchor navigation
                if (navPanel.classList.contains('open')) {
                    setTimeout(() => {
                        navPanel.classList.remove('open');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                    }, 120);
                }
            });
        });
    }
}

function setupForms() {
    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const button = form.querySelector('button[type="submit"]');
            if (!button) return;
            button.innerHTML = '<i class="fa-solid fa-check"></i> Request Received';
            button.style.background = 'var(--success)';
            button.style.borderColor = 'var(--success)';
            button.disabled = true;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    applyServiceRendering();
    setupServiceCards();
    setupForms();
});