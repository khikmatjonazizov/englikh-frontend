import {IVerbGameStore, IVerbType} from "../model/types.ts";
import i_verbs from "@/shared/data/ex.json";

export const getIVerbsByPage = (page: IVerbGameStore['settings']['page']) => {
    let unused_i_verbs: IVerbType[] = [];

    switch (page) {
        case "1":
            unused_i_verbs = i_verbs.slice(0, 90) as IVerbType[];
            break;
        case "2":
            unused_i_verbs = i_verbs.slice(91) as IVerbType[];
            break;
        case "all":
            unused_i_verbs = i_verbs as IVerbType[];
    }

    return unused_i_verbs;
}
