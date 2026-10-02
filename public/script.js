document.addEventListener("DOMContentLoaded", () => {

    const workEntries = [
        {
            title: "Studio Portfolio",
            subtitle: "Brand identity / Web design",
            tones: [
                "#ece5dd",
                "#f5f1ed",
                "#d7d1ca",
                "rgba(17,17,17,0.06)"
            ]
        },
        {
            title: "Monolith Studio",
            subtitle: "Brand system / Campaign",
            tones: [
                "#e9edf0",
                "#f4f5f7",
                "#c9d2d9",
                "rgba(17,17,17,0.05)"
            ]
        },
        {
            title: "Harbor Works",
            subtitle: "Product story / UX direction",
            tones: [
                "#eae1d8",
                "#f3efe9",
                "#d5c7ba",
                "rgba(17,17,17,0.06)"
            ]
        },
        {
            title: "Northline Lab",
            subtitle: "Digital platform / Strategy",
            tones: [
                "#e8ebea",
                "#f4f6f6",
                "#c9d1d0",
                "rgba(17,17,17,0.05)"
            ]
        }
    ];

    const previewCard = document.querySelector(".hero-panel");
    const previewTitle = document.querySelector(".hero-panel-meta strong");
    const previewSubtitle = document.querySelector(".hero-panel-meta small");

    if (previewCard && previewTitle && previewSubtitle) {
        const selected = workEntries[Math.floor(Math.random() * workEntries.length)];

        previewTitle.textContent = selected.title;
        previewSubtitle.textContent = selected.subtitle;

        previewCard.style.setProperty("--project-surface-1", selected.tones[0]);
        previewCard.style.setProperty("--project-surface-2", selected.tones[1]);
        previewCard.style.setProperty("--project-surface-3", selected.tones[2]);
        previewCard.style.setProperty("--project-accent", selected.tones[3]);
    }

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const progress = document.getElementById("pageProgress");
    const backTop = document.querySelector(".back-to-top");
    const glow = document.getElementById("cursorGlow");


    /* ========================================
       Scroll UI
       ======================================== */

    const updateScrollUI = () => {

        const y = window.scrollY;

        header.classList.toggle(
            "scrolled",
            y > 30
        );


        if (backTop) {

            backTop.classList.toggle(
                "visible",
                y > 700
            );

        }


        const max =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (progress) {

            progress.style.width =
                `${max > 0 ? (y / max) * 100 : 0}%`;

        }

    };


    window.addEventListener(
        "scroll",
        updateScrollUI,
        { passive:true }
    );

    updateScrollUI();



    /* ========================================
       Mobile Menu
       ======================================== */

    menuToggle.addEventListener("click", () => {

        const active =
            nav.classList.toggle("active");


        menuToggle.setAttribute(
            "aria-expanded",
            String(active)
        );

    });


    document.querySelectorAll(".nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });



    /* ========================================
       Smooth Scroll
       ======================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    header.offsetHeight;


                window.scrollTo({
                    top:targetPosition,
                    behavior:"smooth"
                });

            }
        );

    });



    /* ========================================
       Reveal Animation
       ======================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section-heading," +
            ".about-grid," +
            ".skill-group," +
            ".service," +
            ".process-step," +
            ".work," +
            ".contact-inner"
        );


    animatedElements.forEach(el => {

        el.classList.add("reveal");

    });


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:.12
            }
        );


    animatedElements.forEach(el => {

        observer.observe(el);

    });



    /* ========================================
       Desktop Cursor Glow
       ======================================== */

    if (
        glow &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                glow.style.left =
                    `${event.clientX}px`;

                glow.style.top =
                    `${event.clientY}px`;

                glow.style.opacity = "1";

            },
            { passive:true }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                glow.style.opacity = "0";

            }
        );

    }



    /* ========================================
       Preparing Links
       ======================================== */

    document
        .querySelectorAll(".about-channel.is-preparing")
        .forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

            });

        });

});