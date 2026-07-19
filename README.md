# Plethora 
<img src="./frontend/public/og-preview.gif" alt="Header image" width="100%" height="auto">
Plethora is a digital release valve designed for the public, anonymous offloading of personal burdens—whether emotional, relational, or existential. It's built on the premise that while the things we carry feel deeply isolating, the act of releasing them doesn't have to be.

The visual language reflects this tension: a glitched, futuristic nature aesthetic layered over minimalist brutalism. It’s raw, stark, and unpolished by design, stripping away the noise of typical social platforms to leave only the unvarnished signal.

---

## Premise 

This architecture was shaped by three specific constraints that dictate both the system's structure and the user's psychology. 

*   **The Human Truth: "No one should do this alone"**
    This is the foundation of the platform. Plethora exists because carrying things in isolation is inherently heavy. The app provides a space to externalize internal weight.

*   **The Behavioral Twist: "Every action is publicly visible"**
    Total anonymity meets total exposure. When an issue is uploaded, it isn't locked away; it is thrust out into the open. You are completely unnamed, but you are entirely perceived. This creates a strange, shared vulnerability—everyone is speaking into the void, but the void is watching back.

*   **The Build Constraint: "There is no search bar"**
    This is the most critical structural mechanism of the app. By removing the ability to search, we remove the user's ability to curate, filter, or hunt for specific content. You cannot seek out people who share your exact problem. Instead, you are confronted with a collective, uncurated stream of human experience exactly as it arrives. It forces serendipity, demands presence, and prevents the platform from becoming a tool for confirmation bias.

---

## Architecture & Setup

The interface mirrors the mechanics: functional, immediate, and slightly dissonant. The project is split into isolated frontend and backend environments to keep the underlying dependencies clean.

**To run locally:**

1. Clone the repository to your local machine.
2. Navigate into the `server` directory.
3. Run `npm install` to install backend dependencies, then start the server.
4. Open a second terminal and navigate into the `frontend` directory.
5. Run `npm install` to install the UI dependencies.
6. Start the Vite development server with `npm run dev`.
