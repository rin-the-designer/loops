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
		thumbnail: '/project-content/myth-of-sisyphus/thumb.png',
		guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
		interaction: [{ type: 'camera' }, { type: 'click' }],
		excerpt:
			'A visual represenation of a philosophical essay that explores the concept of the absurd and the human search for meaning in a meaningless world.',
		description: `<p style="margin-block-start: 0;">
			In Camus's retelling of the Greek myth, Sisyphus is condemned to push a boulder up a hill, only to watch it roll back down, endlessly. Camus finds in this not tragedy but defiance: the act of pushing becomes its own purpose. This piece translates the myth into something you can touch. Push the boulder up the slope with your hand or mouse; when it reaches the top, the hill flips and the cycle continues. There is no score, no ending. The choice of whether to keep pushing, stop, or hold the boulder still belongs entirely to you.
		</p>`
	},
	{
		title: 'Doors',
		slug: 'doors',
		route: '/projects/doors',
		thumbnail: '/project-content/doors/thumb.png',
		guide:
			'This project contains audio.\nPlease ensure your volume is turned on.\nCamera input is optional.',
		interaction: [{ type: 'audio' }, { type: 'camera', optional: true }],
		excerpt:
			'A continuous cylce of black and white doors representing the transitions we experience in life.',
		description: `<p style="margin-block-start: 0;">
			A door is one of the most ordinary objects we encounter, yet every doorway marks a small shift: from work to home, from public to private, from one phase of life to another. <span style="font-style: italic;">Doors</span> stretches this quiet transformation into an infinite corridor. Black and white thresholds alternate as the viewer drifts forward, the colors standing in for the dualities that frame any transition: light and dark, presence and absence, beginning and ending. There is no final room. The loop continues because transition itself never ends.
		</p>`
	},
	{
		title: 'Accumulation',
		slug: 'accumulation',
		route: '/projects/accumulation',
		thumbnail: '/project-content/accumulation/thumb.png',
		guide:
			'This project utilizes click interaction.\nPotentially flashing content.\nAudio is optional.',
		interaction: [{ type: 'click' }, { type: 'flash' }, { type: 'audio', optional: true }],
		excerpt:
			'A digital reflection of the accumulation of small, repetitive actions, adding up to a larger pattern.',
		description: `<p style="margin-block-start: 0;">
			This piece began as a painting exercise: drawing black circles on a canvas, covering them with white paint, and repeating until the canvas appeared blank again. From a distance, nothing seemed to have changed. Up close, the surface had grown heavier with every layer. <span style="font-style: italic;">Accumulation</span> recreates that logic on screen. Layers stack invisibly, one each second, never erased, only added. The work asks what it means to accumulate without leaving a visible record, and how much of who we become is built from cycles that quietly pile up beneath the surface.
		</p>`
	},
	{
		title: 'Zen Garden',
		slug: 'zen-garden',
		route: '/projects/zen-garden',
		thumbnail: '/project-content/zen-garden/thumb.png',
		guide: 'Audio is optional.',
		interaction: [{ type: 'audio', optional: true }],
		excerpt:
			'A visualized graphic of a Karesansui, focusing on the tranquility and patterns of the raking.',
		description: `<p style="margin-block-start: 0;">
			The dry landscape garden is built on the practice of raking. The same gesture, drawn across sand again and again, produces lines that are both marks of labor and objects of contemplation. Nothing is planted and nothing grows. The work is the maintenance, and the maintenance is the point. <span style="font-style: italic;">Zen Garden</span> takes that ritual as its material. Curved lines appear band by band across the screen, hold for a moment, fade, and begin again. There is nothing to do here, only the choice of how long to stay.
		</p>`
	},
	{
		title: 'Incense',
		slug: 'incense',
		route: '/projects/incense',
		thumbnail: '/project-content/incense/thumb.png',
		guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
		interaction: [{ type: 'camera' }],
		excerpt:
			'A visualization of a burning incense, changing directions through human interaction, representing the connection between life and death.',
		description: `<p style="margin-block-start: 0;">
			In many East Asian cultural practices, incense is burned during ceremonies and rituals as a way of connecting the living with those who have passed. The smoke is read as presence: when it drifts toward someone, it is sometimes understood as a sign that an ancestor has arrived. The act of burning is itself a kind of loop, the same ritual repeated across generations. <span style="font-style: italic;">Incense</span> renders that loop digitally. A stick fades in, glows, burns down, and the cycle begins again. The smoke shifts in response to the viewer's position, as real smoke would.
		</p>`
	},
	{
		title: 'Playground Spinner',
		slug: 'playground-spinner',
		route: '/projects/playground-spinner',
		thumbnail: '/project-content/playground-spinner/thumb.png',
		guide:
			'This project utilizes camera input.\nPlease allow access to your camera.\nPotentially flashing content.',
		interaction: [{ type: 'camera' }, { type: 'flash' }],
		excerpt: 'A revisit to a childhood playground memory.',
		description: `<p style="margin-block-start: 0;">
			The playground spinner, also known as a merry-go-round, is one of those objects whose entire purpose is the act itself. There is no goal in spinning it, no score, no destination, only the spin. For many people it is also a shared childhood memory: you ran toward it, grabbed a handle, and pushed. <span style="font-style: italic;">Playground Spinner</span> renders that object digitally. Move your hand in front of the screen and it spins, slows, and waits for the next push. The loop has no purpose beyond its own continuation, much like the spinning we did as children.
		</p>`
	},
	// {
	// 	title: 'The Continuance',
	// 	slug: 'continuance',
	// 	route: '/projects/continuance',
	// 	thumbnail: '/project-content/continuance/thumb.png',
	// 	guide: 'Camera input is optional.',
	// 	interaction: [{ type: 'camera', optional: true }],
	// 	excerpt: 'A fictional story of an artist finding their way through a mundane cycle.',
	// 	description: `<p style="margin-block-start: 0;">
	// 		The Continuance is a finctional story of an artist finding their way through a mundane cycle.
	// 		It is a tranquil journey of realizing patterns in our daily lives, facing a wall of uncertainty,
	// 		and finding a way to continue.
	// 	</p>
	// 	<p style="margin-block-start: 0;">
	// 		This work is a complemntary piece to the other projects in this collection.
	// 	</p>`
	// },
	// {
	// 	title: 'Thresholds',
	// 	slug: 'thresholds',
	// 	route: '/projects/thresholds',
	// 	thumbnail: '/project-content/thresholds/thumb.png',
	// 	guide: 'This project utilizes camera input.\nPlease allow access to your camera.',
	// 	interaction: [{ type: 'camera' }],
	// 	excerpt: 'A visualization of the thresholds we face in the loop of life.',
	// 	description: `<p style="margin-block-start: 0;">
	// 		Thresholds takes this project back to the beginning. The project started out with
	// 		myself defining involuntary circumstances and the voluntary actions that we take as loops
	// 		and thresholds. This project is a coded version of the first sketch I created for this collection.
	// 	</p>
	// 	<p style="margin-block-start: 0;">
	// 		The piece captures the number of people visible in the camera view, and detects
	// 		arm movements to make a "threshold" in a continuous "loop".
	// 	</p>`
	// },
	{
		title: 'Meaning',
		slug: 'meaningful-meaningless',
		route: '/projects/meaningful-meaningless',
		thumbnail: '/project-content/meaningful-meaningless/thumb.png',
		guide: 'Click interaction available to zoom in to artworks and descriptions.',
		interaction: [{ type: 'click', optional: true }],
		excerpt:
			'Reflection on how repetition, structure, and unpredictability shape our sense of meaning.',
		description: `<p style="margin-block-start: 0;">
			This piece grew out of a simple observation. When asked to draw "meaningful" and "absurd," people consistently drew structure for the first and randomness for the second, even when their reasoning differed. <span style="font-style: italic;">Meaning</span> takes that finding and reverses it: the structured canvas, an orange dot circling a fixed track, is titled Meaningless. The chaotic canvas, an orange dot drifting unpredictably, is titled Meaningful. The piece asks how quickly meaning is assigned to a form, and what happens when the labels don't match what the eye expects. Meaning, it suggests, is less in the form than in the looking.
		</p>`
	}
	// {
	// 	title: 'Large Loop Model',
	// 	slug: 'large-loop-model',
	// 	route: '/projects/large-loop-model',
	// 	thumbnail: '/project-content/large-loop-model/thumb.png',
	// 	guide: '',
	// 	interaction: [],
	// 	excerpt: 'Work In Progress.',
	// 	description: `<p style="margin-block-start: 0;">
	// 		Text Work In Progress.
	// 	</p>`
	// },
	// {
	// 	title: 'Not the Same Sun',
	// 	slug: 'not-the-same-sun',
	// 	route: '/projects/not-the-same-sun',
	// 	thumbnail: '/project-content/not-the-same-sun/thumb.png',
	// 	guide: '',
	// 	interaction: [],
	// 	excerpt: 'Work In Progress.',
	// 	description: `<p style="margin-block-start: 0;">
	// 		"In a foreign country, the sun bathing the houses on a hill in golden light.
	// 		A more intense emotion than that produced by the same sight in one's own country.
	// 		It is not the same sun. I know perfectly well that it is not the same sun."
	// 	</p>`
	// },
	// {
	// 	title: 'Fountain',
	// 	slug: 'fountain',
	// 	route: '/projects/fountain',
	// 	thumbnail: '/project-content/fountain/thumb.png',
	// 	guide: '',
	// 	interaction: [],
	// 	excerpt: 'Work In Progress.',
	// 	description: `<p style="margin-block-start: 0;">
	// 		Text work in progress.
	// 	</p>`
	// }
];
