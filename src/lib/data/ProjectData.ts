export interface Project {
	title: string;
	slug: string;
	route: string;
	guide: string;
	description: string;
}

export const projectData: Project[] = [
	{
		title: 'Myth of Sisyphus',
		slug: 'myth-of-sisyphus',
		route: '/projects/myth-of-sisyphus',
		guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
		description: `<p style="margin-block-start: 0;">
          <a
            href="https://www.google.com/books/edition/The_Myth_of_Sisyphus/zG9wDwAAQBAJ?hl=en&gbpv=0"
            target="_blank"
            style="color: #fff; text-decoration: underline;"
            >Myth of Sisyphus</a
          >, written by
          <a
            href="https://www.britannica.com/biography/Albert-Camus"
            target="_blank"
            style="color: #fff; text-decoration: underline;"
            >Albert Camus</a
          >, is a philosophical essay that explores the concept of the absurd
          and the human search for meaning in a meaningless world. This abstract
          representation of Sisyphus' eternal task examines the nature of
          repetitive actions in our own lives. Like Sisyphus pushing his
          boulder, we find ourselves in daily loops, yet through these cycles we
          can discover purpose and even joy in the simplest of actions.
        </p>
        <p>There are two ways to interact with this project.</p>
        <ol type="1">
          <li>
            With mouse: Drag the <span style="color: #ff8800;">●</span> with your mouse.
          </li>
          <li>
            With hand (Recommended): Use your webcam to control the
            <span style="color: #ff8800;">●</span>. There will be a small circle on the
            screen as the indicator for your hand position.
          </li>
        </ol>`
	},
	{
		title: 'Doors',
		slug: 'doors',
		route: '/projects/doors',
		guide: 'This project contains audio.\nPlease ensure your volume is turned on.',
		description: `<p style="margin-block-start: 0;">
			Doors act as gateways that allow us to move through space, much like
			the transitions we experience in life. We enter and exit different
			phases, and each doorway transforms who we are. Just as an infinite
			stairway ascends through these transitions, we progress from child to
			adult, student to professional, and beyond as each role shapes our
			identity with every step.
		</p>
		<p>
			The alternating black and white doors symbolize the ongoing cycle and
			duality of existence, such as life and death, light and darkness, and
			beginnings and endings. As we walk through this unending corridor of
			doors, we witness how each transition reshapes us and guides us toward
			our next transformation. The journey continues infinitely, reminding
			us that every ending is simply the start of a new beginning.
		</p>`
	},
	{
		title: 'Accumulation',
		slug: 'accumulation',
		route: '/projects/accumulation',
		guide: 'This project contains audio.\nPlease ensure your volume is turned on.',
		description: `<p style="margin-block-start: 0;">
			Accumulation is a digital reflection of a physical process: drawing a black circle,
			covering it with white, and repeating. What seems like a simple, meaningless loop
			gradually builds weight — both literally on a canvas, and metaphorically in code.
			Each iteration leaves behind traces, even if partially erased, creating layers of
			hidden history beneath the surface. This work explores how small, repetitive
			actions accumulate over time, carrying subtle changes and quiet narratives within
			cycles that feel monotonous on the surface.
		</p>
		<p>
			Inspired by my painting project Blank Canvas, this piece asks the viewer to consider
			what's happening beneath repetition — how mistakes, adjustments, and tiny decisions
			compound. Even when actions feel routine or insignificant, they leave behind marks
			that shape what follows. Through code, I recreate that weight and persistence,
			inviting the audience to slow down and notice how loops, though seemingly
			meaningless, become records of patience, curiosity, and quiet transformation.
		</p>`
	}
];
