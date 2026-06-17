/**
 * EcoSort AI - AI-Ready Service Layer
 * 
 * This service handles waste image analysis.
 * Strict Mode: Live API Only (Google Gemini 2.5 Flash Vision)
 * Supports: Multiple Item Detection & AI Waste Coach Advisor Insights.
 */

// Helper to check for configured API Key
export const getApiKey = () => {
  // 1. Check localStorage first (allows user configuration via Settings UI)
  const localKey = localStorage.getItem('gemini_api_key');
  if (localKey && localKey.trim() !== '') {
    return localKey.trim();
  }
  
  // 2. Check Vite env variables (.env)
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'your_gemini_api_key_here' && envKey.trim() !== '') {
    return envKey.trim();
  }
  
  return null;
};

// Helper to convert File to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Client-side rate limiting to protect Gemini API key quota
const checkRateLimit = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  const scanTimestampsStr = localStorage.getItem('ecosort_scan_timestamps');
  let timestamps = scanTimestampsStr ? JSON.parse(scanTimestampsStr) : [];
  
  // Filter out timestamps older than 1 minute
  timestamps = timestamps.filter(time => time > oneMinuteAgo);
  
  // Enforce limit: Max 5 scans per minute
  const MAX_SCANS = 5;
  if (timestamps.length >= MAX_SCANS) {
    const oldestRemaining = timestamps[0];
    const secondsToWait = Math.ceil((oldestRemaining + 60000 - now) / 1000);
    throw new Error(`Rate Limit Exceeded: To protect API quotas, you are limited to ${MAX_SCANS} scans per minute. Please wait ${secondsToWait} seconds before scanning again.`);
  }
  
  // Record current scan timestamp
  timestamps.push(now);
  localStorage.setItem('ecosort_scan_timestamps', JSON.stringify(timestamps));
};

/**
 * Classifies all waste items in an image file using Gemini Vision API
 * @param {File} imageFile - The uploaded image file
 * @returns {Promise<Object>} - Waste classification results containing a list of detected items
 */
export const classifyWasteImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  // Enforce rate limiting
  checkRateLimit();

  // Check if API key is active
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file or click the Settings gear icon to configure it.");
  }

  try {
    const base64Data = await fileToBase64(imageFile);
    
    const prompt = `
      You are an expert AI Sustainability Advisor for EcoSort AI, supporting SDG 12 (Responsible Consumption and Production).
      Analyze the uploaded image. Detect ALL distinct waste items present in the frame.
      
      You MUST return a JSON object containing a "detectedItems" key, which holds an array of all detected items. 
      Each item in the array MUST contain EXACTLY these keys:
      {
        "detectedItems": [
          {
            "item": "Specific name of the waste item detected (e.g. Plastic Water Bottle, Aluminum Coke Can, Organic Banana Peel, Corrugated Cardboard Shipping Box, Lithium-ion Phone Battery)",
            "category": "One of these exact strings: Plastic, Paper, Glass, Metal, Organic, E-Waste, Landfill",
            "confidence": "Estimated model confidence as a percentage (e.g., '95%')",
            "sustainabilityScore": A number from 0 to 100 representing how recyclable or compostable this item is. It MUST equal the sum of recyclabilityScore + reusePotentialScore + carbonReductionScore + contaminationRiskScore,
            "circularityRating": "Circularity letter grade based on lifecycle (A+, A, B, C, D, or F)",
            "sustainabilityScoreBreakdown": {
              "recyclabilityScore": A number from 0 to 40 reflecting recovery network maturity,
              "recyclabilityExplanation": "A short sentence explaining the recyclability score based on current industrial technologies.",
              "reusePotentialScore": A number from 0 to 20 reflecting product reuse capacity,
              "reusePotentialExplanation": "A short sentence explaining the reuse potential score.",
              "carbonReductionScore": A number from 0 to 20 reflecting secondary manufacturing offsets,
              "carbonReductionExplanation": "A short sentence explaining the carbon reduction benefits.",
              "contaminationRiskScore": A number from 0 to 20 reflecting sorting complexity and residue tolerance (lower score means higher contamination hazard, e.g. 5/20 indicates severe contamination risk, while 20/20 means zero risk),
              "contaminationRiskExplanation": "A short sentence explaining the contamination risk and how to avoid it."
            },
            "co2Reduction": "Estimated CO2 savings in kg preventing it from entering landfill (e.g. '0.08 kg')",
            "waterSaved": "Estimated water saved by recycling/composting this item (e.g. '12.5 L')",
            "energySaved": "Estimated energy saved by recycling/composting this item (e.g. '0.45 kWh')",
            "landfillPrevented": "Estimated landfill waste prevented by weight (e.g. '150g')",
            "estimatedCompletionTime": "Estimated time in minutes to complete proper disposal steps (e.g. '2 mins')",
            "recommendations": [
              "First disposal/preparation recommendation (e.g. Empty and rinse the bottle thoroughly.)",
              "Second disposal/preparation recommendation (e.g. Remove the cap if required by local recycling guidelines.)",
              "Third disposal/preparation recommendation (e.g. Place the bottle in the recyclable waste bin.)"
            ],
            "contaminationRisk": "Must be one of these exact strings: Low, Medium, High",
            "contaminationExplanation": "A short sentence explaining why this item is a contamination risk (e.g., Leftover carbonated liquids attract pests and degrade sorting sensor accuracy.)",
            "circularEconomyJourney": [
              "Phase 1 (e.g., 'PET Bottle')",
              "Phase 2 (e.g., 'Collection')",
              "Phase 3 (e.g., 'Sorting')",
              "Phase 4 (e.g., 'Processing')",
              "Phase 5 (e.g., 'New Products')"
            ],
            "whatHappensNext": [
              {
                "step": "Name of step (e.g., 'Collection', 'Sorting Facility', 'Cleaning', 'PET Flake Processing', 'Polyester Fiber Production', 'New Clothing')",
                "description": "Short explanation of the step (e.g. Materials are gathered from smart collection points.)",
                "icon": "One of these exact strings mapping to lucide icons: truck, factory, droplet, sprout, leaf, shieldalert, cpu, battery, zap, shirt, box, wrench, recycle, trash"
              }
            ],
            "circularityInsight": "A sentence explaining how this material can be processed back into the economy (e.g., PET plastic is shredded, melted, and spun into polyester fiber or new food-grade containers.)",
            "sustainabilityImpact": "A sentence detailing the ecological benefit of sorting this item correctly (e.g., Prevents plastic particles from entering landfills and conserves raw crude oil consumption.)",
            "ecoTip": "An actionable suggestion to reduce purchase of this item or upcycle it (e.g., Transition to reusable stainless steel containers.)",
            "commonMistake": "Explain a common sorting mistake users make with this item (e.g., Leaving plastic caps screwed on or leaving liquids inside the bottle, which interferes with automated sorting weight sensors.)",
            "sdgContribution": "Specify which SDG 12 sub-target this sorting action matches (e.g., 'SDG 12.5 - Waste Prevention & Recycling' or 'SDG 12.3 - Minimizing Food Losses')"
          }
        ]
      }
      
      Do not return markdown text surrounding the JSON. Output only the pure JSON structure.
    `;

    // Call Gemini 2.5 Flash Vision API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageFile.type || "image/jpeg",
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Invalid Request. Check if the image format is valid.");
      } else if (response.status === 403) {
        throw new Error("API Key Invalid. Please check your Gemini API key credentials.");
      } else if (response.status === 503) {
        throw new Error("Google Gemini API is temporarily overloaded or unavailable (HTTP 503). This is a Google server busy state. Please wait a few seconds and try clicking 'Analyze' again.");
      } else if (response.status === 429) {
        throw new Error("Gemini API Rate Limit Exceeded (HTTP 429). The free tier allows 15 requests per minute. Please wait a moment and try again.");
      } else {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
      throw new Error("Model was unable to classify this image. Please try a clearer picture.");
    }

    const responseText = data.candidates[0].content.parts[0].text;
    const parsedResult = JSON.parse(responseText);

    if (!parsedResult.detectedItems || !Array.isArray(parsedResult.detectedItems)) {
      throw new Error("Invalid response format from classification model.");
    }

    return parsedResult;
  } catch (error) {
    console.error("Live classification failed:", error);
    throw error;
  }
};
