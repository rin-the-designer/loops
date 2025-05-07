export interface Project {
	title: string;
	slug: string;
	route: string;
	thumbnail: string;
	excerpt: string;
	guide: string;
	description: string;
	interaction: {
		type: 'camera' | 'click' | 'audio' | 'flash';
		optional?: boolean;
	}[];
}

export const projectData: Project[] = [
	{
		title: 'Myth of Sisyphus',
		slug: 'myth-of-sisyphus',
		route: '/projects/myth-of-sisyphus',
		thumbnail: '/projects/myth-of-sisyphus/thumb.png',
		guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
		interaction: [{ type: 'camera' }, { type: 'click' }],
		excerpt:
			'A visual represenation of a philosophical essay that explores the concept of the absurd and the human search for meaning in a meaningless world.',
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
		thumbnail: '/projects/doors/thumb.png',
		guide:
			'This project contains audio.\nPlease ensure your volume is turned on.\nCamera input is optional.',
		interaction: [{ type: 'audio' }, { type: 'camera', optional: true }],
		excerpt:
			'A continuous cylce of black and white doors representing the transitions we experience in life.',
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
		thumbnail: '/projects/accumulation/thumb.png',
		guide: 'This project utilizes click interaction.\nAudio is optional.',
		interaction: [{ type: 'click' }, { type: 'audio', optional: true }],
		excerpt: 'A digital reflection of the accumulation of small, repetitive actions.',
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
		</p>
		<p>
			Link to <a
            href="https://mfadt.rinchong.kim/spring-2025/pgte-5201/ms2-08"
            target="_blank"
            style="color: #fff; text-decoration: underline;"
            >'Blank Canvas'</a
          >
		`
	},
	{
		title: 'Zen Garden',
		slug: 'zen-garden',
		route: '/projects/zen-garden',
		thumbnail: '/projects/zen-garden/thumb.png',
		guide: 'Audio is optional.',
		interaction: [{ type: 'audio', optional: true }],
		excerpt:
			'A visualized graphic of a Karesansui, focusing on the tranquility and patterns of the raking.',
		description: `<p style="margin-block-start: 0;">
			Zen garden, originally called かれさんすい(枯山水) 'Karesansui', is a traditional
			Japanese landscape art that features a dry landscape design with rocks, sand,
			and plants. These gardens are raked continuously to create its patterns and designs.
			Just like the raking, we all have our daily routines and patterns. Sometimes they
			feel like a loop, and almost meaningless when seen from afar.
		</p>
		<p>
			However, when we look closely, we can see the beauty and the patterns in the
			small details. Like the karesansui, altough we feel like we are in a loop,
			we have the agency to the details and the changes we make within these loops.
		</p>`
	},
	{
		title: 'Incense',
		slug: 'incense',
		route: '/projects/incense',
		thumbnail: '/projects/incense/thumb.png',
		guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
		interaction: [{ type: 'camera' }],
		excerpt:
			'A visualization of the burning of incense, changing directions through human interaction.',
		description: `<p style="margin-block-start: 0;">
			In the asian culture, incense sticks are use for ceremonies and rituals, connecting
			the spirits of the living and the deceased. All loops in life comes to an end at the end
			of your life. Or, it could be a start of another loop in some cultural context.
		</p>
		<p>
			This project is a digital representation of a burning incense stick as a connection
			between life and death. The smoke changes directions based on the position of the
			viewer, just as it would change direction based on the wind of people moving by.
		</p>`
	},
	{
		title: 'Playground Spinner',
		slug: 'playground-spinner',
		route: '/projects/playground-spinner',
		thumbnail: '/projects/playground-spinner/thumb.png',
		guide:
			'This project utilizes camera input.\nPlease allow access to your camera.\nPotentially flashing content.',
		interaction: [{ type: 'camera' }, { type: 'flash' }],
		excerpt: 'A childhood memory.',
		description: `<p style="margin-block-start: 0;">
			Playground Spinner is a nostalgic trip down memory lane. It is a simple
			playground ride. Yet, looking at it from an adult's perspective, it was
			a ride that looped endlessly, but .
			</p>`
	},
	{
		title: 'The Continuance',
		slug: 'continuance',
		route: '/projects/continuance',
		thumbnail: '/projects/continuance/thumb.png',
		guide: 'Camera input is optional.',
		interaction: [{ type: 'camera', optional: true }],
		excerpt: 'A fictional story of an artist finding their way through a mundane cycle',
		description: `<p style="margin-block-start: 0;">
			The Continuance is a finctional story of an artist finding their way through a mundane cycle.
			It is a tranquil journey of realizing patterns in our daily lives, facing a wall of uncertainty,
			and finding a way to continue.
		</p>
		<p style="margin-block-start: 0;">
			This work is a complemntary piece to the other projects in this collection.
		</p>`
	},
	{
		title: 'Thresholds',
		slug: 'thresholds',
		route: '/projects/thresholds',
		thumbnail: '/projects/thresholds/thumb.png',
		guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
		interaction: [{ type: 'camera' }],
		excerpt: 'A visualization of the thresholds we face in our lives.',
		description: `<p style="margin-block-start: 0;">
			The Continuance is a finctional story of an artist finding their way through a mundane cycle.
			It is a tranquil journey of realizing patterns in our daily lives, facing a wall of uncertainty,
			and finding a way to continue.
		</p>
		<p style="margin-block-start: 0;">
			This work is a complemntary piece to the other projects in this collection.
		</p>`
	}
];
