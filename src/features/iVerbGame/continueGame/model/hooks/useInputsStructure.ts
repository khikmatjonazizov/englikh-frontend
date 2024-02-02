import {useMemo} from "react";
import {useAppSelector} from "@/shared/model/hooks";


type InputStructure = {
    placeholder: string;
}

export const useInputsStructure = () => {
    const {
        current,
    } = useAppSelector(state => state.i_verb_game)

    const inputsStructure = useMemo(() => {
        if (current === null) return []

        const inputs: InputStructure[] = [];
        if (!current.displayed_i_verb.v1 && current.i_verb.v1) {
            inputs.push({
                placeholder: 'V1',
            })
        }
        if (!current.displayed_i_verb.v2 && current.i_verb.v2) {
            inputs.push({
                placeholder: 'V2',
            })
        }
        if (!current.displayed_i_verb.v3 && current.i_verb.v3) {
            inputs.push({
                placeholder: 'V3',
            })
        }

        return inputs;

    }, [current])

    return {
        inputsStructure
    }
}
