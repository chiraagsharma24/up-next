import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

/**
 * Fetches data from Gemini API based on the provided prompt
 * @param {string} prompt - The prompt to send to Gemini API
 * @returns {Promise<any>} - The response from Gemini API
 */
export async function fetchGeminiData(prompt) {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from Gemini:", error);
    return null;
  }
}

/**
 * Fetches job market data for Indian cities
 * @param {string} timeframe - The timeframe to fetch data for (week, month, quarter, year)
 * @returns {Promise<Array>} - Array of job market data for Indian cities
 */
export async function fetchJobMarketData(timeframe = "month") {
  const prompt = `
    Generate a JSON array of job market data for major Indian cities.
    Include the following fields for each city: location, jobs (number of job openings), salary (average annual salary in rupees), and growth (percentage growth).
    Focus on the ${timeframe} timeframe.
    Return only the JSON array, no additional text.
    Example format:
    [
      { "location": "Bangalore", "jobs": 3500, "salary": 1200000, "growth": 18 },
      { "location": "Mumbai", "jobs": 2800, "salary": 1100000, "growth": 15 }
    ]
  `;

  return fetchGeminiData(prompt);
}

/**
 * Fetches salary insights for different roles in India
 * @param {string} role - The role to fetch salary data for
 * @returns {Promise<Array>} - Array of salary data for the specified role
 */
export async function fetchSalaryInsights(role = "Software Engineer") {
  const prompt = `
    Generate a JSON array of salary data for ${role} in India from 2019 to 2023.
    Include the following fields for each year: year and salary (average annual salary in rupees).
    Return only the JSON array, no additional text.
    Example format:
    [
      { "year": "2019", "salary": 850000 },
      { "year": "2020", "salary": 900000 },
      { "year": "2021", "salary": 950000 }
    ]
  `;

  return fetchGeminiData(prompt);
}

/**
 * Fetches company growth data for different industries in India
 * @param {string} industry - The industry to fetch company data for
 * @returns {Promise<Array>} - Array of company growth data for the specified industry
 */
export async function fetchCompanyGrowthData(industry = "IT Services") {
  const prompt = `
    Generate a JSON array of company growth data for the ${industry} industry in India.
    Include the following fields for each company: company (name), growth (percentage growth), hiring (number of open positions), and marketCap (market capitalization in billions of rupees).
    Return only the JSON array, no additional text.
    Example format:
    [
      { "company": "TCS", "growth": 25, "hiring": 50000, "marketCap": 1200 },
      { "company": "Infosys", "growth": 20, "hiring": 40000, "marketCap": 800 }
    ]
  `;

  return fetchGeminiData(prompt);
}

/**
 * Fetches skill demand data for different fields in India
 * @param {string} field - The field to fetch skill demand data for
 * @returns {Promise<Array>} - Array of skill demand data for the specified field
 */
export async function fetchSkillDemandData(field = "Software Development") {
  const prompt = `
    Generate a JSON array of skill demand data for ${field} in India.
    Include the following fields for each skill: skill (name), demand (demand score out of 100), growth (percentage growth), and salary (average annual salary in rupees).
    Return only the JSON array, no additional text.
    Example format:
    [
      { "skill": "Java", "demand": 90, "growth": 15, "salary": 1200000 },
      { "skill": "Python", "demand": 85, "growth": 20, "salary": 1150000 }
    ]
  `;

  return fetchGeminiData(prompt);
}

/**
 * Fetches course recommendations for a specific skill in both Hindi and English
 * @param {string} skill - The skill to fetch course recommendations for
 * @returns {Promise<Object>} - Object containing course recommendations in Hindi and English
 */
export async function fetchSkillCourses(skill = "JavaScript") {
  const prompt = `
    Generate a JSON object with course recommendations for learning ${skill} in both Hindi and English.
    Include the following structure:
    {
      "skill": "${skill}",
      "english": [
        {
          "title": "Course title",
          "provider": "Course provider/platform",
          "url": "Course URL",
          "level": "Beginner/Intermediate/Advanced",
          "rating": 4.5,
          "duration": "Course duration in hours"
        }
      ],
      "hindi": [
        {
          "title": "Course title in Hindi",
          "provider": "Course provider/platform",
          "url": "Course URL",
          "level": "Beginner/Intermediate/Advanced",
          "rating": 4.5,
          "duration": "Course duration in hours"
        }
      ]
    }
    Return only the JSON object, no additional text.
  `;

  return fetchGeminiData(prompt);
}

/**
 * Fetches LinkedIn profile optimization recommendations and suggested posts
 * @param {string} linkedinUrl - The LinkedIn profile URL
 * @param {string} targetPosition - The target position the user wants to apply for
 * @returns {Promise<Object>} - Object containing profile recommendations and suggested posts
 */
export async function fetchLinkedInOptimization(linkedinUrl, targetPosition) {
  const prompt = `
    Generate a JSON object with LinkedIn profile optimization recommendations for a user targeting the position of ${targetPosition}.
    Include the following structure:
    {
      "profile": {
        "headline": "An optimized LinkedIn headline for the target position",
        "summary": "An optimized LinkedIn summary/about section that highlights relevant skills and experience for the target position",
        "recommendations": [
          "Specific recommendation 1 for improving the profile",
          "Specific recommendation 2 for improving the profile",
          "Specific recommendation 3 for improving the profile"
        ]
      },
      "posts": [
        {
          "title": "Title of a suggested LinkedIn post",
          "content": "Content of the suggested LinkedIn post that would help establish expertise in the target position",
          "hashtags": ["#RelevantHashtag1", "#RelevantHashtag2", "#RelevantHashtag3"]
        },
        {
          "title": "Title of another suggested LinkedIn post",
          "content": "Content of another suggested LinkedIn post that would help establish expertise in the target position",
          "hashtags": ["#RelevantHashtag1", "#RelevantHashtag2", "#RelevantHashtag3"]
        },
        {
          "title": "Title of a third suggested LinkedIn post",
          "content": "Content of a third suggested LinkedIn post that would help establish expertise in the target position",
          "hashtags": ["#RelevantHashtag1", "#RelevantHashtag2", "#RelevantHashtag3"]
        }
      ]
    }
    Return only the JSON object, no additional text.
  `;

  return fetchGeminiData(prompt);
}

/**
 * Generates ATS-optimized resume content based on job description and user input
 * @param {Object} params - Parameters for resume generation
 * @param {string} params.jobDescription - The job description to optimize for
 * @param {Object} params.userInput - The user's resume input
 * @param {string} params.targetRole - The target role
 * @returns {Promise<Object>} - Optimized resume content
 */
export async function generateATSResume({ jobDescription, userInput, targetRole }) {
  const prompt = `
    As an expert ATS resume optimizer, analyze the following job description and user input to generate an ATS-optimized resume.
    
    Job Description:
    ${jobDescription}
    
    Target Role: ${targetRole}
    
    User Input:
    ${JSON.stringify(userInput, null, 2)}
    
    Generate a JSON object with the following structure:
    {
      "summary": "An ATS-optimized professional summary that highlights relevant experience and skills",
      "skills": ["List of ATS-optimized skills extracted from job description and user input"],
      "experience": [
        {
          "title": "Job title",
          "company": "Company name",
          "duration": "Duration",
          "achievements": ["ATS-optimized achievement statements with metrics"]
        }
      ],
      "education": [
        {
          "degree": "Degree name",
          "institution": "Institution name",
          "year": "Year",
          "details": "Relevant coursework or achievements"
        }
      ],
      "projects": [
        {
          "name": "Project name",
          "description": "ATS-optimized project description with metrics",
          "technologies": ["List of technologies used"]
        }
      ],
      "keywords": ["List of important keywords from the job description"],
      "suggestions": ["List of specific improvements to make the resume more ATS-friendly"]
    }
    
    Requirements:
    1. Use industry-standard section headings
    2. Include quantifiable achievements with metrics
    3. Match keywords from the job description
    4. Use action verbs at the start of bullet points
    5. Keep formatting simple and consistent
    6. Avoid tables, images, or complex formatting
    7. Use standard fonts and clear section breaks
    
    Return only the JSON object, no additional text.
  `;

  return fetchGeminiData(prompt);
} 