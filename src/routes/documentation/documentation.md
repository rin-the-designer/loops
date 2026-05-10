# Abstract

_Loops_ is a collection of interactive digital artworks that examine the tension between involuntary repetition and chosen thresholds. Drawing on Albert Camus's writing on absurdism, the project treats repetition not as a problem to be solved but as a condition to be inhabited and reflected on. Each piece presents an abstracted scenario that loops without a defined beginning, progress, or ending. Viewers can engage through mouse, touch, hand tracking, body or face tracking, or simple presence, but the loops continue regardless of whether interaction occurs. Built in JavaScript and delivered through the browser, the collection is responsive across devices and scalable to room-sized installation. The project contributes a working example of interactive artwork as applied philosophy, treating reflection, rather than efficiency or entertainment, as a primary design outcome. A paper on this work was presented at ACM TEI '26 and published on the ACM Digital Library.

# Introduction

Experience the project at [https://loops.rin.kim](https://loops.rin.kim). For documentation, [https://loops.rin.kim/documentation](https://loops.rin.kim/documentation).

## Concept

> #### The struggle itself toward the heights is enough to fill a man’s heart.</br>One must imagine Sisyphus happy.
>
> _The Myth of Sisyphus_</br>Albert Camus, 1942

_Loops_ is a collection of interactive digital artworks that explore the tension between involuntary repetition and chosen thresholds. In this documentation, _involuntary repetition_ refers to the continuous cycle of activities and circumstances people feel compelled to engage in or accept, and _chosen thresholds_ refers to the autonomy to shape actions and interpretations inside those patterns.

The collection currently holds seven interactive pieces. Each one ties to absurdism and to finding agency, the sense that people still have room to steer events even inside cycles that start to feel meaningless. Ordinary objects or actions sit behind each sketch, they are abstracted enough that viewers focus on the concept rather than the visuals.

_Loops_ runs in web browsers, so viewers can view it on their own devices, larger monitors, or projections scaled for installs. The layout is responsive, so interaction stays workable from handheld widths through room-sized setups. Displays nearer human scale (roughly 65 to 85 inches on the diagonal) deepen immersion, the feeling that viewers stand closer to the gestures and visuals on-screen. Because each piece borrows from familiar spaces and rituals, the context of installation shapes the experience. A piece installed in the environment it references will carry a different weight than the same work shown on a neutral screen.

The goal of this project is to invite viewers to reflect on their own loops and thresholds. The project suggests that, rather than resisting these loops, their presence might be accepted, their absurdity embraced, and agency reclaimed in the encounter. Individual pieces withhold a stipulated beginning, progress, or end, so viewers can engage and withdraw on their own terms. Though the sketches were designed with particular interactions in mind, nothing in their structure requires viewers to follow that script. Openness to exploration and reflection takes priority.

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

The most frequently logged activities fell into two broad categories: bodily habits (hair twirling, leg bouncing, nail biting, fidgeting with jewelry) and digital behaviors (scrolling, checking notifications, refreshing apps, clearing tabs). What struck most participants was not the content of these loops but the moment of noticing them. Several expressed genuine surprise at how automatic their actions had become, one participant wrote that they did not realize how often they bit their nails until they began recording it.

The emotional texture of the logged loops was more varied than expected. Stress and anxiety appeared frequently, but so did calm, contentment, and even joy. The same action carried different emotional weight depending on the person: one participant found their morning coffee routine grounding; another logged it as something done out of necessity. Most loops sat quietly in the background of daily life, neither deeply felt nor consciously chosen, and the act of logging them was itself a threshold, making visible what had previously been automatic.

### Drawing as Elicitation (Second Iteration)

Building on an earlier group drawing session, a second iteration was conducted with five participants working individually rather than collectively. The change in format was deliberate: in the first session, participants drew together in a shared space, which raised the possibility that visual choices were influenced by what others around them were drawing. By isolating each participant, this iteration aimed to examine whether similar patterns would emerge independently.

Participants were presented with four words in sequence, _absurdity_, _meaningful_, _error_, and _success_, each accompanied by its dictionary definition. They were asked to draw a pattern, rather than an object or scene, that came to mind for each word. After completing all four drawings, participants were asked to explain their intentions.

![Drawing session documentation](static/documentation/images/drawing.jpg)

![Participant drawings](static/documentation/images/elicitation-2.jpg)

The results were telling. For _absurdity_, participants consistently produced open, non-repeating, and visually irregular marks, even though their stated reasoning differed: one described randomness as freedom, another as an absence of rules, another as disruption of an existing pattern. For _meaningful_, most participants drew structured or layered forms, concentric circles, symmetrical arrangements, or patterns with a clear center. _Error_ and _success_ produced more varied responses, ranging from disconnected lines to mountain peaks to exclamation marks.

The key finding was that despite receiving identical definitions, participants arrived at visually similar patterns through distinctly different interpretations. The absurd looked roughly the same across participants even when the reasoning behind it did not. This gap between shared visual language and individual conceptual intent became the direct basis for the _Meaning_ piece in the collection, which takes that shared visual stereotype and inverts its labels.

## Precedents

### Digital Art

Rafaël Rozendaal's internet artworks and Zach Lieberman's generative practice both shaped the approach taken in _Loops_. Rozendaal's works exist as single-URL browser experiences: minimal, looping, with no levels or endings, treating the web itself as a gallery.[^1] Lieberman's practice showed how simple rules applied repeatedly through code can produce something that feels alive, generating visual experience without narrative or resolution.[^2] Together they established that a coded loop can be a complete artwork, and that the browser is a legitimate medium for it.

### Canvas Art

Seo-bo Park's _Écriture_ series and Tschang-yeul Kim's _Water Drops_ series both use repetition as the primary material of the work. Park's canvases are made through the same gesture repeated thousands of times: a pencil or crayon drawn slowly across wet paint, each pass slightly different, each canvas a record of sustained attention.[^3] Kim returned to the same subject, a single water drop, across decades of painting. He described the practice as a form of healing after the trauma of the Korean War, returning to the same form until it released its charge.[^4] Both practices treat repetition not as a means to an end but as the work itself.

Josef Albers and Vera Molnár approached repetition through constraint and system. Albers applied the same compositional format, nested squares, to hundreds of canvases over decades, changing only the colors, finding discovery entirely within the fixed structure.[^5] Molnár, among the earliest artists to use computers for visual form, built her work from simple rules applied iteratively, and deliberately introduced errors into her algorithms, what she called _désordre_, to observe what randomness did to order.[^6] This tension between system and deviation maps directly onto the distinction this project draws between involuntary loops and chosen thresholds.

### Conceptual

Nam June Paik's _TV Buddha_ places a statue of the Buddha before a closed-circuit television showing a live feed of itself: the Buddha watching the Buddha, endlessly.[^7] The loop here is not decorative, it is the subject. This work established a precedent for treating repetition and presence as the same question.

### Game

Bennett Foddy's _Getting Over It_ and SCKR Games' _Only Up!_ are the clearest contemporary parallels to the myth of Sisyphus in interactive form. In _Getting Over It_, a man in a cauldron climbs an impossible mountain; every fall can return the player to the beginning, and Foddy narrates throughout, reflecting on failure and the psychology of repetition.[^8] _Only Up!_ strips away checkpoints entirely, making the absence of accumulated progress the central experience.[^9] Both games ask what it means to keep trying when nothing carries forward, and both served as a reference point for thinking about how repeated failure and return can provoke reflection rather than just frustration.

[^1]: Rafaël Rozendaal, _Internet Artworks_, ongoing, www.newrafael.com/internet.

[^2]: Zach Lieberman, _Circles, Blobs, Ripples_, 2023, Unit London, London.

[^3]: Seo-bo Park, _Écriture_ series, 1967–present.

[^4]: Tschang-yeul Kim, _Water Drops_ series, 1972–2021.

[^5]: Josef Albers, _Homage to the Square_ series, 1950–1976.

[^6]: Vera Molnár, _(Dés)Ordres_, 1974.

[^7]: Nam June Paik, _TV Buddha_, 1974.

[^8]: Bennett Foddy, _Getting Over It with Bennett Foddy_ (Bennett Foddy, 2017).

[^9]: SCKR Games, _Only Up!_ (SCKR Games, 2023).

<br><br>

# Project

## Overview

The Project section presents the seven pieces that make up _Loops_. Each piece is a self-contained interactive sketch, but the collection is designed to be read together. Across the seven works, repetition is approached from different angles: as struggle (_Myth of Sisyphus_), as transition (_Doors_), as quiet build-up (_Accumulation_), as ritual maintenance (_Zen Garden_), as slow disappearance (_Incense_), as play (_Playground Spinner_), and as interpretation (_Meaning_). No piece is meant to be definitive on its own. The argument lives in the overlap, in how repetition takes a different shape each time the question is asked.

A few principles run across the collection. Each piece is built from a deliberately reduced visual language, abstracted enough that attention stays on the concept rather than on imagery or decoration. Each piece runs as an open loop, without a beginning, progress, or ending that signals when to engage or disengage. And each piece is paired with at least one mode of interaction (mouse, touch, hand tracking, body or face tracking, or simple presence) chosen to match the gesture the work is asking the viewer to consider. None of the pieces require interaction to function; the loops continue regardless. Interaction is offered, not demanded.

Each entry below follows the same structure: a brief introduction to the concept and visual logic of the piece, a description of how it can be interacted with, a technical overview of how it is built, and a reflection drawn from observation and testing. The pieces are presented in roughly the order they were developed.

<!-- ## Installation

![Diagram of installation setup](static/documentation/images/setup.png) -->

## #1 - Myth of Sisyphus

![Myth of Sisyphus artwork showing an orange circle representing the boulder on a black triangular slope](static/documentation/images/myth-of-sisyphus.jpg)

In Camus's retelling, Sisyphus is condemned to push a boulder up a hill only to watch it roll back down, endlessly. Camus finds in this not tragedy but defiance: the absurd hero continues anyway, finding sufficiency in the act itself rather than in any outcome. The essay ends with a provocation: one must imagine Sisyphus happy.

_Myth of Sisyphus_ is a direct translation of that logic into an interactive form. An orange circle represents the boulder on a dark triangular slope. Viewers can push it upward with a mouse or with their hand tracked through the webcam. When it reaches the top, the hill flips and the cycle continues. There is no score, no reward, and no ending.

The piece holds the loop open and leaves every decision to the viewer: keep pushing, stop, or find a third option. That space between the system's pull and the viewer's response is where the work lives.

### Interaction

The piece offers two modes of control:

- **Mouse input**<br>
  The user clicks and drags the orange circle (the rock) up the black triangular slope.

- **Hand-tracking camera input**<br>
  Using a webcam, the system detects user's hand and replaces the cursor with a small circle that follows their motion.

### Technical Overview

The sketch is built on JavaScript, p5.js for visual rendering and ml5.js for hand tracking through camera feed.

- **Hand tracking**<br>
  Uses `ml5.handPose()` with a single-hand model (maxHands: 1, flipped: true). The function gotHands receives pose results and computes the average position of 6 keypoints (wrist and finger bases) to estimate hand center.

- **Motion smoothing**<br>
  Hand coordinates are filtered with a lerp-based smoothing factor `handSmoothingFactor = 0.2` to prevent jitter and create fluid motion.

- **Spatial bounds**<br>
  The hand position is constrained with screen insets (`handBoundsInsetX/Y = 0.08`, meaning 8% of the windowWidth/Height) to maintain consistent control regardless of camera framing.

- **Physics simulation**<br>
  Gravity (0.5) acts on the rock's velocity. The hill geometry flips direction at the end of each iteration, forming an endless repetition. The rock's position updates along the slope equation to simulate rolling motion.

### Reflections

In testing, people inhabited this loop in noticeably different ways. One participant tried hard to reach the peak, failed several times, finally succeeded, watched the rock fall, and immediately walked away. Another kept going, pushing the rock again and again as a small challenge. A third held the rock still in the middle of the slope and said that was where they wanted it to stay.

These responses clarified what the piece is really asking. The system defines the hill, gravity, and the inevitability of return, but agency shows up in how someone chooses to stay with the repetition, resist it, pause it, or leave. Reaching the top does not resolve the loop; it only reveals it. The work becomes less about the boulder and more about noticing what it feels like to keep choosing to push.

## #2 - Doors

![Doors artwork showing an endless corridor of alternating black and white thresholds in 3D space](static/documentation/images/doors.jpg)

A door is one of the most ordinary objects we encounter, yet every doorway marks a small shift in role and identity. Stepping into work, returning home, moving from one phase of life to the next: each passage carries a quiet transformation that goes largely unnoticed because it happens so often.

_Doors_ extends this everyday ritual into an infinite sequence. The piece presents an endless corridor of alternating black and white thresholds in 3D space, advancing forward at a steady pace as if the viewer is walking through it. Each door gives way to another. There is no destination, no final room, only the corridor continuing.

The alternating colors represent the dualities that structure the cycle: light and dark, presence and absence, beginning and ending. The loop never resolves because transition itself never ends.

### Interaction

- **Body and face input**<br>
  The webcam tracks the viewer's face and upper body using the `ml5.bodyPose()` model. As the viewer moves left or right, the corridor rotates to face them, as if the space responds to their presence.

- **Autonomous movement**<br>
  The environment advances on its own. The viewer does not need to act for the loop to continue.

### Technical Overview

The sketch is built in JavaScript, using p5.js (WEBGL) for 3D rendering and ml5.js for upper body and face tracking.

- **Rendering and motion**<br>
  The environment is constructed from box primitives forming stairs, walls, and a floor plane. The camera advances forward using interpolated offsets `currentOffset` and `targetOffset` for smooth motion.

- **Step sequencing**<br>
  The motion progresses in timed increments `MOVE_INTERVAL`, `STEP_SIZE, SMOOTH_SPEED` for `MAX_MOVES` cycles before entering a final long transition `FINAL_MOVEMENT`, `FINAL_DURATION`.

- **Scene inversion and face tracking**<br>
  The color scheme inverts between passages. Face position data from ml5.js shifts the corridor's perspective to follow the viewer.

<!-- ### Audio Source

An ambient soundtrack accompanies the piece, reinforcing the sense of forward motion and spatial depth.

Source: _Feel_ by Master Minded, [artlist.io](https://artlist.io/royalty-free-music/song/feel/132927). -->

### Reflections

Testing made it clear that _Doors_ invites projection. One visitor began moving their legs in place, trying to sync their steps with the advancing stairs, assuming their movement was driving the scene. That misreading was revealing: it showed how quickly people invent a sense of control even when none is actually available.

Others sat still and waited, then expressed frustration at how slowly the corridor moved, reflecting that they had grown accustomed to fast-paced media. A simple, slow loop was enough to surface those expectations and make them available for reflection.

## #3 - Accumulation

![Accumulation artwork showing a minimal canvas with a DOM counter tracking invisible layered growth](static/documentation/images/accumulation.jpg)

_Accumulation_ started as a physical exercise: drawing black circles on a canvas, covering them with white paint, and repeating until the surface looked blank but had grown visibly heavier with each layer. The canvas appeared the same as when it started, but it was not.

The digital piece recreates that logic in the browser. Every second, a new element is added to the page without removing anything: sometimes a circle, sometimes a full-screen overlay. The surface oscillates between presence and erasure, but the system only ever grows. Two counters make this visible, one tracking DOM size, one counting lines of accumulated code.

![Blank canvas process documentation](static/documentation/images/blank-canvas.jpg)

The work frames repetition as a process that builds weight beneath an apparently static surface, asking what it means to accumulate without a visible record.

### Interaction

- **Click anywhere**
  - Flips the color scheme (white to black or black to white).
  - Resizes the next circle based on distance from the click to the center of the screen.

### Technical Overview

- **Timed layering**<br>
  The work runs on a simple timer. It continuously adds new layers at fixed intervals, alternating between a centered circle and a full-screen overlay. The layers stack indefinitely and are never removed.

- **Accumulation made visible**<br>
  The interface displays two indicators that reflect the ongoing buildup:

  - a rough estimate of page weight (DOM size)
  - a line counter that increases each time a new layer is added

- **Layered composition**<br>
  The visuals are built from two repeating element types:
  - a centered circle whose size is controlled by a CSS variable
  - a full-screen overlay that covers the entire viewport

### Reflections

Without explanation, most viewers treated _Accumulation_ as a non-interactive animation and never discovered that clicking changes the structure. The idea of DOM growth as digital weight was most legible to people familiar with HTML.

Once the premise was explained, many said it resonated with their own sense of hidden build-up: stress, habits, routines, accumulation that does not read as change until it is named. That gap between initial perception and later understanding became part of the piece.

## #4 - Zen Garden

![Zen Garden artwork showing repeated raked sand-like arcs and lines forming a continuous pattern](static/documentation/images/zen-garden.jpg)

The dry landscape garden is built on the practice of raking. The same gesture, drawn across sand again and again, produces lines that are both marks of labor and objects of contemplation. Nothing is planted and nothing grows. The work is maintenance, and the maintenance is the point.

_Zen Garden_ takes that gesture as its material. The screen draws a field of curved lines that resemble raked sand, band by band, from top to bottom. When the pattern completes it holds briefly, fades, and begins again from the top. The loop does not progress toward anything.

The piece offers no intervention point. There is no interaction other than the choice of how long to stay.

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

_Zen Garden_ shifts the threshold away from choice and toward attention. With no moment to intervene, the piece asks what it means to stay with a repetitive act that never completes. The reset is not a clean slate; it is the return of the same task. Over time the work becomes less about the pattern and more about the viewer's willingness to remain with it.

## #5 - Incense

![Incense artwork showing a single vertical incense stick with a glowing tip and drifting smoke particles](static/documentation/images/incense.jpg)

In many East Asian cultural practices, incense is burned during ceremonies and rituals as a way of connecting the living with those who have passed. The smoke is read as a presence: when it drifts toward someone, it is sometimes understood as a sign that an ancestor has arrived. The act of burning is itself a kind of loop, the same ritual repeated across generations, across occasions, across time.

_Incense_ renders that loop digitally. A single stick fades into view, its tip begins to glow, and it burns downward at a steady pace. Particles rise from the ember like smoke. When the stick finishes burning, the scene pauses briefly and the cycle starts again.

The smoke shifts direction in response to the viewer's position, as real smoke would shift with the movement of a body nearby. The piece treats the viewer's presence not as input but as something the work already knows about.

### Interaction

There is no direct user control. The smoke responds to the viewer's position through face tracking, drifting in the direction of the face on screen. The primary interaction is duration: choosing to stay and watch the burn, the drift, and the reset.

### Technical Overview

- **Phased loop**<br>
  The cycle moves through four states: the stick appears, the ember fades in, the burn progresses downward, and the scene pauses briefly before restarting.

- **Burn progression**<br>
  The burning tip is a moving point along the stick that advances gradually over time, making the loss feel continuous rather than sudden.

- **Particle smoke**<br>
  Particles are emitted from the glowing tip and rise upward with slight randomness, creating a soft, constantly changing texture.

- **Subtle responsiveness**<br>
  The smoke's horizontal drift is gently influenced by the viewer's face position, keeping the loop mostly autonomous while still acknowledging the body in front of it.

### Reflections

The reset in _Incense_ does not erase what happened. It reframes the burn as a recurring ritual: the same disappearance, again. Over time the work becomes less about the image of incense and more about how attention changes when nothing new arrives, only the steady continuation of the same act.

## #6 - Playground Spinner

![Playground Spinner displaying a flattened version of a playground merry-go-round on a monitor screen](static/documentation/images/playground-spinner.jpg)

The playground spinner, also known as a playground merry-go-round, is one of those objects whose entire purpose is the act itself. There is no goal in spinning it, no score, no destination, only the spin. For a lot of people it is also a shared childhood memory: you ran toward it, grabbed a handle, and pushed. The spinning was the point.

_Playground Spinner_ renders that object digitally. A 3D spinner fills the screen, built from a central pole, a base disk, and six handles arranged radially. It is rendered without lights, which gives it an intentionally flat, almost diagrammatic quality despite being a 3D form. The object reads as simple and abstract, familiar in shape but stripped of texture and shadow.

The piece spins when a hand moves in front of the webcam, regardless of direction. The speed decays naturally after each gesture, slowing the way a real spinner would slow, and comes to rest until the next movement arrives. A new hand appearing changes the color scheme, cycling through seven palettes. The loop has no purpose beyond its own continuation.

### Interaction

- **Hand swipe via webcam**<br>
  The `ml5.handPose()` model tracks wrist position. Any lateral movement above a threshold (10 pixels) triggers a spin. The speed is proportional to the speed of the swipe, capped at a maximum. Direction does not matter: any movement spins the spinner clockwise.

- **Color change on new hand detection**<br>
  When a hand enters the frame after being absent, the color scheme changes to a randomly selected palette from a set of seven. The color applies to both the background and the spinner body.

### Technical Overview

The sketch is built in JavaScript using p5.js in WEBGL mode and ml5.js for hand tracking.

- **3D rendered as 2D**<br>
  The spinner is drawn with `noStroke()`, `fill()`, and no lighting calls. The result is a flat-colored 3D object that reads visually as 2D. This is a deliberate choice: the form is recognizable, but the absence of light removes depth cues and keeps the focus on the shape and its motion rather than its materiality.

- **Spinner geometry**<br>
  The object is constructed from three components: a base disk (`cylinder` with low height), a central vertical pole, and six handles arranged radially. Each handle has a vertical segment and a horizontal segment connecting it to the center, built from rotated and translated cylinders.

- **Physics decay**<br>
  Spin speed decreases each frame by a factor of 0.99, producing a gradual natural slowdown without a hard stop.

- **Hand tracking and speed mapping**<br>
  Wrist X position is tracked frame by frame. The delta between frames is mapped to spin speed using `constrain(abs(dx) * 0.2, 0, 10)`, giving responsive but bounded control.

### Reflections

For viewers who grew up with playground spinners, the response was immediate. They saw the object and started spinning it without hesitation, the same way they would have as a child. There was no learning curve, no moment of figuring out what to do. The object already carried its own instructions.

That directness was one of the clearest moments of recognition across the entire collection: a piece of shared physical memory, translated into code, producing the same gesture it always produced. The loop here is not just on the screen. It runs from childhood to now, the same spinning, the same pointless purpose, repeated across time.

## #7 - Meaning

![Meaning artwork showing two canvases: one with an orange dot moving in a structured loop and one wandering unpredictably](static/documentation/images/meaning.jpg)

During the drawing elicitation workshop, a consistent pattern emerged: participants drew meaningfulness as symmetry and structure, and absurdity as randomness and disorder. The visual language was shared even when the reasoning behind it differed. _Meaning_ takes that finding and reverses it: the structured sketch is titled Meaningless (무의미) and the wandering sketch is titled Meaningful (유의미).

In Meaningless, an orange dot circles a fixed stadium-shaped track. The motion appears controlled and intentional, but its endless repetition gradually suggests being locked in place rather than moving through something. In Meaningful, the dot drifts freely across the screen. Its path is unpredictable and initially reads as aimless, but over time it draws curiosity: where will it go next, and what might the traces left behind eventually form.

The two canvases sit side by side, asking viewers to notice which one holds their attention and why. Meaning, the piece suggests, is not in the form but in the looking.

### Interaction

There is no direct physical interaction. The threshold is the act of reading and comparing:

- The titles shape first impressions.
- Meaning emerges by watching both canvases over time and noticing how perception shifts.

### Technical Overview

- **Two-canvas structure**<br>
  The work presents two sketches side by side to encourage comparison rather than progression.

- **Contrasting motion systems**<br>
  One sketch constrains the dot to a looped path, while the other allows it to wander with non-repeating movement logic. The contrast is designed to feel controlled versus uncontrolled, even before the labels intervene.

- **Title reversal as the main mechanism**<br>
  The simplest change, naming, acts like an interface. It redirects interpretation without changing the motion itself.

### Reflections

Viewers rarely dismissed the contradiction between the titles and the visuals. Most started searching for an explanation, re-reading the motion until it fit. That interpretive effort is the loop the piece is actually running.

The work also confirmed that reflection can emerge from very minimal form. The open question it leaves behind is how that same tension between label and perception could be extended into a multi-screen installation where the body, not just the eyes, participates.

## Technological Stack of the Collection

- Framework: SvelteKit
- Deployment: Vercel
- DNS: CloudFlare
- Canvas: p5.js or vanilla js
- Motion Sensing: ml5.js

<br><br>

# Evaluation

## Reflection

### Status

This documentation captures _Loops_ as a collection of seven completed interactive pieces. Two additional works, _Not the Same Sun_ and _Fountain_, are in progress and not included in this submission. The collection in its current form has been published at ACM TEI '26, which marks its first formal academic presentation.

Several aspects of the project remain unresolved. Testing across the seven pieces was informal, conducted with small groups of participants in semi-controlled settings, and the resulting findings are indicative rather than representative of how a broader audience would respond. The work also runs on a limited set of screen-based setups and depends on webcam tracking and browser performance, which constrains where it can be installed and makes it sensitive to hardware and network conditions. _Accumulation_ continues to depend on familiarity with concepts such as the DOM to be fully understood, which narrows the audience that can access its intended meaning without additional explanation. None of the pieces have yet been installed in the site-specific contexts that would most extend their meaning. The collection is documented and presentable in its current state, but its evaluation in real-world settings remains a future step.

### Future Prospects

The most immediate direction is the evaluation of the work in real contexts. The Concept section proposes that the context of installation shapes the experience of each piece, but this remains a hypothesis that has not yet been tested. Installing _Doors_ in an elevator lobby, _Zen Garden_ in or near an actual garden, and _Incense_ in a quiet ritual space would allow that hypothesis to be evaluated and would situate the work within environments that resonate with its content.

The second direction is the continued growth of the collection. _Loops_ is intended as an ongoing project, expanded whenever a new instance of involuntary repetition is recognized, whether in personal experience or in the looping nature of an object or event. _Not the Same Sun_ and _Fountain_ are already underway, and additional pieces will follow. The collection has no planned endpoint and is meant to remain open, mirroring the structure of the loops it examines.

The third direction is consolidation. The pieces currently share a conceptual frame but not a unified visual or technical foundation. Some are flat in style, others are dimensional. Some are built with p5.js, others with ml5.js, and others with vanilla JavaScript and direct DOM manipulation. A subsequent phase of development will focus on establishing a coherent visual language and a consistent coding stack across the collection, allowing the pieces to read as members of a single body of work rather than as discrete experiments. This consistency will also support more reliable site-specific installation and future expansion.

## Publication

Rinchong Kim. 2026. The Loops: An Interactive Artwork on Reclaiming Agency in Involuntary Repetition. In Proceedings of the Twentieth International Conference on Tangible, Embedded, and Embodied Interaction (TEI '26). Association for Computing Machinery, New York, NY, USA, Article 134, 1–5. https://doi.org/10.1145/3731459.3786210

<br><br>

# Acknowledgements

## Special Thanks

Special thanks to Harpreet Sareen, Namreta Kumar, Mani Nilchiani, Ethan Silverman and Andrew Zornoza for guiding me through this project.

And to my classmates who participated in user testings and provided me with constructive feedbacks.

## Use of Generative AI

Generative AI (Model: Cursor Composer 1, Cursor Composer 2) was used for code cleanup and simplification purposes throughout these digital sketches.

<!-- ## License -->

<br><br>

# References
