import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/shared/model/hooks";
import {getRandomInt} from "@/shared/lib/getRandom.ts";
import {
    IVerbType,
    UserAnswer,
    IVerbGameStoreCurrent,
} from "@/entities/iVerbGame/model/types.ts";
import {UPDATE_APP} from "@/entities/app/model/slice.ts";
import {UPDATE_I_VERB_GAME} from "@/entities/iVerbGame/model/slice.ts";
import {getCurrentForIVerbGame} from "@/shared/lib/getCurrentForIVerbGame.ts";

type ExtraContinueGameProps = {
    userAnswer: UserAnswer;
    randomIVerbIndex: number;
    current: IVerbGameStoreCurrent;
}

export const useContinueGame = () => {
    const {
        settings: {missing_forms_count},
        current,
        unused_i_verbs,
        history,
        progress,
    } = useAppSelector(state => state.i_verb_game)
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const continueGameWhenMissingFormsCountEqualOne = (props: ExtraContinueGameProps) => {
        const {userAnswer, randomIVerbIndex, current} = props;
        const userAnswerEntries = Object.entries(userAnswer);

        let isIncorrect = false;


        for (const [key, value] of userAnswerEntries) {
            const userAnswer = value.trim()
            const currentIVerbForm = current.i_verb[key as keyof IVerbType]

            const isCorrectForm = currentIVerbForm.includes(value) ||
                currentIVerbForm.join(' ') === userAnswer ||
                currentIVerbForm.join('/') === userAnswer

            if (!isCorrectForm) {
                isIncorrect = true;
                break;
            }
        }

        const newCurrentAndNewUnusedIVerbs = getCurrentForIVerbGame({
            missingFormsCount: 1,
            unusedIVerbs: unused_i_verbs,
            randomIVerbIndex,
        })

        dispatch(UPDATE_I_VERB_GAME({
            unused_i_verbs: newCurrentAndNewUnusedIVerbs.newUnusedIVerbs,
            history: [...history, {
                is_correct: !isIncorrect,
                displayed_i_verb: current.displayed_i_verb,
                i_verb: current.i_verb,
                user_answer: userAnswer,
                answered_time: new Date(),
            }],
            current: newCurrentAndNewUnusedIVerbs.current,
            progress: {
                ...progress,
                incorrect_answers_count: isIncorrect ? progress.incorrect_answers_count + 1: progress.incorrect_answers_count,
                correct_answers_count: isIncorrect ? progress.correct_answers_count : progress.correct_answers_count + 1,
            }
        }))
    }

    const continueGameWhenMissingFormsCountEqualTwo = (props: ExtraContinueGameProps) => {
        console.log(props)
    }

    const continueGame = (userAnswer: UserAnswer) => {
        if (current === null) {
            dispatch(UPDATE_APP({errorType: 'internal_application_error'}))
            nav('/error')
            return;
        }


        const randomIVerbIndex = getRandomInt(unused_i_verbs.length)

        if (missing_forms_count === 1) {
            continueGameWhenMissingFormsCountEqualOne({userAnswer, randomIVerbIndex, current});
        } else if (missing_forms_count === 2) {
            continueGameWhenMissingFormsCountEqualTwo({userAnswer, randomIVerbIndex, current})
        }
    }

    return {
        continueGame,
    }
}
