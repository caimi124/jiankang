// Search functionality for HerbScience.shop
document.addEventListener('DOMContentLoaded', function() {
  // Initialize search functionality
  const searchInputs = document.querySelectorAll('input[type="search"]');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      // Basic search implementation
      console.log('Searching for:', query);
    });
  });

  // Add search suggestions
  function initSearchSuggestions() {
    const suggestions = [
      'turmeric', 'ginseng', 'chamomile', 'ginger', 
      'anxiety', 'sleep', 'digestion', 'energy', 'immunity'
    ];
    
    return suggestions;
  }

  // Initialize search suggestions
  initSearchSuggestions();
}); 