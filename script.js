const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

function closeMenu() {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Otwórz menu");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Zamknij menu" : "Otwórz menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});

const quoteForm = document.querySelector("#quoteForm");
const formStatus = document.querySelector("#formStatus");

quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = quoteForm.querySelector(".form-submit");
    const submitText = quoteForm.querySelector(".submit-text");

    formStatus.textContent = "";
    formStatus.className = "form-status";

    submitButton.disabled = true;
    submitText.textContent = "Wysyłanie...";

    setTimeout(() => {
        formStatus.textContent =
            "Dzięki. To formularz demonstracyjny — wiadomość nie została wysłana.";

        formStatus.classList.add("success");

        quoteForm.reset();

        submitButton.disabled = false;
        submitText.textContent = "Wyślij zapytanie";
    }, 600);
});