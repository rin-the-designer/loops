# Loops

## Concept and Context

This project is an interactive artwork that reveals the tension between involuntary loops\* that we are placed in and the chosen thresholds\*\*, actions that we choose to take. The form of the work is a multi-screen installation composed of mini touch displays, each presenting unique interactive artwork. Alongside touch interactions, each display has a camera that enables motion-capture interactions, transforming viewer’s gestures into a subtle part of the experience. By situating multiple loops side by side, the piece underscores the paradox of repetition: while endless cycles may feel absurd, they can also hold meaning and possibility when reframed.

This project was born from a period of personal reflection following an intense phase of creative work. I felt caught in daily repetitions that seemed meaningless. Over time, I began to see these loops differently, I embraced them. It reminded me again of my personal motto: live like water. Water adapts to its environment, sometimes soft and yielding, sometimes forceful and unyielding. It follows the paths carved before it, yet over time it reshapes stone, carving out new directions. In the same way, I move through the loops of life that are given to me, but at every threshold I choose how to adapt, when to resist, and when to transform. This metaphor drives my motivation and also frames my goal for the audience. By experiencing these digital loops, viewers are invited to reflect on their own patterns and consider how subtle thresholds might open up new interpretations of their routines. Rather than resisting repetition, the work encourages acceptance, play, and the regaining of agency.

Within the context of interactive art, this project distinguishes itself because it positions interactivity not only as a physical engagement but also as a way to critically examine one's thoughts on repetition and absurdity. When viewers mentally engage with the artwork, I hope the they will take a moment to interpret and respond. The work suggests that rather than resisting these loops, we can accept their presence, embrace their absurdity, and ultimately regain a sense of agency.

## References and Research

Albert Camus's philosophical essay "The Myth of Sisyphus" was my primary inspiration, as it examines the absurdity of endless repetition while suggesting that meaning can still exist within it. This text helped me recognize the absurdity in my own life, opening a path toward reclaiming my sense of agency. Precedents in fine art such as the works by Seo-bo Park, Nam June Paik, and Hyunki Park helped me understand how repetition and absurdity have been explored in art form. Digital contemporary artworks by Rafaël Rozendaal and Zach Lieberman helped me imagine code as a medium to depict interactive loops.

Two primary research were conducted to narrow down the scope of the concept.

First was a drawing elicitation workshop where testers were asked to visualize abstract concepts as patterns. This research examined whether similar patterns would emerge in the sketches of the participants, and explored different forms of visualizing the given concept. Participants were presented with four words, _absurdity_, _meaningful_, _error_, and _success_, along with their dictionary definitions. They were then asked to intuitively draw patterns that came to mind.

The results -

The second research was diary study where subjects were asked to log what they’ve noticed themselves repeating unconsciously. They were asked to record at least 3 events per day for a total of 3 days. They were given a prompt to record the date and time, the event, emotion that emerged from realizing the repetitive action, and their thoughts on it.

The results -

## Loop 1 - Myth of Sisyphus

![Property 1=Variant7.png](static/images/loop-1.png)

Myth of Sisyphus is the first piece in the series, a digital interpretation of Albert Camus’ philosophical essay on the absurd and the human pursuit of meaning. The work transforms Sisyphus’ endless labor into an interactive, meditative loop.

The orange circle on the screen represents the boulder. Viewers can grasp and drag it either with a mouse or by using their hand through a webcam, which tracks motion in real time. As they push the digital rock toward the top of the screen, it inevitably rolls back down in either direction, inviting continuous repetition.

### Interaction

### Technical Overview

The sketch is built on JavaScript, p5.js for the canvas and ml5.js for hand tracking through camera input.

- **Hand tracking**
  Uses ml5.handPose() with a single-hand model (maxHands: 1, flipped: true). The function gotHands receives pose results and computes the average position of 6 keypoints (wrist and finger bases) to estimate hand center.
- **Motion smoothing**
  Hand coordinates are filtered with a lerp-based smoothing factor (handSmoothingFactor = 0.2) to prevent jitter and create fluid motion.
- **Spatial bounds**
  The hand position is constrained with screen insets (handBoundsInsetX/Y = 0.08, meaning 8% of the windowWidth/Height) to maintain consistent control regardless of camera framing.
- **Physics simulation**
  Gravity (0.5) acts on the rock’s velocity. The hill geometry flips direction at the end of each iteration, forming an endless repetition. The rock’s position updates along the slope equation to simulate rolling motion.

## Prototype 1

![image.png](static/images/prototype-1.jpg)

The first prototype, available at [https://thesis.rin.kim/prototype-01/index.html](https://thesis.rin.kim/prototype-01/index.html), explores the findings from the drawing elicitation research. A pattern that emerged from participants’ drawing was the consistent depiction of absurdity as random scribbles and meaningfulness as symmetrical or structured sketches. To challenge this expectation, these patterns were digitalized with the titles reversed. The canvas resembling participants’ “_meaningful_” sketches was titled **Meaningless(무의미)**, while the one resembling “_absurd_” sketches was titled **Meaningful(유의미)**. By defamiliarizing and reversing common assumptions, the artwork triggers viewers to think “what really is meaningful?”

In the **Meaningless** canvas, a blue dot(🔵) circles a stadium shape. At first, this movement appears meaningful and controlled, but its endless repetition soon produces a sense of discomfort, as if trapped in an unbreakable loop. In the **Meaningful** canvas, the blue dot wanders randomly across the screen. Its unpredictable movement initially feels absurd, but over time it draws the viewer’s attention as they begin to wonder where it will go next. Together, the two pieces metaphorically connect the workshop sketches to life itself: the white canvas becomes a metaphor for life, the black lines symbolize the trails we leave behind, and the blue dot represents ourselves. The work questions which path carries more meaning, staying within a structured pattern or breaking free in to chaos.

This prototype was set up on a large TV in a room, framed like a gallery space. Viewers were asked to engage with it as they would in a gallery, by reading the descriptions and observing the canvases. Although the prototype had no physically interactive component, the presentation itself emphasized the tension between title, description, and the visual form.

The prototype demonstrates a few clear strengths. Its simplicity and abstractness makes the metaphor accessible, and the reversal of labels provokes reflection. The dual structure of canvases helps viewers compare their interpretations of meaningfulness and meaninglessness. However, the prototype also leaves important questions open. How can interaction move beyond passive observation to embody thresholds? How might the experience scale to multiple screens without losing its reflective quality? And what forms, beyond circles and wandering dots, might loops and thresholds take?

Feedback from this testing session was intriguing. -

## Technology Stack

- Frontend: SvelteKit
- Deployment: Vercel
- Canvas: p5.js
- Motion Sensing: ml5.js
