(async () => {
    const prams = new URLSearchParams(window.location.search);
    const projectId = prams.get('id');

    try {
        const projectData = await fetch('assets/data/projects.json')

        const projects = await projectData.json()

        const projectDetails = projects.find(item => item.id.toString() === projectId);

        if (projectDetails) {
            const desc_data = await fetch(projectDetails.description);
            const projectDesc = await desc_data.text();
            const projectDescElement = marked.parse(projectDesc);
            const projectImages = projectDetails.images.map(image => {
                return `<div class="swiper-slide">
                            <img src="${image}" alt="">
                        </div>`;
            }).join('');

            document.getElementById('project_description').innerHTML = projectDescElement;
            document.getElementById('project_category').innerText = projectDetails.category;
            document.getElementById('project_date').innerText = projectDetails.date;
            document.getElementById('project_url').innerText = projectDetails.url;
            document.getElementById('project_url').href = projectDetails.github_url;
            document.getElementById('project_github_btn').href = projectDetails.github_url;

            document.getElementById('project_images').innerHTML = projectImages;
        }

    } catch (error) {
        console.log(error);
    }
})()