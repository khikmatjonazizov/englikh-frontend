import {DisplayedIVerb, IVerbGameStore} from "@/entities/iVerbGame/model/types.ts";
import {getRandomInt} from "@/shared/lib/getRandom.ts";

type GetCurrentForIVerbGameProps = {
    randomIVerbIndex: number;
    unusedIVerbs: IVerbGameStore['unused_i_verbs'];
    missingFormsCount: IVerbGameStore['settings']['missing_forms_count'];
}

export const getCurrentForIVerbGame = (props: GetCurrentForIVerbGameProps) => {
    const {
        randomIVerbIndex,
        unusedIVerbs,
        missingFormsCount,
    } = props;

    const randomIVerbEntries = Object.entries(unusedIVerbs[randomIVerbIndex]);
    const iVerbFormsRandomIndex = getRandomInt(randomIVerbEntries.length)
    const displayedIVerb: DisplayedIVerb = {}

    randomIVerbEntries.forEach(([key, value], idx) => {
        if (missingFormsCount === 1 && idx !== iVerbFormsRandomIndex) {
            displayedIVerb[key as keyof DisplayedIVerb] = value;
        } else if (missingFormsCount === 2 && idx === iVerbFormsRandomIndex) {
            displayedIVerb[key as keyof DisplayedIVerb] = value;
        }
    })

    const current: IVerbGameStore['current'] = {
        i_verb: unusedIVerbs[randomIVerbIndex],
        displayed_i_verb: displayedIVerb,
    }

    const newUnusedIVerbs = structuredClone(unusedIVerbs)
    newUnusedIVerbs.splice(randomIVerbIndex, 1)

    return {
        current,
        newUnusedIVerbs,
    }
}
