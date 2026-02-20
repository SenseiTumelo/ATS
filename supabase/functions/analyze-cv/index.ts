import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cvText, jobDescription } = await req.json();

    if (!cvText || !jobDescription) {
      return new Response(JSON.stringify({ error: "CV text and job description are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyzer. Analyze the provided CV against the job description and return a detailed compatibility report.

You MUST respond by calling the "ats_analysis" function with structured results. Do NOT respond with plain text.`;

    const userPrompt = `Analyze this CV against the job description:

--- CV ---
${cvText}

--- JOB DESCRIPTION ---
${jobDescription}

Provide an overall ATS compatibility score (0-100), section breakdowns for Skills Match, Experience Relevance, Education Fit, and Keywords Match, and actionable improvement tips grouped by impact level.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "ats_analysis",
              description: "Return the ATS analysis results",
              parameters: {
                type: "object",
                properties: {
                  overallScore: { type: "number", description: "Overall ATS score 0-100" },
                  sections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", enum: ["Skills Match", "Experience Relevance", "Education Fit", "Keywords Match"] },
                        score: { type: "number", description: "Section score 0-100" },
                        description: { type: "string", description: "Brief explanation of the score" },
                      },
                      required: ["name", "score", "description"],
                      additionalProperties: false,
                    },
                  },
                  tips: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        impact: { type: "string", enum: ["high", "medium", "low"] },
                        title: { type: "string", description: "Short tip title" },
                        description: { type: "string", description: "Detailed explanation" },
                      },
                      required: ["impact", "title", "description"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["overallScore", "sections", "tips"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "ats_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No structured response from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-cv error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
