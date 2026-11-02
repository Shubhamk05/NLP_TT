"""
Curated benchmark corpus for authorship attribution and stylometric classification.
Samples are partitioned by distinct source work to prevent data leakage.
"""

AUTHOR_CORPUS = [
    # Arthur Conan Doyle
    {
        "author": "Arthur Conan Doyle",
        "work": "A Scandal in Bohemia",
        "text": (
            "To Sherlock Holmes she is always THE woman. I have seldom heard him mention her under any other name. "
            "In his eyes she obscures and eclipses the whole of her sex. It was not that he felt any emotion akin to love "
            "for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably "
            "balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, "
            "but as a lover he would have placed himself in a false position. He never spoke of the softer passions, "
            "save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil "
            "from men’s motives and actions."
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "The Red-Headed League",
        "text": (
            "I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in "
            "deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair. With an apology "
            "for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door "
            "behind me. 'You could not have come at a better time, my dear Watson,' he said cordially. 'I was afraid "
            "that you were engaged.' 'So I am. Very much so.' 'Then I can wait in the next room.' 'Not at all. This "
            "gentleman, Mr. Wilson, has been my partner and helper in many of my most successful cases.'"
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "The Hound of the Baskervilles",
        "text": (
            "Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions "
            "when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up "
            "the stick which our visitor had left behind him the night before. It was a fine, thick piece of wood, "
            "bulbous-headed, of the sort which is known as a 'Penang lawyer.' Just under the head was a broad silver "
            "band nearly an inch across. 'To James Mortimer, M.R.C.S., from his friends of the C.C.H.,' was engraved "
            "upon it, with the date '1884.' It was just such a stick as the old-fashioned family practitioner used to carry—dignified, "
            "solid, and reassuring."
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "A Study in Scarlet",
        "text": (
            "'I have my eye on a suite in Baker Street,' he said, 'which would suit us down to the ground. You don't mind "
            "the smell of strong tobacco, I hope?' 'I always smoke “ship's” myself,' I answered. 'That's good enough. "
            "I generally have chemicals about, and occasionally do experiments. Would that annoy you?' 'By no means.' "
            "'Let me see—what are my other shortcomings? I get in the dumps at times, and don't open my mouth for days "
            "on end. You must not think I am sulky when I do that. Just let me alone, and I'll soon be right. What have "
            "you to confess now? It's just as well for two fellows to know the worst of one another before they begin to live together.'"
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "The Final Problem",
        "text": (
            "It is with a heavy heart that I take up my pen to write these the last words in which I shall ever record "
            "the singular gifts by which my friend Mr. Sherlock Holmes was distinguished. In an incoherent and, as I deeply "
            "feel, an entirely inadequate fashion, I have endeavoured to give some account of my strange experiences in his "
            "company from the chance which first brought us together in the period of the 'Study in Scarlet,' up to the time "
            "of his interference in the matter of the Naval Treaty."
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "The Boscombe Valley Mystery",
        "text": (
            "We were seated at breakfast one morning, my wife and I, when the maid brought in a telegram. It was from "
            "Sherlock Holmes and ran in this way: 'Have you a couple of days to spare? Have just been wired for from the "
            "west of England in connection with Boscombe Valley tragedy. Shall be esteemed if you will come with me. Air "
            "and scenery perfect. Leave Paddington by the 11.15.' 'What do you say, dear?' said my wife, looking across "
            "at me. 'Will you go?' 'I really don't know what to say. I have a fairly long list at present.'"
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "The Sign of the Four",
        "text": (
            "Sherlock Holmes took his bottle from the corner of the mantel-piece and his hypodermic syringe from its "
            "neat morocco case. With his long, white, nervous fingers he adjusted the delicate needle, and rolled back "
            "his left shirt-cuff. For some little time his eyes rested thoughtfully upon the sinewy forearm and wrist "
            "all dotted and scarred with innumerable puncture-marks. 'Which is it to-day?' I asked, 'morphine or cocaine?' "
            "He raised his eyes languidly from the old black-letter volume which he had opened. 'It is cocaine,' he said, "
            "'a seven-per-cent solution. Would you care to try it?'"
        )
    },
    {
        "author": "Arthur Conan Doyle",
        "work": "The Adventure of the Speckled Band",
        "text": (
            "On glancing over my notes of the seventy odd cases in which I have during the last eight years studied the "
            "methods of my friend Sherlock Holmes, I find many tragic, some comic, a large number merely strange, but "
            "none commonplace; for, working as he did rather for the love of his art than for the acquirement of wealth, "
            "he refused to associate himself with any investigation which did not tend towards the unusual, and even the fantastic."
        )
    },

    # Jane Austen
    {
        "author": "Jane Austen",
        "work": "Pride and Prejudice",
        "text": (
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want "
            "of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, "
            "this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful "
            "property of some one or other of their daughters. 'My dear Mr. Bennet,' said his lady to him one day, 'have "
            "you heard that Netherfield Park is let at last?' Mr. Bennet replied that he had not. 'But it is,' returned "
            "she; 'for Mrs. Long has just been here, and she told me all about it.'"
        )
    },
    {
        "author": "Jane Austen",
        "work": "Sense and Sensibility",
        "text": (
            "The family of Dashwood had long been settled in Sussex. Their estate was large, and their residence was at "
            "Norland Park, in the centre of their property, where, for many generations, they had lived in so respectable "
            "a manner as to engage the general good opinion of their surrounding acquaintance. The late owner of this "
            "estate was a single man, who lived to a very advanced age, and who for many years of his life, had a constant "
            "companion and housekeeper in his sister. But her death, which happened ten years before his own, produced "
            "a great alteration in his home."
        )
    },
    {
        "author": "Jane Austen",
        "work": "Emma",
        "text": (
            "Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite "
            "some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little "
            "to distress or vex her. She was the youngest of the two daughters of a most affectionate, indulgent father; "
            "and had, in consequence of her sister’s marriage, been mistress of his house from a very early period. Her "
            "mother had died too long ago for her to have more than an indistinct remembrance of her caresses."
        )
    },
    {
        "author": "Jane Austen",
        "work": "Persuasion",
        "text": (
            "Sir Walter Elliot, of Kellynch Hall, in Somersetshire, was a man who, for his own amusement, never took "
            "up any book but the Baronetage; there he found occupation for an idle hour, and consolation in a distressed "
            "one; there his faculties were roused into admiration and respect, by contemplating the limited remnant of "
            "the earliest patents; there any unwelcome sensations, arising from domestic affairs changed naturally into "
            "pity and contempt as he turned over the almost endless creations of the last century."
        )
    },
    {
        "author": "Jane Austen",
        "work": "Northanger Abbey",
        "text": (
            "No one who had ever seen Catherine Morland in her infancy would have supposed her born to be an heroine. "
            "Her situation in life, the character of her father and mother, her own person and disposition, were all "
            "equally against her. Her father was a clergyman, without being neglected, or poor, and a very respectable "
            "man, though his name was Richard—and he had never been handsome. He had a considerable independence, besides "
            "two good livings—and he was not in the least addicted to locking up his daughters."
        )
    },
    {
        "author": "Jane Austen",
        "work": "Mansfield Park",
        "text": (
            "About thirty years ago Miss Maria Ward, of Huntingdon, with only seven thousand pounds, had the good luck "
            "to captivate Sir Thomas Bertram, of Mansfield Park, in the county of Northampton, and to be thereby raised "
            "to the rank of a baronet's lady, with all the comforts and consequences of an handsome house and large income. "
            "All Huntingdon exclaimed on the greatness of the match, and her uncle, the lawyer, himself, allowed her to "
            "be at least three thousand pounds short of any equitable claim to it."
        )
    },
    {
        "author": "Jane Austen",
        "work": "Pride and Prejudice (Vol II)",
        "text": (
            "Elizabeth Bennet had been at Netherfield a week, when she was invited to walk out with her sister Jane. "
            "The civility of the Bingleys towards her was uninterrupted, and Darcy had gradually learnt to admire the "
            "fine eyes of Elizabeth, and to find a pleasant ease and playfulness in her conversation. The Bennets were "
            "speedily to assemble, and Mrs. Bennet was perpetually contriving excuses for staying, while Mr. Collins "
            "discoursed pompously on the virtues of his patroness Lady Catherine de Bourgh."
        )
    },
    {
        "author": "Jane Austen",
        "work": "Sense and Sensibility (Vol II)",
        "text": (
            "Marianne's mind was completely engrossed by Willoughby. In the quiet evenings at Barton Cottage, her "
            "conversations with Elinor turned constantly upon the taste, the sentiments, and the agreeable manners "
            "of that young gentleman. Elinor observed with grave concern the excess of her sister's sensibility, while "
            "Mrs. Dashwood encouraged every romantic impulse with unreflecting maternal partiality."
        )
    },

    # Charles Dickens
    {
        "author": "Charles Dickens",
        "work": "A Tale of Two Cities",
        "text": (
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, "
            "it was the epoch of belief, it was the epoch of incredulity, it was the season of light, it was the season "
            "of darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had "
            "nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the "
            "period was so far like the present period, that some of its noisiest authorities insisted on its being received, "
            "for good or for evil, in the superlative degree of comparison only."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "Great Expectations",
        "text": (
            "My father's family name being Pirrip, and my christian name Philip, my infant tongue could make of both "
            "names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip. I give "
            "Pirrip as my father's family name, on the authority of his tombstone and my sister—Mrs. Joe Gargery, who "
            "married the blacksmith. As I never saw my father or my mother, and never saw any likeness of either of them, "
            "my first fancies regarding what they were like were unreasonably derived from their tombstones."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "Bleak House",
        "text": (
            "London. Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable "
            "November weather. As much mud in the streets as if the waters had but newly retired from the face of the "
            "earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine "
            "lizard up Holborn Hill. Smoke lowering down from chimney-pots, making a soft black drizzle, with flakes of "
            "soot in it as big as full-grown snowflakes—gone into mourning, one might imagine, for the death of the sun."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "Oliver Twist",
        "text": (
            "Among other public buildings in a certain town, which for many reasons it will be prudent to refrain from "
            "mentioning, and to which I will assign no fictitious name, there is one anciently common to most towns, "
            "great or small: to wit, a workhouse; and in this workhouse was born; on a day and date which I need not "
            "trouble myself to repeat, inasmuch as it can be of no possible consequence to the reader, in this stage of "
            "the business at all events; the item of mortality whose name is prefixed to the head of this chapter."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "David Copperfield",
        "text": (
            "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody "
            "else, these pages must show. To begin my life with the beginning of my life, I record that I was born (as "
            "I have been informed and believe) on a Friday, at twelve o'clock at night. It was remarked that the clock "
            "began to strike, and I began to cry, simultaneously. In consideration of the day and hour of my birth, it "
            "was declared by the nurse, and by some sage women in the neighbourhood, that I was destined to be unlucky in life."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "A Christmas Carol",
        "text": (
            "Marley was dead: to begin with. There is no doubt whatever about that. The register of his burial was signed "
            "by the clergyman, the clerk, the undertaker, and the chief mourner. Scrooge signed it: and Scrooge’s name "
            "was good upon 'Change, for anything he chose to put his hand to. Old Marley was as dead as a door-nail. "
            "Mind! I don’t mean to say that I know, of my own knowledge, what there is particularly dead about a door-nail. "
            "I might have been inclined, myself, to regard a coffin-nail as the deadest piece of ironmongery in the trade."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "Hard Times",
        "text": (
            "'Now, what I want is, Facts. Teach these boys and girls nothing but Facts. Facts alone are wanted in life. "
            "Plant nothing else, and root out everything else. You can only form the minds of reasoning animals upon "
            "Facts: nothing else will ever be of any service to them.' The speaker, and the schoolmaster, and the third "
            "grown person present, all backed a little, and swept with their eyes the inclined plane of little vessels "
            "then and there arranged in order, ready to have imperial gallons of facts poured into them."
        )
    },
    {
        "author": "Charles Dickens",
        "work": "Nicholas Nickleby",
        "text": (
            "There once lived, in a secluded and rural part of Devonshire, a young man by name Ralph Nickleby, who "
            "after a long life of usury and shrewd speculation in London, found himself solitary, rich, and utterly unloved. "
            "His nephew Nicholas, by contrast, set forth into the world with a light heart, an honest spirit, and very little "
            "in his purse, determined to face adversity with manly courage and unyielding integrity."
        )
    },

    # Edgar Allan Poe
    {
        "author": "Edgar Allan Poe",
        "work": "The Tell-Tale Heart",
        "text": (
            "True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease "
            "had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all "
            "things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe "
            "how healthily—how calmly I can tell you the whole story. It is impossible to say how first the idea entered my brain; "
            "but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "The Cask of Amontillado",
        "text": (
            "The thousand injuries of Fortunato I had borne as I best could, but when he ventured upon insult I vowed revenge. "
            "You, who so well know the nature of my soul, will not suppose, however, that I gave utterance to a threat. "
            "At length I would be avenged; this was a point definitely settled—but the very definitiveness with which it "
            "was resolved precluded the idea of risk. I must not only punish, but punish with impunity. A wrong is unredressed "
            "when retribution overtakes its redresser."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "The Fall of the House of Usher",
        "text": (
            "During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively "
            "low in the heavens, I had been passing alone, on horseback, through a singularly dreary tract of country; "
            "and at length found myself, as the shades of the evening drew on, within view of the melancholy House of Usher. "
            "I know not how it was—but, with the first glimpse of the building, a sense of insufferable gloom pervaded my spirit."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "The Masque of the Red Death",
        "text": (
            "The 'Red Death' had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood "
            "was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, "
            "and then profuse bleeding at the pores, with dissolution. The scarlet stains upon the body and especially "
            "upon the face of the victim, were the pest ban which shut him out from the aid and from the sympathy of his fellow-men."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "The Pit and the Pendulum",
        "text": (
            "I was sick—sick unto death with that long agony; and when they at length unbound me, and I was permitted to sit, "
            "I felt that my senses were leaving me. The sentence—the dread sentence of death—was the last of distinct accentuation "
            "which reached my ears. After that, the sound of the inquisitorial voices seemed merged in one dreamy indeterminate "
            "hum. It conveyed to my soul the idea of revolution—perhaps from its association in fancy with the burr of a mill-wheel."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "The Murders in the Rue Morgue",
        "text": (
            "The mental features discoursed of as the analytical, are, in themselves, but little susceptible of analysis. "
            "We appreciate them only in their effects. We know of them, among other things, that they are always to their "
            "possessor, when inordinately possessed, a source of the liveliest enjoyment. As the strong man exults in his "
            "physical prowess, delighting in such exercises as call his muscles into action, so glories the analyst in that "
            "moral activity which disentangles."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "The Black Cat",
        "text": (
            "For the most wild, yet most homely narrative which I am about to pen, I neither expect nor solicit belief. "
            "Mad indeed would I be to expect it, in a case where my very senses reject their own evidence. Yet, mad am I not—and "
            "very surely do I not dream. But to-morrow I die, and to-day I would unburthen my soul. My immediate purpose "
            "is to place before the world, plainly, succinctly, and without comment, a series of mere household events."
        )
    },
    {
        "author": "Edgar Allan Poe",
        "work": "Ligeia",
        "text": (
            "I cannot, for my soul, remember how, when, or even precisely where, I first became acquainted with the lady "
            "Ligeia. Long years have since elapsed, and my memory is feeble through much suffering. Or, perhaps, I cannot "
            "now bring these points to mind, because, in truth, the character of my beloved, her rare learning, her singular "
            "yet placid cast of beauty, and the thrilling and enthralling eloquence of her low musical language, made "
            "their way into my heart by paces so steadily and stealthily progressive that they have been unnoticed and unknown."
        )
    },

    # H.G. Wells
    {
        "author": "H.G. Wells",
        "work": "The Time Machine",
        "text": (
            "The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. "
            "His grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burned brightly, "
            "and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and "
            "passed in our glasses. Our chairs, being his patents, embraced and caressed us rather than submitted to be sat "
            "upon; and there was that luxurious after-dinner atmosphere when thought roams gracefully free of the trammels of precision."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "The War of the Worlds",
        "text": (
            "No one would have believed in the last years of the nineteenth century that this world was being watched "
            "keenly and closely by intelligences greater than man’s and yet as mortal as his own; that as men busied "
            "themselves about their various concerns they were scrutinised and studied, perhaps almost as narrowly as a "
            "man with a microscope might scrutinise the transient creatures that swarm and multiply in a drop of water. "
            "With infinite complacency men went to and fro over this globe about their little affairs."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "The Invisible Man",
        "text": (
            "The stranger came early in February, one wintry day, through a biting wind and a driving snow, the last "
            "snowfall of the year, over the down, walking from Bramblehurst railway station, and carrying a little black "
            "portmanteau in his thickly gloved hand. He was wrapped up from head to foot, and the brim of his soft felt "
            "hat hid every inch of his face but the shiny tip of his nose; the snow had piled itself against his shoulders "
            "and chest, and added a white crest to the burden he carried."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "The Island of Doctor Moreau",
        "text": (
            "I do not propose to add anything to what has already been written concerning the loss of the Lady Vain. As "
            "everyone knows, she collided with a derelict when ten days out from Callao. The longboat with seven of the "
            "crew was picked up eighteen days later by the gunboat Mystic, and their story of privation and suffering has "
            "become almost a tragedy of the sea. They were brought to San Francisco by the gunboat."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "The First Men in the Moon",
        "text": (
            "As I sit down to write here at Lympne, I can see the whole of the Romney Marsh spread out before me, and "
            "the sea beyond. It is a peaceful morning, with a slight haze obscuring the distant coast of France. It seems "
            "scarcely possible that it was only two years ago that Cavor and I embarked on that tremendous enterprise which "
            "was to carry us beyond the limits of this terrestrial globe."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "The Food of the Gods",
        "text": (
            "In the middle days of the nineteenth century, when the great discoveries of science were tumbling upon the "
            "world in a swift succession of miracles, two obscure physiologists, Mr. Bensington and Professor Redwood, "
            "conceived the extraordinary idea of experimenting upon the growth of living organisms by means of a special "
            "chemical nutrient which they designated the Food of the Gods."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "The Sleeper Awakes",
        "text": (
            "Graham sat down in the corner of the small study, looking at the complex apparatus on the desk before him. "
            "For days a curious insomnia had seized upon him, a wakefulness so absolute that neither quiet narcotics "
            "nor monotonous mechanical vibrations could lull his brain into forgetfulness. He stared out across the dark "
            "streets of London, sensing the dim rumble of machinery that underlay modern civilisation."
        )
    },
    {
        "author": "H.G. Wells",
        "work": "In the Days of the Comet",
        "text": (
            "I saw the green star rise above the eastern horizon while the town below still slept under its pall of smoke. "
            "It was no ordinary astronomical visitor; its phosphorescent trail spread like a luminous fan across the constellations, "
            "casting an eerie emerald brilliance over the slate rooftops and the winding silver curve of the river."
        )
    }
]
