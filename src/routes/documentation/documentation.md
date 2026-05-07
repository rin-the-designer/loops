# Abstract

# Introduction

## Concept

> #### The struggle itself toward the heights is enough to fill a man’s heart.</br>One must imagine Sisyphus happy.
>
> _The Myth of Sisyphus_</br>Albert Camus, 1942

_Loops_ is a collection of interactive digital artworks that explore the tension between involuntary repetition and chosen thresholds. In this documentation, _involuntary repetition_ refers to the continuous cycle of activities and circumstances people feel compelled to engage in or accept, and _chosen thresholds_ refers to the autonomy to shape actions and interpretations inside those patterns.

The collection currently holds nine interactive pieces. Each one ties to absurdism and to finding agency, the sense that people still have room to steer events even inside cycles that start to feel meaningless. Ordinary objects or actions sit behind each sketch, they are abstracted enough that viewers focus on the concept rather than the visuals.

_Loops_ runs in web browsers, so viewers can view it on their own devices, larger monitors, or projections scaled for installs. The layout is responsive, so interaction stays workable from handheld widths through room-sized setups. Displays nearer human scale (roughly 65 to 85 inches on the diagonal) deepen immersion, the feeling that viewers stand closer to the gestures and visuals on-screen. Because each piece borrows from familiar spaces and rituals, the context of installation shapes the experience. A piece installed in the environment it references will carry a different weight than the same work shown on a neutral screen.

The goal of this project is to invite viewers to reflect on their own loops and thresholds. The project suggests that, rather than resisting these loops, their presence might be accepted, their absurdity embraced, and agency reclaimed in the encounter. Individual pieces withhold a stipulated beginning, midpoint, or end, so viewers can engage and withdraw on their own terms. Though the sketches were designed with particular interactions in mind, nothing in their structure requires viewers to follow that script. Openness to exploration and reflection takes priority.

## Impetus

For a stretch of time during an intense phase of creative work, everything started to feel meaningless. The same questions kept circling: what is the meaning of any of this? What is the meaning of the products around us that promise a better experience, or claim to solve a problem we did not know we had? Are we just lazy beings who need a tool for everything? These existential loops became their own kind of trap, with no clear way through.

At some point, a different question surfaced: why not make a project out of this? Rather than resisting the feeling, the instinct became to confront it and build an interpretation of it.

That is when Camus returned. _Le Mythe de Sisyphe_ and _L'Étranger_, read in the original French during undergraduate coursework, are the two texts that remained most vividly from those years. Camus's absurdist philosophy had resonated then, though it slipped away as design took over. Feeling stuck pulled those readings back into focus, and they offered a frame for what was happening: not an answer, but a way to sit with the question.

The project began with a single interactive sketch, an abstracted version of the myth of Sisyphus rendered in a personal visual language. It became a natural intersection of three backgrounds carried separately until then: a BA in French, a BFA in Visual Design, and now an MFA in Design and Technology, which added code and interaction as a third layer.

The first prototype was spontaneous, written during a studio class. It did not take long to get something running. But the moment a hand moved and the sketch responded, something shifted. This could be a way to confront absurdity rather than escape it, to embrace meaninglessness by giving it a form that could be touched.

The initial conceptual frame was broader than where the project eventually landed. Loops were first connected to life and death: life as the space where involuntary repetitions are imposed, and death as the point where they end. From an eastern cultural perspective, that cycle of life and death is itself another loop, which opened the frame further. Two axes emerged from this thinking (human and code, life and death), and from their intersection four areas to explore: the interaction of life and death, loops from computer code, the death of computer code, and the translation of human loops into coded ones. Early research activities tested whether this framing resonated with others. The findings suggested that the life and death angle, while generative, was too broad and too dependent on individual and cultural background to anchor the work clearly. The focus narrowed to the loop itself, which is where the project has remained.

## Medium

```js
// a for loop in JavaScript
for (let i = 0; i < 5; i++) {
	console.log(i);
}
```

Computation is literally built out of repetition. In code, the same instructions run again and again until a condition shifts. That is exactly the kind of repetitions and thresholds this work is about. Code was chosen as the medium because it does not merely illustrate and visualize loops, it _performs_ them. The sketches in this piece are loops you can control, gestures you can steer, and rhythms you can interrupt.

The act of coding itself also aligns with the project. Writing code is an act of repetition: write, run, hit errors, revise, run again. By using code, the medium of the project also becomes another layer of repetition.

The decisive quality that separates code from other media is interactivity. A loop rendered in video or animation runs on its own timeline, independent of whoever watches it. A loop written in code can wait, respond, and change based on the presence and actions of the person in front of it. This distinction is central to what _Loops_ is trying to do. The work is not asking viewers to observe repetition from a distance; it is placing them inside it, letting their gestures become part of the cycle. Motion sensing, touch input, and mouse interaction are not decorative features; they are the mechanism through which the question of agency becomes something that can be felt rather than only read about.

The browser was chosen as the delivery platform because it makes this possible at any scale, from a personal screen to a room-sized projection, without requiring specialized hardware or a controlled installation environment.

## Significance

Repetition is one of the most ordinary features of contemporary life, yet in the flow of daily experience it is rarely paused over on its own terms. Daily routines, work schedules, and the looping structure of digital habits (feeds, notifications, queues) organize most of the day without being chosen in any meaningful sense. When these cycles become visible, they can feel empty or compulsory, and it is difficult to see where agency might reappear inside them.

_Loops_ matters because it makes this question tangible rather than abstract. By turning the loop into something that can be touched, steered, and reflected on, the collection invites viewers to notice the cycles they are already in and to consider what it might mean to act deliberately within them. This is not a therapeutic project or a productivity tool. It is closer to applied philosophy: a set of situations designed to make a normally invisible structure of experience available for thought.

The work also sits at an intersection that is still underexplored in design practice. Interactive art has tended to emphasize novelty, responsiveness, and feedback, while philosophical inquiry into repetition and absurdity has remained largely textual. _Loops_ occupies the space between those two traditions, using the formal properties of code (loops, conditions, thresholds) as both its medium and its argument. The fact that repetition is structurally embedded in the technology used to represent it is not incidental; it is the point.

For communities of practice in interaction design, media art, and applied philosophy, the project contributes a working example of what it looks like to treat reflection, rather than efficiency or entertainment, as a primary design outcome.

<br><br>

# Context

## Philosophy

Albert Camus's _Le Mythe de Sisyphe_ (1942) is the philosophical foundation of this project. Camus opens with the claim that the only truly serious philosophical question is whether life is worth living in the absence of any ultimate meaning. His answer is not despair but defiance: the absurd hero recognizes the futility of the task and continues anyway, finding sufficiency in the struggle itself. This is the logic that runs beneath _Loops_. Each sketch presents a task with no resolution, a cycle with no reward, and leaves the question of whether to continue entirely to the viewer. Camus's reading of Sisyphus also introduced the specific image that became the first piece in the collection: the boulder, the hill, and the endless return.

_L'Étranger_ (1942) contributed a different register of the same thinking. Meursault's detachment, his refusal to perform meaning he does not feel, and his confrontation with indifference in the world around him resonated with the emotional starting point of the project. Where _Le Mythe de Sisyphe_ is argument, _L'Étranger_ is atmosphere. Together they shaped both the conceptual frame and the affective tone the work aims to produce.

Gilles Deleuze's _Difference and Repetition_ (1968) offered a structural counterpoint to Camus. Where Camus treats repetition as a fact to be accepted, Deleuze argues that repetition is never simply the same thing recurring. Each iteration carries difference within it; what returns is not identical but transformed by the act of returning. This distinction informed how the individual pieces in _Loops_ were designed. The loops do not simply cycle; they accumulate, shift, and respond. The viewer who pushes the boulder a second time is not doing the same thing as the first time, even if the screen looks the same.

## Research

### Semi-Structured Interviews

A total of nine individuals participated in semi-structured interviews, each asked five fixed questions about how they perceive death. Questions included: "How would you define death?" and "In your cultural context, what does the concept of death entail?" The interviews were designed to explore whether the initial framing of loops through life and death connected with how others understood those concepts, and whether they intuitively related that cycle to the idea of repetition.

![Semi-structured interview documentation](static/documentation/images/interview.jpg)

The responses were varied. Some participants readily described life and death as a kind of loop, drawing on religious, cultural, or philosophical frameworks. Others did not make that connection at all, finding the link between mortality and repetition abstract or forced. The honest spread of responses was itself a finding: the life and death framing was too contingent on individual and cultural background to serve as a stable foundation for the work. This pushed the project toward the loop as a concept in its own right, separating it from its original anchor in mortality.

### Drawing as Elicitation

A group drawing session was conducted with six participants. Each was asked to draw shapes, groups of shapes, or objects that immediately came to mind when presented with the words "Death," "Life," and "Loops," in that order. The session was designed to gather visual rather than verbal intuitions about these concepts, and to observe whether shared visual languages emerged across participants.

![Participant drawings](static/documentation/images/elicitation-1.jpg)

The drawings revealed how differently people visualize the same words. "Death" and "Life" produced a wide range of imagery, personal, symbolic, and cultural, with little overlap between participants. "Loops," by contrast, produced more convergent responses: circular forms, spirals, and returning paths appeared across multiple drawings. This confirmed that the loop, as a visual and conceptual form, was more legible and more universally accessible than the life and death framing that had initially motivated it. The session directly reinforced the decision to center the project on the loop itself.

### Diary Study

Thirteen individuals were invited to participate in a diary study. Ten completed the prompt accurately, logging a total of 79 activities over at least three days. Participants were asked to observe and record things they noticed themselves repeating unconsciously: physical habits such as tapping or doodling, digital behaviors such as refreshing apps or checking notifications, and daily activities such as drinking coffee or going for a walk. Each entry included a date and time, a category (routine or habit), the action itself, associated emotions, and a short paragraph of thoughts.

<iframe src="https://thesis.rin.kim/research/diary-study/index.html" style="width= 100%; aspect-ratio: 16/9; border-radius: 4px;"></iframe>

The logged entries were then grouped into an affinity diagram organized across three clusters: emotions (ranging from boredom and stress to calm and joy), activity context (academic, digital, bodily, transit, and home), and activity type (consumption, digital interaction, fidgeting, physical routine, and self-maintenance). The diagram is available at [thesis.rin.kim/research/diary-study](https://thesis.rin.kim/research/diary-study/index.html).

The study revealed the range and texture of involuntary repetition in everyday life. Most logged activities were not dramatic or distressing; they were quiet, background behaviors that participants had rarely paused to notice until the prompt asked them to. The dominant emotions attached to these loops were neutral or calm rather than negative, suggesting that involuntary repetition is not inherently felt as a burden. It simply goes unexamined. This finding reinforced the project's focus on awareness and reflection rather than resistance or resolution. The affinity diagram also revealed that digital habits (scrolling, refreshing, checking) clustered heavily alongside bodily fidgeting, pointing toward the loops that feel most automatic and least chosen.

The study also surfaced a methodological insight: participants who were briefed in person logged more accurately and reflectively than those contacted remotely. The category distinction between routine and habit proved too narrow, as the two terms overlapped considerably and may have constrained how participants described their behavior.

### Drawing as Elicitation (Second Iteration)

Building on an earlier group drawing session, a second iteration was conducted with five participants working individually rather than collectively. The change in format was deliberate: in the first session, participants drew together in a shared space, which raised the possibility that visual choices were influenced by what others around them were drawing. By isolating each participant, this iteration aimed to examine whether similar patterns would emerge independently.

Participants were presented with four words in sequence, _absurdity_, _meaningful_, _error_, and _success_, each accompanied by its dictionary definition. They were asked to draw a pattern, rather than an object or scene, that came to mind for each word. After completing all four drawings, participants were asked to explain their intentions.

![Drawing session documentation](static/documentation/images/drawing.jpg)

![Participant drawings](static/documentation/images/elicitation-2.jpg)

The results were telling. For _absurdity_, participants consistently produced open, non-repeating, and visually irregular marks, even though their stated reasoning differed: one described randomness as freedom, another as an absence of rules, another as disruption of an existing pattern. For _meaningful_, most participants drew structured or layered forms, concentric circles, symmetrical arrangements, or patterns with a clear center. _Error_ and _success_ produced more varied responses, ranging from disconnected lines to mountain peaks to exclamation marks.

The key finding was that despite receiving identical definitions, participants arrived at visually similar patterns through distinctly different interpretations. The absurd looked roughly the same across participants even when the reasoning behind it did not. This gap between shared visual language and individual conceptual intent became the direct basis for the _Meaning_ piece in the collection, which takes that shared visual stereotype and inverts its labels.

## Precedents

### Digital Art

Rafaël Rozendaal's internet artworks exist as single-URL experiences: minimal, looping, and built entirely for the browser. Each piece reduces interaction to a small set of inputs that loop indefinitely, with no levels, no progress, and no ending. The works are publicly accessible to anyone with a link, treating the browser itself as a gallery. This approach (simple system, open-ended repetition, work that lives on the web) was a direct model for how _Loops_ is structured.[^1]

Zach Lieberman's practice sits at the intersection of code, performance, and visual systems. His generative works treat movement and form as ongoing processes rather than fixed images, showing how a simple rule applied repeatedly can produce something that feels alive. Lieberman's approach demonstrated that code can generate visual experience without narrative or resolution, just continuous unfolding.[^2]

### Canvas Art

Seo-bo Park's _Écriture_ series consists of thousands of canvases made through the same gesture repeated: a pencil or crayon drawn slowly across wet paint, leaving behind fine parallel lines. The work is less about the image produced than the discipline of the act itself. Each pass is slightly different; each canvas is a record of sustained attention. This kind of non-productive repetition is a precedent for how _Loops_ treats its own loops, not as a means to an end, but as the material itself.[^3]

Tschang-yeul Kim's _Water Drops_ series spans decades of paintings depicting the same subject: a single water drop, rendered with near-photographic stillness. The works accumulate across time, with hundreds, eventually thousands, of repetitions of the same image. Kim described the practice as a form of healing and forgetting after the trauma of the Korean War, returning to the same form until it released its charge. The repetition is not sameness but a slow working-through: a loop that changes even when the image does not.[^4]

Josef Albers applied the same compositional format (nested squares) to hundreds of canvases over decades in his _Homage to the Square_ series, changing only the colors. The format never changed; the discoveries came entirely from within the constraint. This kind of repetition-as-investigation, where the loop is fixed and variation lives inside it, is a structural parallel to several pieces in _Loops_.[^5]

Vera Molnár is among the earliest artists to use computers as a tool for generating visual form. Her work is built from simple rules applied iteratively, producing grids, curves, and structures that feel both systematic and restless. Crucially, she introduced deliberate errors into her algorithms (what she called _désordre_) to observe what randomness did to order. This tension between system and deviation maps directly onto the distinction this project draws between involuntary loops and chosen thresholds.[^6]

### Conceptual

Nam June Paik's _TV Buddha_ places a statue of the Buddha before a closed-circuit television showing a live feed of itself: the Buddha watching the Buddha, endlessly. Paik collapses the distance between the meditative and the technological, positioning an ancient symbol of stillness inside a live feedback loop. The loop here is not decorative; it is the subject. This work established a precedent for treating repetition and presence as the same question.[^7]

Hyunki Park's video installations use the loop as both form and content. Monitors in stacked arrangements run footage that is itself cyclical, images that return without resolving. The works are quiet and durational, asking viewers to sit with repetition long enough to notice what shifts inside it. Park's practice treats the loop as a meditative form rather than a limitation of the medium.[^8]

### Game

Bennett Foddy's _Getting Over It_ places a man in a cauldron, equipped only with a hammer, climbing an impossible mountain. Every fall can return the player to the beginning. The game is designed to frustrate, and Foddy narrates throughout, reflecting on failure, patience, and the psychology of repetition. It is one of the clearest contemporary parallels to the myth of Sisyphus: a purposeless task, endless return, and the question of whether the person doing it can find something in the repetition rather than against it.[^9]

SCKR Games' _Only Up!_ presents a single upward climb with no checkpoints. Falling from near the top returns the player to the ground. Like _Getting Over It_, the game strips away progress systems and leaves only the loop: attempt, fall, start again. The contrast with conventional game design, where progress always accumulates, makes the absence of that accumulation feel pointed. Both games ask what it means to keep trying when nothing carries forward.[^10]

[^1]: Rozendaal, Rafaël. _Internet Artworks_. Ongoing. www.newrafael.com/internet.

[^2]: Lieberman, Zach. _Circles, Blobs, Ripples_. 2023, Unit London, London.

[^3]: Park, Seo-bo. _Écriture_ series. 1967–present.

[^4]: Kim, Tschang-yeul. _Water Drops_ series. 1972–2021.

[^5]: Albers, Josef. _Homage to the Square_ series. 1950–1976.

[^6]: Molnár, Vera. _(Dés)Ordres_. 1974.

[^7]: Paik, Nam June. _TV Buddha_. 1974, Galerie Bonino, New York.

[^8]: Park, Hyunki. _Untitled (TV Stone Tower)_. 1979.

[^9]: Foddy, Bennett. _Getting Over It with Bennett Foddy_. Bennett Foddy, 2017.

[^10]: SCKR Games. _Only Up!_ SCKR Games, 2023.

<br><br>

# Project

## Overview

The Project section presents the nine pieces that make up _Loops_. Each piece is a self-contained interactive sketch, but the collection is designed to be read together. Across the nine works, repetition is approached from different angles: as struggle (_Myth of Sisyphus_), as transition (_Doors_), as quiet build-up (_Accumulation_), as ritual maintenance (_Zen Garden_), as slow disappearance (_Incense_), as play (_Playground Spinner_), as interpretation (_Meaning_), as cycle of light (_Not the Same Sun_), and as continuous flow (_Fountain_). No piece is meant to be definitive on its own. The argument lives in the overlap, in how repetition takes a different shape each time the question is asked.

A few principles run across the collection. Each piece is built from a deliberately reduced visual language, abstracted enough that attention stays on the concept rather than on imagery or decoration. Each piece runs as an open loop, without a beginning, midpoint, or ending that signals when to engage or disengage. And each piece is paired with at least one mode of interaction (mouse, touch, hand tracking, body or face tracking, or simple presence) chosen to match the gesture the work is asking the viewer to consider. None of the pieces require interaction to function; the loops continue regardless. Interaction is offered, not demanded.

Each entry below follows the same structure: a brief introduction to the concept and visual logic of the piece, a description of how it can be interacted with, a technical overview of how it is built, and a reflection drawn from observation and testing. The pieces are presented in roughly the order they were developed, beginning with _Myth of Sisyphus_, the first sketch, and ending with the two most recent works in progress.

## Installation

![Diagram of installation setup](static/documentation/images/setup.png)

## #1 - Myth of Sisyphus

![Myth of Sisyphus artwork showing an orange circle representing the boulder on a black triangular slope](static/documentation/images/myth-of-sisyphus.jpg)

Albert Camus’ Myth of Sisyphus retells the story of the Greek titan condemned to push a boulder up a hill only to see it fall back again. In this endless, absurd task, Camus finds a metaphor for our search for meaning in an indifferent world. Yet he ends with a radical turn: “One must imagine Sisyphus happy.”

In that line, Sisyphus is no longer a victim of punishment but a figure of defiance, reclaiming agency through acceptance. He embraces his circumstance and his struggle becomes his purpose; the act of rolling the rock becomes an act of choice.

_Myth of Sisyphus_, the first piece in the Loop series, is a digital interpretation of Albert Camus’ philosophical essay on the absurd and the human pursuit of meaning. The work transforms Sisyphus’ endless labor into an interactive, meditative loop.

The orange circle on the screen represents the boulder. Viewers can grasp and drag it either with a mouse or by using their hand through real-time webcam motion tracking. As they push the digital rock toward the top of the screen, it inevitably rolls back down in either direction, inviting continuous repetition.

The loop has no reward, no score, and no ending. Through this repetition, the audience becomes both observer and participant in the myth.

### Interaction

The piece offers two modes of control:

- **Mouse input**<br>
  The user clicks and drags the orange circle (the rock) up the black triangular slope.

- **Hand-tracking camera input**<br>
  Using a webcam, the system detects user’s hand and replaces the cursor with a small circle that follows their motion.

### Technical Overview

The sketch is built on JavaScript, p5.js for visual rendering and ml5.js for hand tracking through camera feed.

- **Hand tracking**<br>
  Uses `ml5.handPose()` with a single-hand model (maxHands: 1, flipped: true). The function gotHands receives pose results and computes the average position of 6 keypoints (wrist and finger bases) to estimate hand center.

- **Motion smoothing**<br>
  Hand coordinates are filtered with a lerp-based smoothing factor `handSmoothingFactor = 0.2` to prevent jitter and create fluid motion.

- **Spatial bounds**<br>
  The hand position is constrained with screen insets (`handBoundsInsetX/Y = 0.08`, meaning 8% of the windowWidth/Height) to maintain consistent control regardless of camera framing.

- **Physics simulation**<br>
  Gravity (0.5) acts on the rock’s velocity. The hill geometry flips direction at the end of each iteration, forming an endless repetition. The rock’s position updates along the slope equation to simulate rolling motion.

### Reflections

This project lays foundations to this entire collection. It was born from the monotony and mundaneness of everyday repetition, and in making it, I found myself repeating again, trapped in the same cycle I was trying to express. The process mirrored the work’s concept: building, testing, watching the rock fall, and starting over.

The moment when the rock slides back to the bottom isn’t a failure, it’s a renewal. Each reset is another chance to start, another loop to inhabit. Through this, I began to see the core of my project that repetition, when accepted and embraced, can become a quiet space for reflection, patience, and persistence.

In testing, people inhabited this loop in noticeably different ways. One participant tried hard to reach the peak, failed several times, finally succeeded, watched the rock fall, and immediately walked away. Another kept going, pushing the rock again and again as a small challenge. A third held the rock still in the middle of the slope and said that was where they wanted it to stay.

These responses clarified what the piece is really asking. The system defines the hill, gravity, and the inevitability of return—but agency shows up in how someone chooses to stay with the repetition, resist it, pause it, or leave. “Winning” doesn’t resolve the loop; it only reveals it. The work becomes less about reaching the top and more about noticing what it feels like to keep choosing to push.

## #2 - Doors

![Doors artwork showing an endless corridor of alternating black and white thresholds in 3D space](static/documentation/images/doors.jpg)

A door is one of the most ordinary things we encounter, yet it quietly defines how we move through the world. Every time we pass through one, we shift roles and identities. Stepping through the office door, we become our work-self, returning home, we become our private self. Each doorway marks a subtle transformation, A threshold between who we were and who we are about to be.

_Doors_ extends this everyday ritual into an infinite sequence. The piece visualizes transition as an endless corridor of alternating black and white thresholds. Each passage mirrors the phases of life - child to adult, student to professional, beginnings and endings - where every role reshapes our sense of self. The alternating colors represent the dualities that frame existence: light and dark, life and death, presence and absence.

Walking through these doors becomes a metaphor for continual transformation. The corridor never ends, it only loops. Each step forward collapses into the next, reminding us that every conclusion simply opens another beginning.

### Interaction

_Doors_ uses subtle body tracking to create a sense of presence within the corridor.

- **Body and face input**<br>
  The webcam tracks the viewer’s face and upper body using the `ml5.bodyPose()` model. As the viewer moves left or right, the orientation of the 3D door rotates to face the viewer, as if the world is responding to their movement.

- **Autonomous movement**<br>
  The environment itself advances through the space. The staircase and corridors move autonomously as if the viewer is climbing the stairs, walking along the corridor, and opening the door. The space fades after the door opens, leading to another scene of a corridor.

### Technical Overview

The sketch is built in JavaScript, using p5.js (WEBGL) for 3D rendering and ml5.js for upper body and face tracking.

- **Rendering and motion**<br>
  The environment is constructed from box primitives forming stairs, walls, and a floor plane. The camera advances forward using interpolated offsets `currentOffset` and `targetOffset` for smooth motion.

- **Step sequencing**<br>
  The motion progresses in timed increments `MOVE_INTERVAL`, `STEP_SIZE, SMOOTH_SPEED` for `MAX_MOVES` cycles before entering a final long transition `FINAL_MOVEMENT`, `FINAL DURATION`

- Scene inversion

- Face tracking

### Audio Source

An ambient soundtrack accompanies the piece, reinforcing the sense of forward motion and spatial depth. The repeating rhythm of the audio complements the continuous passage through doors, creating an immersive and meditative atmosphere.

Source: _Feel_ by Master Minded, [artlist.io](https://artlist.io/royalty-free-music/song/feel/132927).

[Feel_License.pdf](static/documentation/files/Feel_License.pdf)

### Reflections

Testing made it clear that _Doors_ invites projection. One visitor began moving their legs in place, trying to sync their steps with the advancing stairs. They assumed their lower-body movement was driving the scene, treating the loop as a coordinated journey. That misreading was revealing: it showed how quickly people invent a sense of control even when none is actually available.

Others sat still and waited for something more to happen, then expressed frustration at how slowly the corridor moved. A few reflected that they’ve become accustomed to fast-paced media and immediate feedback. These reactions turned the piece into a mirror for expectations about pace, progress, and control. A simple, slow loop was enough to surface those expectations and make them available as material for reflection.

## #3 - Accumulation

![Alt Text](static/documentation/images/accumulation.jpg)

_Accumulation_ is a sketch about buildup that looks like nothing is happening.

It’s based on a painting exercise: repeatedly drawing a black circle, then covering it with white paint, until the canvas appears blank—while physically getting heavier from layered material.

![Alt Text](static/documentation/images/blank-canvas.jpg)

This piece recreates that logic in the browser by stacking visual layers over time. Every second, it adds a new layer without removing anything: sometimes a centered circle, sometimes a full-screen “canvas” overlay. The surface may look minimal, but the system keeps accumulating underneath.

Visually, the work oscillates between presence and erasure. Technically, it is literal accumulation: the piece continuously adds elements to the page, and the interface reveals this hidden growth through counters that track how much has been added.

### Interaction

- **Click anywhere**
  - Flips the color scheme (white ↔ black).
  - Resizes the circle based on where the user clicks: the farther from the center, the larger the circle.

### Technical Overview

- **Timed layering**<br>
  The work runs on a simple timer. It continuously adds new layers at fixed intervals, alternating between a centered circle and a full-screen overlay. The layers stack indefinitely and are never removed.

- **Accumulation made visible**<br>
  The interface displays two indicators that reflect the ongoing buildup:

  - a rough estimate of page “weight” (DOM size)
  - a line counter / log that increases each time a new layer is added

- **Layered composition**<br>
  The visuals are built from two repeating element types:
  - a centered circle whose size is controlled by a CSS variable
  - a full-screen overlay that covers the entire viewport

### Reflections

In observation, the interaction in _Accumulation_ was not immediately legible to most viewers. Without explanation, many treated it as a non-interactive animation and never discovered that clicking changes the structure. The idea of DOM growth as “digital weight” was also most visible to people already familiar with HTML and how documents are built.

But once the premise was explained—that every second adds new elements and “weight,” both visually and in code, many people said it resonated with their own sense of hidden build-up: routines, stress, habits, and quiet accumulation that doesn’t read as change until it’s named. That gap between initial perception (blank, minimal, nothing happening) and later understanding became part of the piece. It highlighted how some forms of repetition and accumulation stay invisible until there’s a threshold moment where they become recognized.

## #4 - Zen Garden

![Zen Garden artwork showing repeated raked sand-like arcs and lines forming a continuous pattern](static/documentation/images/zen-garden.jpg)

_Zen Garden_ is a loop built from a ritual gesture: raking.

The screen steadily draws a field of lines that curve into repeated arcs, resembling the marks left in sand at a dry landscape garden. The movement is careful and consistent, structured enough to feel intentional, repetitive enough to feel endless. As the pattern completes, it holds briefly, fades toward blankness, and begins again. The loop is not about progress, but about returning to the same task and noticing what changes in the act of staying with it.

Rather than offering a clear goal, the piece frames repetition as maintenance: a quiet, ongoing labor that can be soothing, numbing, or meditative depending on how long it is watched.

### Interaction

This piece runs autonomously. There is no direct user control. The only interaction is duration: choosing to watch, drifting away, and returning as the loop repeats.

### Technical Overview

- **Progressive drawing**<br>
  The animation is constructed as a continuous rake-like path: straight segments that flow into rounded turns. Marks appear gradually over time rather than all at once.

- **Layered bands**<br>
  As one band completes, the system shifts downward and draws the next, building a full field of repeated marks.

- **Fade and reset**<br>
  After a full pass, the screen fades toward blankness, pauses, and restarts, returning to the beginning without resolving the loop.

### Reflections

_Zen Garden_ shifts the threshold away from “choice” and toward “attention.” With no moment to intervene, the piece asks what it means to stay with a repetitive act that never completes. The reset isn’t a clean slate; it’s the return of the same task. Over time, the work becomes less about the pattern itself and more about the viewer’s willingness to remain with it.

## #5 - Incense

![Incense artwork showing a single vertical incense stick with a glowing tip and drifting smoke particles](static/documentation/images/incense.jpg)

_Incense_ is a loop about slow disappearance.

A single stick fades into view, its tip begins to glow, and it burns downward at a steady pace. Ash-like particles rise from the ember and drift upward like smoke. When the stick finishes burning, the screen goes quiet for a moment—then the cycle begins again, returning to the same ritual without a conclusion.

The piece treats repetition as a quiet practice: something that doesn’t “progress” so much as it continues. The loop is slow enough to feel meditative, but persistent enough to make time noticeable.

### Interaction

There is no direct user control. Instead, the piece responds as a presence:

- The motion of the smoke subtly shifts with the viewer’s position, as if the air changes when someone is nearby.
- The primary interaction is duration—choosing to watch long enough to notice the burn, the drift, and the reset.

### Technical Overview

- **Phased loop**<br>
  The cycle moves through four states: the stick appears, the ember fades in, the burn progresses downward, and the scene pauses briefly before restarting.

- **Burn progression**<br>
  The burning tip is a moving point along the stick that advances gradually over time, making the “loss” feel continuous rather than sudden.

- **Particle smoke**<br>
  Particles are emitted from the glowing tip and rise upward with slight randomness, creating a soft, constantly changing texture.

- **Subtle responsiveness**<br>
  The smoke’s horizontal drift is gently influenced by the viewer’s position, keeping the loop mostly autonomous while still acknowledging the body in front of it.

### Reflections

_Incense_ makes a loop out of something that normally marks time. Watching it burn turns repetition into a kind of measuring: the same action, the same pace, the same ending—followed by a return. The reset doesn’t erase what happened; it reframes the burn as a recurring ritual. Over time, the work becomes less about the image of incense and more about how attention changes when nothing “new” arrives, only the steady continuation of the same disappearing act.

## #6 - Playground Spinner

### Interaction

### Technical Overview

### Reflections

## #7 - Meaning

![Meaning artwork showing two canvases: one with an orange dot moving in a structured loop and one wandering unpredictably](static/documentation/images/meaning.jpg)

_Meaning_ is a two-part sketch built from a simple reversal.

It was developed from the drawing elicitation workshop, where participants repeatedly visualized **meaningfulness** as symmetry and structure, and **absurdity** as randomness and disorder. This piece takes that shared visual language and flips its labels: the structured sketch is titled **Meaningless(무의미)**, and the chaotic sketch is titled **Meaningful(유의미)**. By placing expectation and naming in conflict, the work asks how quickly meaning can be assigned, lost, or re-made.

In **Meaningless**, an orange dot (🟠) circles a stadium-like path. The motion reads as controlled and intentional, but the longer it continues, the more it can start to feel trapped—perfect structure without escape. In **Meaningful**, the orange dot drifts unpredictably across the canvas. It may look pointless at first, but over time it invites attention through curiosity: where will it go next, and what kind of pattern might appear only after watching for longer?

Together, the two canvases treat meaning as something that emerges through duration and interpretation rather than through form alone. The dot becomes a stand-in for the self moving through time, and the work asks which feels more “meaningful”: staying inside a stable system, or wandering without a clear path.

### Interaction

This prototype has no direct physical interaction. The threshold happens through reading and looking:

- The titles shape first impressions.
- Meaning emerges by comparing the two canvases and noticing how perception shifts over time.

### Technical Overview

- **Two-canvas structure**<br>
  The work presents two sketches side by side to encourage comparison rather than progression.

- **Contrasting motion systems**<br>
  One sketch constrains the dot to a looped path, while the other allows it to wander with non-repeating movement logic. The contrast is designed to feel “controlled” versus “uncontrolled,” even before the labels intervene.

- **Title reversal as the main mechanism**<br>
  The simplest change—naming—acts like an interface. It redirects interpretation without changing the motion itself.

### Reflections

This piece clarified how much viewers want coherence. When the titles contradict the visuals, people rarely dismiss it—they start searching for an explanation, re-reading the motion until it “fits.” That interpretive effort becomes the loop.

It also set a direction for the larger project: the strongest part of the prototype is how quickly it produces reflection with minimal form. The open challenge is translating that same “label vs. perception” tension into a multi-screen installation where the body participates, not just the eyes.

## #8 - Not the Same Sun

### Interaction

### Technical Overview

### Reflections

## #9 - Fountain

### Interaction

### Technical Overview

### Reflections

## Technological Stack

- Framework: SvelteKit
- Deployment: Vercel
- DNS: CloudFlare
- Canvas: p5.js or vanilla js
- Motion Sensing: ml5.js

<br><br>

# Evaluation

## Reflection

## Publication

Rinchong Kim. 2026. The Loops: An Interactive Artwork on Reclaiming Agency in Involuntary Repetition. In Proceedings of the Twentieth International Conference on Tangible, Embedded, and Embodied Interaction (TEI '26). Association for Computing Machinery, New York, NY, USA, Article 134, 1–5. https://doi.org/10.1145/3731459.3786210

<br><br>

# Acknowledgements

## Special Thanks

Special thanks to Harpreet Sareen, Namreta Kumar, Mani Nilchiani, Ethan Silverman and Andrew Zornoza for guiding me through this project.

And to my classmates who participated in user testings and provided me with constructive feedbacks.

## Use of Generative AI

Generative AI (Model: Cursor Composer 1, Cursor Composer 2) was used for code cleanup and simplification purposes throughout these digital sketches.

## License

<br><br>

# References
