
  const selectAll = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-id]');

  // 1. Select / Deselect all
  selectAll.addEventListener("change", function () {
    checkboxes.forEach(cb => {
      cb.checked = selectAll.checked;
    });
  });

  // 2. If user manually checks/unchecks rows
  checkboxes.forEach(cb => {
    cb.addEventListener("change", function () {
      const allChecked = Array.from(checkboxes).every(c => c.checked);
      const noneChecked = Array.from(checkboxes).every(c => !c.checked);

      // update master checkbox state
      if (allChecked) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
      } 
      else if (noneChecked) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
      } 
      else {
        // partial selection state (very important UX)
        selectAll.indeterminate = true;
      }
    });
  });

  
 const filterBtn = document.getElementById("filterBtn");
const overlay = document.getElementById("overlay");
const closeFilter = document.getElementById("closeFilter");

// open modal
filterBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

// close with X
closeFilter.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// close when clicking outside
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("hidden");
  }
});

filterBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});

closeFilter.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});