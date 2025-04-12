/**
 * Fetches career stories with pagination and filtering
 * @param {number} page - The page number to fetch
 * @param {Object} filters - Filter options
 * @param {string} filters.search - Search term for role or company
 * @param {string} filters.collegeTier - College tier filter (tier1, tier2, tier3, any)
 * @param {string} filters.experience - Experience level filter (internship, entry, mid, senior, any)
 * @returns {Promise<Object>} - The response containing stories, hasMore flag, and total count
 */
export async function fetchCareerStories(page = 1, filters = {}) {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append("page", page.toString());
    
    if (filters.search) {
      params.append("search", filters.search);
    }
    
    if (filters.collegeTier) {
      params.append("collegeTier", filters.collegeTier);
    }
    
    if (filters.experience) {
      params.append("experience", filters.experience);
    }
    
    // Fetch data from API
    const response = await fetch(`/api/stories?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching career stories:", error);
    throw error;
  }
} 