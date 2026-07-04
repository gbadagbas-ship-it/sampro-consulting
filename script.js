// ============================================
// SCRIPT COMPLET — SAMPRO Consulting
// ============================================

(function() {
    'use strict';

    // ============================================
    // 1. SCROLL REVEAL
    // ============================================
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    function checkReveals() {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveals);
    window.addEventListener('load', checkReveals);

    // ============================================
    // 2. HEADER SCROLL
    // ============================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // 3. MOBILE MENU
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    function toggleMobile() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobile);
    if (mobileClose) mobileClose.addEventListener('click', toggleMobile);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMobile);
    });

    // ============================================
    // 4. THEME TOGGLE (Clair / Sombre)
    // ============================================
    const themeToggle = document.getElementById('themeToggle');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀' : '☽';
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ============================================
    // 5. LANGUE TOGGLE (FR / EN)
    // ============================================
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');
    const mobileLangBtn = document.getElementById('mobileLangBtn');

    const translations = {
        fr: {
            home: 'Accueil',
            about: 'À propos',
            services: 'Services',
            testimonials: 'Témoignages',
            contact: 'Contact',
            heroDesc: 'SAMPRO Consulting est un cabinet de formation, de conseil et de solutions digitales, spécialisé dans la formation linguistique, le développement des compétences, la communication, le digital et l\'accompagnement stratégique des particuliers, entreprises et institutions.',
            ctaServices: 'Découvrir nos services',
            ctaContact: 'Nous contacter',
            slogan: 'Parler avec assurance, inspirer avec passion, impacter avec conviction',
            aboutTag: 'Qui sommes-nous ?',
            aboutSub: 'Découvrez l\'essence de SAMPRO Consulting à travers notre mission, nos valeurs et notre engagement.',
            aboutP1: 'SAMPRO Consulting est une structure basée à Lomé, engagée dans le développement des compétences linguistiques, communicationnelles, professionnelles et digitales, avec une approche humaine, pratique et orientée résultats.',
            aboutP2: 'Nous croyons que la maîtrise de la communication, des langues et des outils modernes est aujourd\'hui un levier essentiel de réussite personnelle et professionnelle.',
            missionTitle: 'Notre mission',
            missionText: 'Accompagner les individus et les organisations à mieux communiquer, mieux se former et mieux se structurer, grâce à des solutions adaptées, accessibles et durables.',
            visionTitle: 'Notre vision',
            visionText: 'Devenir une référence en formation linguistique, informatique, développement des compétences et transformation digitale au Togo et en Afrique.',
            val1: 'Excellence & Professionnalisme',
            val1desc: 'Nous visons l\'excellence dans chaque projet avec rigueur et dévouement.',
            val2: 'Pédagogie & Impact',
            val2desc: 'Des méthodes modernes pour des résultats concrets et durables.',
            val3: 'Innovation & Adaptation',
            val3desc: 'Toujours à la pointe des nouvelles technologies et des méthodes.',
            val4: 'Proximité & Écoute',
            val4desc: 'Un accompagnement personnalisé et humain au cœur de notre approche.',
            val5: 'Discipline & Vision',
            val5desc: 'Une approche structurée pour des résultats pérennes.',
            founderQuote: 'Chaque projet est une opportunité d\'impact, et chaque apprenant mérite les outils pour construire son avenir avec confiance.',
            founderName: 'DEGBEDJI Koffi Samuel, Fondateur & CEO',
            galleryTag: 'Notre univers',
            gallerySub: 'Découvrez l\'univers de SAMPRO Consulting à travers nos formations, séminaires et réalisations.',
            valuesTag: 'Nos piliers',
            servicesTag: 'Notre expertise',
            servicesSub: 'Une gamme complète de services pour répondre à tous vos besoins en formation et développement.',
            dept1: 'Formation Linguistique',
            dept1desc: 'Anglais, français, chinois — cours généraux, professionnels et coaching personnalisé.',
            dept2: 'Développement des Compétences',
            dept2desc: 'Séminaires, leadership, prise de parole, orientation scolaire et coaching.',
            dept3: 'Marketing Digital & Stratégie',
            dept3desc: 'Stratégies de visibilité, création de contenu, gestion de pages professionnelles.',
            dept4: 'Informatique & Solutions Digitales',
            dept4desc: 'Création de sites web, maintenance, formation aux outils numériques.',
            dept5: 'Communication Visuelle & Design',
            dept5desc: 'Logos, affiches, flyers, bannières, identité visuelle et direction artistique.',
            dept6: 'Impression & Production',
            dept6desc: 'Supports de communication, tableaux photo, encadrements et impression.',
            dept7: 'Conseil, Innovation & Projets Spéciaux',
            dept7desc: 'Accompagnement stratégique, projets éducatifs et sociaux.',
            deptTag: 'Nos départements',
            priority: 'Pôle prioritaire',
            dept1desc2: 'Anglais, français, chinois — traduction et interprétation.',
            dept2desc2: 'Séminaires, leadership, coaching, orientation.',
            dept3desc2: 'Visibilité, contenu, réseaux sociaux.',
            dept4desc2: 'Sites web, maintenance, formation.',
            dept5desc2: 'Logos, affiches, identité visuelle.',
            dept6desc2: 'Supports événementiels, encadrements.',
            dept2tag: 'Développement',
            dept3tag: 'Stratégie',
            dept4tag: 'Technologie',
            dept5tag: 'Créatif',
            dept6tag: 'Production',
            dept7tag: 'Innovation',
            ctaTitle: 'Prêt à transformer votre vision ?',
            ctaDesc: 'Nos experts sont à votre écoute pour concrétiser vos projets.',
            ctaBtn: 'Discuter de mon projet',
            directorTag: 'Leadership',
            directorSub: 'Découvrez le parcours et la vision du fondateur qui guide notre excellence.',
            testTag: 'Témoignages',
            testSub: 'Des retours authentiques de personnes qui ont fait confiance à SAMPRO Consulting.',
            test1: '"La formation en anglais business m\'a permis de négocier des contrats internationaux avec confiance. L\'approche personnalisée a fait toute la différence."',
            test1role: 'Directeur, Logistique',
            test2: '"Le site web créé par SAMPRO Consulting a boosté nos ventes de 200% en seulement 3 mois. Une équipe professionnelle et à l\'écoute."',
            test2role: 'Fondatrice, E-commerce',
            test3: '"Une expérience d\'apprentissage exceptionnelle. Les professeurs sont compétents et toujours disponibles. Je recommande vivement !"',
            test3name: 'Étudiant en Master',
            test3role: 'Université de Lomé',
            contactTag: 'Contactez-nous',
            contactSub: 'Une question ? Un projet ? Nous sommes là pour vous accompagner.',
            addressLabel: 'Adresse',
            address: 'Djidjolé, Lomé — Togo',
            phoneLabel: 'Téléphone',
            hoursLabel: 'Horaires',
            hours: 'Lun - Ven : 8h00 - 20h00',
            hoursSat: 'Sam : 9h00 - 14h00 (sur rendez-vous)',
            followUs: 'Suivez-nous',
            formTitle: 'Envoyez-nous un message',
            formDesc: 'Remplissez ce formulaire et nous vous répondrons sous 24h.',
            nameLabel: 'Nom complet',
            subjectLabel: 'Sujet',
            selectSubject: 'Sélectionnez un sujet',
            subject1: 'Formation linguistique',
            subject2: 'Solutions digitales',
            subject3: 'Marketing digital',
            subject4: 'Design graphique',
            subject5: 'Conseil stratégique',
            subject6: 'Autre demande',
            messageLabel: 'Message',
            sendBtn: 'Envoyer le message',
            newsletter: 'Je souhaite recevoir la newsletter',
            formNote: 'Vos données sont protégées et ne seront jamais partagées.',
            ctaBonusTitle: 'Besoin d\'une consultation gratuite ?',
            ctaBonusDesc: 'Réservez un appel de 30 minutes pour discuter de vos besoins spécifiques.',
            ctaBonusBtn: 'Réserver maintenant',
            footerDesc: 'Leader du conseil et de la formation à Lomé. Nous accompagnons les professionnels et les étudiants dans la maîtrise des langues et des outils digitaux.',
            navTitle: 'Navigation',
            formationsTitle: 'Formations',
            formation1: 'Anglais Business',
            formation2: 'Marketing Digital',
            formation3: 'Développement Web',
            formation4: 'Leadership & Management',
            formation5: 'Préparation TOEFL / IELTS',
            contactTitle: 'Contact',
            rights: 'Tous droits réservés',
            legal1: 'Mentions légales',
            legal2: 'Politique de confidentialité'
        },
        en: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            testimonials: 'Testimonials',
            contact: 'Contact',
            heroDesc: 'SAMPRO Consulting is a training, consulting and digital solutions firm, specializing in language training, skills development, communication, digital and strategic support for individuals, businesses and institutions.',
            ctaServices: 'Discover our services',
            ctaContact: 'Contact us',
            slogan: 'Speak with confidence, inspire with passion, impact with conviction',
            aboutTag: 'Who are we?',
            aboutSub: 'Discover the essence of SAMPRO Consulting through our mission, values and commitment.',
            aboutP1: 'SAMPRO Consulting is a structure based in Lomé, committed to the development of language, communication, professional and digital skills, with a human, practical and results-oriented approach.',
            aboutP2: 'We believe that mastering communication, languages and modern tools is now an essential lever for personal and professional success.',
            missionTitle: 'Our mission',
            missionText: 'To support individuals and organizations to communicate better, train better and structure better, through adapted, accessible and sustainable solutions.',
            visionTitle: 'Our vision',
            visionText: 'To become a reference in language training, IT, skills development and digital transformation in Togo and Africa.',
            val1: 'Excellence & Professionalism',
            val1desc: 'We aim for excellence in every project with rigor and dedication.',
            val2: 'Pedagogy & Impact',
            val2desc: 'Modern methods for concrete and lasting results.',
            val3: 'Innovation & Adaptation',
            val3desc: 'Always at the forefront of new technologies and methods.',
            val4: 'Proximity & Listening',
            val4desc: 'Personalized and human support at the heart of our approach.',
            val5: 'Discipline & Vision',
            val5desc: 'A structured approach for sustainable results.',
            founderQuote: 'Every project is an opportunity for impact, and every learner deserves the tools to build their future with confidence.',
            founderName: 'DEGBEDJI Koffi Samuel, Founder & CEO',
            galleryTag: 'Our universe',
            gallerySub: 'Discover the world of SAMPRO Consulting through our training, seminars and achievements.',
            valuesTag: 'Our pillars',
            servicesTag: 'Our expertise',
            servicesSub: 'A complete range of services to meet all your training and development needs.',
            dept1: 'Language Training',
            dept1desc: 'English, French, Chinese — general, professional and coaching courses.',
            dept2: 'Skills Development',
            dept2desc: 'Seminars, leadership, public speaking, academic guidance and coaching.',
            dept3: 'Digital Marketing & Strategy',
            dept3desc: 'Visibility strategies, content creation, professional page management.',
            dept4: 'IT & Digital Solutions',
            dept4desc: 'Website creation, maintenance, training in digital tools.',
            dept5: 'Visual Communication & Design',
            dept5desc: 'Logos, posters, flyers, banners, visual identity and artistic direction.',
            dept6: 'Printing & Production',
            dept6desc: 'Communication supports, photo boards, framing and printing.',
            dept7: 'Consulting, Innovation & Special Projects',
            dept7desc: 'Strategic support, educational and social projects.',
            deptTag: 'Our departments',
            priority: 'Priority',
            dept1desc2: 'English, French, Chinese — translation and interpretation.',
            dept2desc2: 'Seminars, leadership, coaching, guidance.',
            dept3desc2: 'Visibility, content, social networks.',
            dept4desc2: 'Websites, maintenance, training.',
            dept5desc2: 'Logos, posters, visual identity.',
            dept6desc2: 'Event supports, framing.',
            dept2tag: 'Development',
            dept3tag: 'Strategy',
            dept4tag: 'Technology',
            dept5tag: 'Creative',
            dept6tag: 'Production',
            dept7tag: 'Innovation',
            ctaTitle: 'Ready to transform your vision?',
            ctaDesc: 'Our experts are ready to support you in achieving your goals.',
            ctaBtn: 'Discuss my project',
            directorTag: 'Leadership',
            directorSub: 'Discover the journey and vision of the founder who guides our excellence.',
            testTag: 'Testimonials',
            testSub: 'Authentic feedback from people who have trusted SAMPRO Consulting for their development.',
            test1: '"The business English training allowed me to negotiate international contracts with confidence. The personalized approach made all the difference."',
            test1role: 'Director, Logistics',
            test2: '"The website created by SAMPRO Consulting boosted our sales by 200% in just 3 months. A professional and attentive team."',
            test2role: 'Founder, E-commerce',
            test3: '"An exceptional learning experience. The teachers are competent and always available. I highly recommend!"',
            test3name: 'Master\'s Student',
            test3role: 'University of Lomé',
            contactTag: 'Contact us',
            contactSub: 'A question? A project? We are here to support you.',
            addressLabel: 'Address',
            address: 'Djidjolé, Lomé — Togo',
            phoneLabel: 'Phone',
            hoursLabel: 'Hours',
            hours: 'Mon - Fri : 8:00 AM - 8:00 PM',
            hoursSat: 'Sat : 9:00 AM - 2:00 PM (by appointment)',
            followUs: 'Follow us',
            formTitle: 'Send us a message',
            formDesc: 'Fill out this form and we will get back to you within 24 hours.',
            nameLabel: 'Full name',
            subjectLabel: 'Subject',
            selectSubject: 'Select a subject',
            subject1: 'Language training',
            subject2: 'Digital solutions',
            subject3: 'Digital marketing',
            subject4: 'Graphic design',
            subject5: 'Strategic consulting',
            subject6: 'Other request',
            messageLabel: 'Message',
            sendBtn: 'Send message',
            newsletter: 'I wish to receive the newsletter',
            formNote: 'Your data is protected and will never be shared.',
            ctaBonusTitle: 'Need a free consultation?',
            ctaBonusDesc: 'Book a 30-minute call to discuss your specific needs.',
            ctaBonusBtn: 'Book now',
            footerDesc: 'Leader in consulting and training in Lomé. We support professionals and students in mastering languages and digital tools.',
            navTitle: 'Navigation',
            formationsTitle: 'Trainings',
            formation1: 'Business English',
            formation2: 'Digital Marketing',
            formation3: 'Web Development',
            formation4: 'Leadership & Management',
            formation5: 'TOEFL / IELTS Preparation',
            contactTitle: 'Contact',
            rights: 'All rights reserved',
            legal1: 'Legal notices',
            legal2: 'Privacy policy'
        }
    };

    let currentLang = 'fr';

    function setLanguage(lang) {
        currentLang = lang;
        langLabel.textContent = lang.toUpperCase();
        if (mobileLangBtn) {
            mobileLangBtn.textContent = lang.toUpperCase() + ' / ' + (lang === 'fr' ? 'EN' : 'FR');
        }

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key] !== undefined) {
                if (el.tagName === 'OPTION') {
                    el.textContent = translations[lang][key];
                } else if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT') {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage(currentLang === 'fr' ? 'en' : 'fr');
        });
    }

    if (mobileLangBtn) {
        mobileLangBtn.addEventListener('click', function() {
            setLanguage(currentLang === 'fr' ? 'en' : 'fr');
        });
    }

    // ============================================
    // 6. TESTIMONIALS CAROUSEL — AUTOMATIC
    // ============================================
    (function() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        let currentIndex = 0;
        let intervalId = null;
        let isTransitioning = false;
        const DELAY = 3000;

        if (slides.length === 0) return;

        function showSlide(index) {
            if (isTransitioning) return;
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            if (index === currentIndex) return;

            isTransitioning = true;

            slides[currentIndex].classList.remove('active');
            slides[currentIndex].classList.add('exit');

            const newSlide = slides[index];
            newSlide.classList.remove('exit');
            newSlide.classList.add('active');

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;

            setTimeout(() => {
                slides.forEach(s => s.classList.remove('exit'));
                isTransitioning = false;
            }, 700);
        }

        function nextSlide() {
            if (!isTransitioning) {
                showSlide((currentIndex + 1) % slides.length);
            }
        }

        function startAutoplay() {
            stopAutoplay();
            intervalId = setInterval(nextSlide, DELAY);
        }

        function stopAutoplay() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (index !== currentIndex) {
                    showSlide(index);
                    resetAutoplay();
                }
            });
        });

        const carousel = document.querySelector('.testimonial-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        }

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        showSlide(0);
        startAutoplay();

        console.log('🔄 Carrousel témoignages activé — changement toutes les 3 secondes');
    })();

    // ============================================
    // 7. MODALS — OUVERTURE / FERMETURE
    // ============================================
    (function() {
        const deptItems = document.querySelectorAll('.dept-item');
        const modals = document.querySelectorAll('.modal');
        const modalCloses = document.querySelectorAll('.modal-close');

        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function closeAllModals() {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }

        deptItems.forEach((item) => {
            const modalId = item.getAttribute('data-modal');
            if (modalId) {
                item.addEventListener('click', function(e) {
                    if (e.target.closest('a')) return;
                    openModal(modalId);
                });
            }
        });

        modalCloses.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    closeModal(modal);
                }
            });
        });

        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    closeModal(modal);
                }
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });

        document.querySelectorAll('.modal-content').forEach(content => {
            content.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        console.log('📦 Système de modales activé');
    })();

    // ============================================
    // 8. SERVICE DETAIL — OUVERTURE / FERMETURE
    // ============================================
    (function() {
        const discoverLinks = document.querySelectorAll('.service-card .link, .dept-item .link');
        const serviceDetails = document.querySelectorAll('.service-detail');
        const servicesSection = document.querySelector('.section-services');

        function openServiceDetail(serviceId) {
            serviceDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            const target = document.getElementById(serviceId);
            if (target) {
                target.classList.add('active');
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        window.closeServiceDetail = function() {
            serviceDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        discoverLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const serviceId = this.getAttribute('data-service');
                if (serviceId) {
                    openServiceDetail(serviceId);
                } else {
                    const card = this.closest('.service-card');
                    if (card) {
                        const index = Array.from(document.querySelectorAll('.service-card')).indexOf(card) + 1;
                        openServiceDetail('service-detail-' + index);
                    }
                }
            });
        });

        document.querySelectorAll('.service-card').forEach((card, index) => {
            const link = card.querySelector('.link');
            if (link && !link.hasAttribute('data-service')) {
                link.setAttribute('data-service', 'service-detail-' + (index + 1));
            }
        });

        document.querySelectorAll('.dept-item').forEach((item, index) => {
            const link = item.querySelector('.link');
            if (link && !link.hasAttribute('data-service')) {
                link.setAttribute('data-service', 'service-detail-' + (index + 1));
            }
        });

        console.log('📄 Système de pages détaillées activé');
    })();

    // ============================================
    // 9. CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = currentLang === 'fr' ?
                '✅ Merci ! Votre message a été envoyé. Nous vous répondrons sous 24h.' :
                '✅ Thank you! Your message has been sent. We will get back to you within 24 hours.';
            alert(msg);
            this.reset();
        });
    }

    // ============================================
    // 10. SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 11. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    console.log('🚀 SAMPRO Consulting — Version Professionnelle chargée !');

})();


// envoie du formulaire dans whatsdapp

// ============================================
// FORMULAIRE — ENVOI VERS WHATSAPP
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupérer les valeurs des champs
        const nom = this.querySelector('input[type="text"]')?.value || '';
        const telephone = this.querySelector('input[type="tel"]')?.value || '';
        const email = this.querySelector('input[type="email"]')?.value || '';
        const sujet = this.querySelector('select')?.value || 'Non précisé';
        const message = this.querySelector('textarea')?.value || '';
        const newsletter = this.querySelector('#newsletter')?.checked ? 'Oui' : 'Non';

        // Construire le message WhatsApp
        const texte = `📩 *NOUVEAU MESSAGE DEPUIS LE SITE SAMPRO CONSULTING*

👤 *Nom complet :* ${nom}
📞 *Téléphone :* ${telephone}
📧 *Email :* ${email}
📌 *Sujet :* ${sujet}
📬 *Newsletter :* ${newsletter}

💬 *Message :*
${message}

---
Envoyé depuis le formulaire de contact du site SAMPRO Consulting.`;

        // Encoder le message pour l'URL
        const messageEncoded = encodeURIComponent(texte);

        // Numéro WhatsApp (remplace par le bon numéro)
        const numeroWhatsApp = '22892557424';

        // URL WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${messageEncoded}`;

        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(urlWhatsApp, '_blank');

        // Réinitialiser le formulaire
        this.reset();

        // Message de confirmation
        const msg = currentLang === 'fr' ?
            '✅ Votre message a été préparé. Vous allez être redirigé vers WhatsApp pour l\'envoyer.' :
            '✅ Your message has been prepared. You will be redirected to WhatsApp to send it.';
        alert(msg);
    });
}