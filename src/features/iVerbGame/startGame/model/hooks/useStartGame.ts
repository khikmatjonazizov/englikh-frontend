import {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/model/hooks";
import {getRandomInt} from "@/shared/lib/getRandom.ts";
import {UPDATE_I_VERB_GAME} from "@/entities/iVerbGame/model/slice.ts";
import {getCurrentForIVerbGame} from "@/shared/lib/getCurrentForIVerbGame.ts";

export const useStartGame = () => {
    const {
        settings: {missing_forms_count},
        unused_i_verbs
    } = useAppSelector(state => state.i_verb_game)
    const dispatch = useAppDispatch()

    const startGameWhenMissingFormsCountEqualOne = (randomIVerbIndex: number) => {
        const { current, newUnusedIVerbs } = getCurrentForIVerbGame({
            randomIVerbIndex,
            missingFormsCount: 1,
            unusedIVerbs: unused_i_verbs
        })

        dispatch(UPDATE_I_VERB_GAME({
            unused_i_verbs: newUnusedIVerbs,
            current,
        }))
    }

    const startGameWhenMissingFormsCountEqualTwo = (randomIVerbIndex: number) => {
        const { current, newUnusedIVerbs } = getCurrentForIVerbGame({
            randomIVerbIndex,
            missingFormsCount: 2,
            unusedIVerbs: unused_i_verbs
        })

        dispatch(UPDATE_I_VERB_GAME({
            unused_i_verbs: newUnusedIVerbs,
            current,
        }))
    }

    const startGame = useCallback(() => {
        const iVerbRandomIndex = getRandomInt(unused_i_verbs.length)

        if (missing_forms_count === 1) {
            startGameWhenMissingFormsCountEqualOne(iVerbRandomIndex)
        } else if (missing_forms_count === 2) {
            const randomIVerbEntries = Object.entries(Object.entries(unused_i_verbs[iVerbRandomIndex]))

            if (randomIVerbEntries.length > 2) {
                startGameWhenMissingFormsCountEqualTwo(iVerbRandomIndex);
                return;
            }

            startGameWhenMissingFormsCountEqualOne(iVerbRandomIndex)
        }
    }, [missing_forms_count, unused_i_verbs])

    return {
        startGame,
    }
}
