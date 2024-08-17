function showContent(sectionId, element) {
    // Hide all sections
    const sections = document.querySelectorAll('.main-content > .container-fluid > .row > div.col-12');
    sections.forEach(section => {
        section.classList.add('d-none');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('d-none');
    }

    // Highlight the active link in the sidebar
    const links = document.querySelectorAll('.sidebar .nav-link');
    links.forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
}
