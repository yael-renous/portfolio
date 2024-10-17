document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.full-width-menu a');
    const descriptionArea = document.querySelector('.description');
    const imagesArea = document.querySelector('.images');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');

            // Get the section ID and update content
            const sectionId = item.getAttribute('href').substring(1);
            descriptionArea.textContent = `Description for ${sectionId}`;
            
            // Show description area and push other items down
            descriptionArea.style.display = 'block';
            descriptionArea.style.height = 'auto';
            
            // Optionally update images
            // imagesArea.innerHTML = `<img src="placeholder-image-for-${sectionId}.jpg" alt="${sectionId}">`;
        });
    });
});
