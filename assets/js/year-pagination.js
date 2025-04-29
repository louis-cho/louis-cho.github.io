function toggleYear(id) {
    const container = document.getElementById(id);
    container.classList.toggle('hidden');
    if (!container.dataset.paginated) {
      paginateYear(container, 10); // 한 페이지에 10개씩 보여줌
      container.dataset.paginated = true;
    }
  }
  
  function paginateYear(container, itemsPerPage) {
    const items = container.querySelectorAll('.post-list li');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const controls = container.querySelector('.pagination-controls');
    let currentPage = 1;
  
    function showPage(page) {
      items.forEach((item, index) => {
        item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? '' : 'none';
      });
      controls.innerHTML = '';
  
      if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.disabled = (i === page);
          btn.onclick = () => {
            currentPage = i;
            showPage(currentPage);
          };
          controls.appendChild(btn);
        }
      }
    }
  
    showPage(currentPage);
  }
  