type SearchParam = { [paramName: string]: string | number | boolean | null | undefined };

type CreateSearchParams = (
    params: SearchParam,
    options?: {
        withPrefix?: boolean;
        removeNullish?: boolean;
    }
) => string;

export const createSearchParams: CreateSearchParams = (params, options) => {
    const {
        withPrefix = true,
        removeNullish = true,
    } = options ?? {};

    const searchParams: string[] = [];

    for (const [paramName, paramValue] of Object.entries(params)) {
        if (!removeNullish) {
            searchParams.push(`${paramName}=${paramValue}`);
            continue;
        }

        if (paramValue !== undefined && paramValue !== null) searchParams.push(`${paramName}=${paramValue}`);
    }

    return withPrefix ? '?' + searchParams.join('&') : searchParams.join('&');
}
