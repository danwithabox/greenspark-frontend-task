import { assertExhaustiveSwitchCase } from "./assert-exhaustive-switch-case";

/**
 * A milder, non-throwing version of {@linkcode assertExhaustiveSwitchCase},
 * for type-checking that a given switch case explicitly uses up all possible values.
 * 
 * As opposed to {@linkcode assertExhaustiveSwitchCase}, do not use with `throw` in front of it:
 * ```ts
 * switch (values) {
 *     case: "value1": return;
 *     default: guardExhaustiveSwitchCase(values); return values; // Make sure to return the checked variable, to avoid adding `undefined` to the resulting type.
 * }
 * ```
 */
export function guardExhaustiveSwitchCase(value: never): value is never {
    return false;
}
