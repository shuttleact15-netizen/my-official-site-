document.addEventListener("DOMContentLoaded", () => {

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