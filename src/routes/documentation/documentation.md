# Abstract

# Introduction

## Concept

> #### The struggle itself toward the heights is enough to fill a man’s heart.</br>One must imagine Sisyphus happy.
>
> _The Myth of Sisyphus_</br>Albert Camus, 1942

_Loops_ is a collection of interactive digital artworks that explore the tension between involuntary repetition and chosen thresholds. In this documentation, _involuntary repetition_ refers to the continuous cycle of activities and circumstances people feel compelled to engage in or accept, and _chosen thresholds_ refers to the autonomy to shape actions and interpretations inside those patterns.

The collection currently holds nine interactive pieces. Each one ties to absurdism and to finding agency, the sense that people still have room to steer events even inside cycles that start to feel meaningless. Ordinary objects or actions sit behind each sketch, they are abstracted enough that viewers focus on the concept rather than the visuals.

<!-- Each piece connects to absurdism while finding agency. -->

_Loops_ runs in web browsers, so viewers can view it on their own devices, larger monitors, or projections scaled for installs. The layout is responsive, so interaction stays workable from handheld widths through room-sized setups. Displays nearer human scale (roughly 65 to 85 inches on the diagonal) deepen immersion, the feeling that viewers stand closer to the gestures and visuals on-screen. Because each piece borrows glimpses from reality, change of context and environment in which each piece is installed will alter the experience. > will revise last sentence.

The goal of this project is to invite viewers to reflect on their own loops and thresholds. The project suggests that, rather than resisting these loops, their presence might be accepted, their absurdity embraced, and agency reclaimed in the encounter. Individual pieces withhold a stipulated beginning, midpoint, or end, so viewers can engage and withdraw on their own terms. Though the sketches were designed with particular interactions in mind, nothing in their structure requires viewers to follow that script. Openness to exploration and reflection takes priority.

<!-- This project is an interactive artwork that reveals the tension between involuntary loops[^1] that we are placed in and the chosen thresholds[^2], actions that we choose to take. The form of the work is a multi-screen installation // rewrite the setup part // composed of mini touch displays, each presenting unique interactive artworks. Alongside touch interactions, each display has a camera that enables motion-capture interactions, transforming viewer’s gestures into a subtle part of the experience. By situating multiple loops side by side, the piece underscores the paradox of repetition: while endless cycles may feel absurd, they can also hold meaning and possibility when reframed.

Within the context of interactive art, this project distinguishes itself because it positions interactivity not only as a physical engagement but also as a way to critically examine one's thoughts on repetition and absurdity. When viewers mentally engage with the artwork, I hope that they will take a moment to interpret and respond. The work suggests that rather than resisting these loops, we can accept their presence, embrace their absurdity, and ultimately regain a sense of agency. -->

## Impetus

For a stretch of time during an intense phase of creative work, everything started to feel meaningless. The same questions kept circling: what is the meaning of any of this? What is the meaning of the products around us that promise a better experience, or claim to solve a problem we did not know we had? Are we just lazy beings who need a tool for everything? These existential loops became their own kind of trap, with no clear way through.

At some point, a different question surfaced: why not make a project out of this? Rather than resisting the feeling, the instinct became to confront it and build an interpretation of it.

That is when Camus returned. _Le Mythe de Sisyphe_ and _L'Étranger_, read in the original French during undergraduate coursework, are the two texts that remained most vividly from those years. Camus's absurdist philosophy had resonated then, though it slipped away as design took over. Feeling stuck pulled those readings back into focus, and they offered a frame for what was happening: not an answer, but a way to sit with the question.

The project began with a single interactive sketch, an abstracted version of the myth of Sisyphus rendered in a personal visual language. It became a natural intersection of three backgrounds carried separately until then: a BA in French, a BFA in Visual Design, and now an MFA in Design and Technology, which added code and interaction as a third layer.

The first prototype was spontaneous, written during a studio class. It did not take long to get something running. But the moment a hand moved and the sketch responded, something shifted. This could be a way to confront absurdity rather than escape it, to embrace meaninglessness by giving it a form that could be touched.

## Medium

```js
// a for loop in JavaScript
for (let i = 0; i < 5; i++) {
	console.log(i);
}
```

Computation is literally built out of repetition. In code, the same instructions run again and again until a condition shifts. That is exactly the kind of repetitions and thresholds this work is about. Code was chosen as the medium because it does not merely illustrate and visualize loops, it _performs_ them. The sketches in this piece are loops you can control, gestures you can steer, and rhythms you can interrupt.

The act of coding itself also aligns with the project. Writing code is an act of repetition: write, run, hit errors, revise, run again. By using code, the medium of the project also becomes another layer of repetition.

## Significance

<br><br>

# Context

## Research

Readings

- Albert Camus: Le Mythe de Sisyphe, L'Étranger
- Gilles Deleuze: Difference and Repetition

<!-- Albert Camus's philosophical essay "The Myth of Sisyphus" was my primary inspiration, as it examines the absurdity of endless repetition while suggesting that meaning can still exist within it. This text helped me recognize the absurdity in my own life, opening a path toward reclaiming my sense of agency. Precedents in fine art such as the works by Seo-bo Park, Nam June Paik, and Hyunki Park helped me understand how repetition and absurdity have been explored in art form. Digital contemporary artworks by Rafaël Rozendaal and Zach Lieberman helped me imagine code as a medium to depict interactive loops. // Experienced the work first hand. Being in the same room with the art. Something that I saw in real life. //

Two primary research were conducted to narrow down the scope of the concept. // Grammar //

First was a drawing elicitation workshop where testers were asked to visualize abstract concepts as patterns. This research examined whether similar patterns would emerge in the sketches of the participants, and explored different forms of visualizing the given concept. Participants were presented with four words, _absurdity_, _meaningful_, _error_, and _success_, along with their dictionary definitions. They were then asked to intuitively draw patterns that came to mind.

The results -

The second research was diary study where subjects were asked to log what they’ve noticed themselves repeating unconsciously. They were asked to record at least 3 events per day for a total of 3 days. They were given a prompt to record the date and time, the event, emotion that emerged from realizing the repetitive action, and their thoughts on it. // They showed me what repetition people go through, they didn't directly influence my pieces but gave me ideas and areas to think of. //

The results - -->

## Precedents

### Digital Art

**[_Internet_](https://www.newrafael.com/internet), ongoing — Rafaël Rozendaal**

Rozendaal's internet artworks exist as single-URL experiences — minimal, looping, and built entirely for the browser. Each piece reduces interaction to a small set of inputs that loop indefinitely: no levels, no progress, no ending. The works are publicly accessible to anyone with a link, treating the browser itself as a gallery. This approach — simple system, open-ended repetition, work that lives on the web — was a direct model for how _Loops_ is structured.

**[_Circles, Blobs, Ripples_](https://www.artsy.net/show/unit-london-zach-lieberman-circles-blobs-ripples), 2023 — Zach Lieberman**

Lieberman's practice sits at the intersection of code, performance, and visual systems. His generative works treat movement and form as ongoing processes rather than fixed images, showing how a simple rule applied repeatedly can produce something that feels alive. Lieberman's approach demonstrated that code can generate visual experience without narrative or resolution — just continuous unfolding.

### Canvas Art

**_Écriture_ series, 1967–present — Seo-bo Park**

Park's Écriture series consists of thousands of canvases made through the same gesture repeated: a pencil or crayon drawn slowly across wet paint, leaving behind fine parallel lines. The work is less about the image produced than the discipline of the act itself. Each pass is slightly different; each canvas is a record of sustained attention. This kind of non-productive repetition is a precedent for how _Loops_ treats its own loops — not as a means to an end, but as the material itself.

**_Water Drops_ series, 1972–2021 — Tschang-yeul Kim**

Kim's Water Drops series spans decades of paintings depicting the same subject: a single water drop, rendered with near-photographic stillness. The works accumulate across time — hundreds, eventually thousands, of repetitions of the same image. Kim described the practice as a form of healing and forgetting after the trauma of the Korean War, returning to the same form until it released its charge. The repetition is not sameness but a slow working-through: a loop that changes even when the image does not.

**_Homage to the Square_ series, 1950–1976 — Josef Albers**

Albers applied the same compositional format — nested squares — to hundreds of canvases over decades, changing only the colors. The format never changed; the discoveries came entirely from within the constraint. This kind of repetition-as-investigation, where the loop is fixed and variation lives inside it, is a structural parallel to several pieces in _Loops_.

**_(Dés)Ordres_, 1974 — Vera Molnár**

Molnár is among the earliest artists to use computers as a tool for generating visual form. Her work is built from simple rules applied iteratively, producing grids, curves, and structures that feel both systematic and restless. Crucially, she introduced deliberate errors into her algorithms — what she called _désordre_ — to observe what randomness did to order. This tension between system and deviation maps directly onto the distinction this project draws between involuntary loops and chosen thresholds.

### Conceptual

**_TV Buddha_, 1974 — Nam June Paik**

A statue of the Buddha sits before a closed-circuit television showing a live feed of itself: the Buddha watching the Buddha, endlessly. Paik places an ancient symbol of stillness in front of a live feedback loop, collapsing the distance between the meditative and the technological. The loop here is not decorative — it is the subject. This work established a precedent for treating repetition and presence as the same question.

**_Untitled (TV Stone Tower)_, 1979 — Hyunki Park**

Park's video installations use the loop as both form and content. Monitors in stacked arrangements run footage that is itself cyclical — images that return without resolving. The works are quiet and durational, asking viewers to sit with repetition long enough to notice what shifts inside it. Park's practice treats the loop as a meditative form rather than a limitation of the medium.

### Game

**_Getting Over It with Bennett Foddy_, 2017 — Bennett Foddy**

A man in a cauldron, equipped only with a hammer, climbs an impossible mountain. Every fall can return the player to the beginning. The game is designed to frustrate, and Foddy narrates throughout, reflecting on failure, patience, and the psychology of repetition. It is one of the clearest contemporary parallels to the myth of Sisyphus: a purposeless task, endless return, and the question of whether the person doing it can find something in the repetition rather than against it.

**_Only Up!_, 2023 — SCKR Games**

A single upward climb with no checkpoints — falling from near the top returns the player to the ground. Like _Getting Over It_, the game strips away progress systems and leaves only the loop: attempt, fall, start again. The contrast with conventional game design, where progress always accumulates, makes the absence of that accumulation feel pointed. Both games ask what it means to keep trying when nothing carries forward.

<br><br>

# Project

## Overview

<!-- All projects were specifically designed to achieve simplicity by abstracting the visuals. This was in order to take out the unnecessary visuals that will
capture the attention. The purpose of the project is to make viewers think about the concept of loops, rather than focus on the visuals.
All projects were designed for simplicity by abstracting the visuals. Busy detail is kept low so attention stays on the idea of loops instead of on decorative graphics. The point is to invite thinking about loops, not to spotlight rich or flashy pictures. -->

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

<!-- ## Meaning (Prototype Version Text)

![image.png](static/documentation/images/meaning.jpg)

The first prototype, available at [https://thesis.rin.kim/prototype-01/index.html](https://thesis.rin.kim/prototype-01/index.html), explores the findings from the drawing elicitation research. A pattern that emerged from participants’ drawing was the consistent depiction of absurdity as random scribbles and meaningfulness as symmetrical or structured sketches. To challenge this expectation, these patterns were digitalized with the titles reversed. The canvas resembling participants’ “_meaningful_” sketches was titled **Meaningless(무의미)**, while the one resembling “_absurd_” sketches was titled **Meaningful(유의미)**. By defamiliarizing and reversing common assumptions, the artwork triggers viewers to think “what really is meaningful?”

In the **Meaningless** canvas, a blue dot(🔵) circles a stadium shape. At first, this movement appears meaningful and controlled, but its endless repetition soon produces a sense of discomfort, as if trapped in an unbreakable loop. In the **Meaningful** canvas, the blue dot wanders randomly across the screen. Its unpredictable movement initially feels absurd, but over time it draws the viewer’s attention as they begin to wonder where it will go next. Together, the two pieces metaphorically connect the workshop sketches to life itself: the white canvas becomes a metaphor for life, the black lines symbolize the trails we leave behind, and the blue dot represents ourselves. The work questions which path carries more meaning, staying within a structured pattern or breaking free in to chaos.

This prototype was set up on a large TV in a room, framed like a gallery space. Viewers were asked to engage with it as they would in a gallery, by reading the descriptions and observing the canvases. Although the prototype had no physically interactive component, the presentation itself emphasized the tension between title, description, and the visual form.

The prototype demonstrates a few clear strengths. Its simplicity and abstractness makes the metaphor accessible, and the reversal of labels provokes reflection. The dual structure of canvases helps viewers compare their interpretations of meaningfulness and meaninglessness. However, the prototype also leaves important questions open. How can interaction move beyond passive observation to embody thresholds? How might the experience scale to multiple screens without losing its reflective quality? And what forms, beyond circles and wandering dots, might loops and thresholds take?

Feedback from this testing session was intriguing. - -->

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
