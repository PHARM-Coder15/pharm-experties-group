/**
 * PHARM EXPERTIES GROUP - Central Search Functionality
 * Applies to PST, CMT, and CDT Hubs to filter modules based on user input.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get the search form and module list container
    const searchForm = document.querySelector('.search-form-lg');
    const moduleListContainer = document.getElementById('moduleList');
    
    // Check if both elements exist on the current page before proceeding
    if (!searchForm || !moduleListContainer) {
        // This page is not a module hub (e.g., it's index.html or contact.html)
        return; 
    }

    const searchInput = searchForm.querySelector('input[type="text"]');
    const moduleItems = moduleListContainer.querySelectorAll('.list-group-item');

    /**
     * Filters the module list based on the search input value.
     */
    function filterModules() {
        const query = searchInput.value.toLowerCase().trim();
        let resultsFound = false;

        moduleItems.forEach(item => {
            const title = item.querySelector('strong').textContent.toLowerCase();
            const description = item.querySelector('small')?.textContent.toLowerCase() || '';

            // Check if the query is present in the title or the description
            if (title.includes(query) || description.includes(query)) {
                item.style.display = 'flex'; // Show the item
                resultsFound = true;
            } else {
                item.style.display = 'none'; // Hide the item
            }
        });

        // Display a message if no results are found
        const noResultsMessageId = 'no-results-alert';
        let noResultsAlert = document.getElementById(noResultsMessageId);

        if (!resultsFound && query.length > 0) {
            if (!noResultsAlert) {
                noResultsAlert = document.createElement('div');
                noResultsAlert.id = noResultsMessageId;
                noResultsAlert.className = 'alert alert-warning text-center mt-4';
                noResultsAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> No modules found matching your search. Try a different keyword.';
                moduleListContainer.parentElement.appendChild(noResultsAlert);
            }
        } else {
            // Remove the no results alert if results are found or search is empty
            if (noResultsAlert) {
                noResultsAlert.remove();
            }
        }
    }

    // Attach event listeners
    // 1. Listen for typing changes (more interactive)
    searchInput.addEventListener('input', filterModules);

    // 2. Prevent the form from submitting and refreshing the page
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterModules(); // Run filter on button click as well
    });
});
