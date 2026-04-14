

# ATS Score Checker

An AI-powered tool that analyzes your CV against a job description and provides a detailed compatibility report with actionable improvement tips.

## Page 1: Upload & Analyze

A single-page app with a vibrant, modern design featuring gradient accents and card-based layout.

**Left Panel — CV Upload**
- Drag-and-drop zone to upload a CV (PDF or text)
- Or paste CV text directly into a text area
- File preview showing the uploaded document name

**Right Panel — Job Description**
- Large text area to paste the full job description
- Placeholder text guiding the user on what to paste

**Analyze Button**
- Prominent, colorful CTA button at the bottom
- Shows a loading animation while AI processes the analysis

## Page 2: Results Dashboard

After analysis, a beautiful results page with:

**Overall ATS Score**
- Large circular/radial progress indicator showing the match percentage (0-100%)
- Color-coded: red (0-40%), yellow (41-70%), green (71-100%)

**Section Breakdown**
- Visual score cards for each category:
  - **Skills Match** — How well your skills align with the role
  - **Experience Relevance** — How relevant your work history is
  - **Education Fit** — Education requirements vs. your qualifications
  - **Keywords Match** — Presence of critical job-related keywords
- Each section shows a mini progress bar and score

**Improvement Tips**
- Prioritized list of actionable suggestions to boost your ATS score
- Each tip clearly explains what to change and why
- Tips are grouped by impact level (high, medium, low)

**Re-analyze**
- Button to go back and try with a different job description or updated CV

## Backend

- AI-powered analysis using Lovable AI (via edge function)
- The edge function receives the CV text and job description, sends them to the AI model for deep analysis, and returns structured results (score, breakdown, tips)
- CV file parsing handled client-side for text extraction

## Design Style
- Modern & colorful with gradient backgrounds and accent colors
- Card-based layout with subtle shadows and rounded corners
- Smooth animations for score reveals and transitions
- Responsive design for desktop and mobile

