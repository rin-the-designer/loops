# Prototype 2

For my second prototype, I want to have AI invovled. I want to use the GPT API to come up with a short single-paragraph text on absurdity.

## Interface

1. `Background-color: black; font-family: Inter; color: white;`
2. Date and time `DD Mon YYYY, HH:MM:SS` (24-hour format) shown on left bottom corner, updates every second
3. Location `City, Country` shown on center bottom
4. Version `vnnnn` shown on bottom right corner, starting from v0001
5. History icon (clock) shown on top right corner. Opens a card grid view with:
   - timestamp
   - location of creation
   - text generated
   - version number (id)
6. Previous generated text shown above current text at 60% opacity (hidden when empty)
7. Current text shown in center at full opacity (1.8rem font size)

## Interaction

1. **Generate** new text when user presses Enter
2. **Hide** previous text during generation
3. **Display** with typing animation (20ms per character)
4. **Wait 30 seconds** after generation completes
5. **Transition**: Current text dims to 60% opacity (1 second transition)
6. **Move** current text to previous position, show "Press Enter to generate" prompt again
7. **Save** all generation data (version, timestamp, location, text) to Supabase

## GPT Prompt Configuration

### Model

- `gpt-4.1`
- Temperature: `0.9` (high creativity for variety)
- Max tokens: `180` (~110 words, short complete paragraph)
- Frequency penalty: `0.7` (strongly discourage word/phrase repetition)
- Presence penalty: `0.5` (encourage topic diversity)

### System Prompt

```
You are a writer of brief, poetic vignettes about ordinary life. Write like a short story in miniature - capturing a moment, a character, a small scene. Reveal how mundane, repetitive, seemingly meaningless moments can hold subtle acts of ownership, agency, or personal meaning. Never use the words 'absurdity', 'agency', 'existential', or 'meaning' directly. Show through imagery, action, and observation. Avoid didactic statements. Write in present tense. Be specific and sensory.
```

### User Prompt (with random variables)

```
Write a brief vignette (3-4 sentences) set [RANDOM_CONTEXT]. Draw inspiration from [RANDOM_PHILOSOPHICAL_ANGLE]. Capture a mundane, repetitive, or seemingly meaningless moment, then reveal a subtle way someone finds ownership, choice, or personal significance within it. Use concrete details, actions, and imagery. No moral, no question, no explanation - just the moment itself.
```

### Randomization Strategy

Each generation randomly selects:

- **1 of 5** philosophical angles
- **1 of 32** contexts
- **Total combinations: 160 unique perspective/context pairs**

Combined with high frequency (0.7) and presence (0.5) penalties, this system is optimized for generating thousands of unique results with minimal repetition.

### Random Variables

**Philosophical Angles:** (5 options)

- Camus - focus on the absurd and finding joy in repetition
- Sartre - focus on bad faith, authenticity, and self-deception
- Nietzsche - focus on eternal return and will to power
- Heidegger - focus on being and the everyday-ness of existence
- Simone de Beauvoir - focus on freedom within constraint

**Contexts:** (32 options)

- at work
- at home alone
- in public spaces
- with technology
- in nature
- with other people
- during a commute
- in a waiting room
- at a grocery store
- doing household chores
- on social media
- in a conversation
- while eating alone
- getting ready in the morning
- before falling asleep
- during a meeting
- at a cafe
- in a parking lot
- watching TV
- doing paperwork
- in an elevator
- at the gym
- walking down the street
- sitting in silence
- organizing belongings
- making a phone call
- looking in the mirror
- waiting for someone
- during a mundane task
- in a moment of boredom
- in a lecture
- on the subway

### Writing Style

**Vignette Format:**

- Short story in miniature (3-4 sentences)
- Present tense
- Captures a specific moment, character, or scene
- Shows action and imagery
- No moral, no question, no explanation - just the moment

**Show, Don't Tell:**

- Reveal themes through concrete details
- Use sensory language (sight, sound, touch, taste, smell)
- Focus on actions, not abstractions
- Let the reader draw their own conclusions

**Narrative Elements:**

- Can feature a character ("she", "he", "they", or "you")
- Specific setting and situation
- Mundane/repetitive moment as the setup
- Subtle act of agency/ownership/meaning as the reveal
- Like watching a scene unfold

### Themes (embedded through story, not stated)

- Repetition and meaningless loops
- Mundane, overlooked moments
- Absurdity of routine
- Small acts of ownership
- Personal significance in the ordinary
- Choice within constraint
- Making something "yours" in a generic world

### Approach

- Write as narrative vignettes, not philosophical reflections
- Focus on ONE specific moment or scene
- Use concrete, sensory details (colors, sounds, textures, movements)
- Show a character doing something mundane
- Reveal the subtle way they make it meaningful or their own
- Avoid philosophical jargon entirely
- Avoid overused topics (morning coffee, alarms, kettles)
- Avoid didactic or preachy tone
- Each philosopher provides a different narrative lens

## Structure

### Database (Supabase)

**Table: `absurdity_texts`**

```sql
CREATE TABLE IF NOT EXISTS absurdity_texts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version_number INTEGER NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  location TEXT NOT NULL,
  generated_text TEXT NOT NULL
);

CREATE INDEX idx_version_number ON absurdity_texts(version_number);
CREATE INDEX idx_timestamp ON absurdity_texts(timestamp DESC);

ALTER TABLE absurdity_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
ON absurdity_texts FOR SELECT
USING (true);

CREATE POLICY "Allow public insert access"
ON absurdity_texts FOR INSERT
WITH CHECK (true);
```

**Features:**

- Stores all generated texts with metadata
- Auto-incrementing version numbers
- Timestamp with timezone for accurate sorting
- Location tracking (city, country)
- RLS enabled for security (public read/write allowed)
- Indexes for fast queries on version and timestamp

### Tech Stack

**Frontend:**

- Pure HTML/CSS/JavaScript (no frameworks)
- Supabase JS Client (CDN)
- Inter font family from Google Fonts
- Responsive design with CSS Grid (history page)
- CSS transitions and animations

**Backend/API:**

- OpenAI GPT-4.1 API (direct fetch calls)
- Supabase for database operations
- IP geolocation API (ipapi.co) for location detection

**File Structure:**

```
prototype-02/
├── index.html          # Main HTML structure
├── style.css           # All styling (279 lines)
├── script.js           # All logic (370 lines)
├── prompt.md           # This documentation
├── local.env           # Local API keys (gitignored)
├── .gitignore          # Git ignore rules
└── api/
    └── generate.js     # Vercel serverless function (optional, for deployment)
```

### Current Setup (Local Development)

**All credentials hardcoded in source:**

- `OPENAI_API_KEY` - hardcoded in `script.js`
- `SUPABASE_URL` - hardcoded in `script.js`
- `SUPABASE_ANON_KEY` - hardcoded in `script.js`

**Why:**

- Designed for local development only
- No Vercel serverless functions needed
- Direct API calls from browser
- Simple and fast for prototyping

**Security Note:**

- ⚠️ OpenAI API key is exposed in client-side code
- ✅ Supabase anon key is safe to expose (protected by RLS)
- 🚫 Not recommended for production deployment without serverless proxy

### Deployment (If Needed)

For production deployment to Vercel:

1. **Option A: Use serverless functions** (recommended)

   - Move OpenAI API calls to `/api/generate.js`
   - Set `OPENAI_API_KEY` as Vercel environment variable
   - Keep Supabase credentials client-side (safe with RLS)

2. **Option B: Keep current setup**
   - Accept that API key is visible in browser
   - Use OpenAI usage limits and monitoring
   - Replace key if compromised

**Vercel Environment Variables:**

- `OPENAI_API_KEY` - Keep server-side only
- `SUPABASE_URL` - Can be client-side
- `SUPABASE_ANON_KEY` - Can be client-side
