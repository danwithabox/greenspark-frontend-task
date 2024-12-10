import { guardExhaustiveSwitchCase } from "./guard-exhaustive-switch-case";

/**
 * Use this to make sure that a given switch cases explicitly handles all possible values, when it's critical to handle all possible values.
 * 
 * Use the milder {@linkcode guardExhaustiveSwitchCase} if it's not critical to explicitly handle all possible values.
 * 
 * As opposed to {@linkcode guardExhaustiveSwitchCase}, do use with `throw` in front of it:
 * ```ts
 * switch (values) {
 *     case: "value1": return;
 *     default: throw assertExhaustiveSwitchCase(values);
 * }
 * ```
 */
export function assertExhaustiveSwitchCase(value: never): asserts value is never {
    throw new Error(`Unhandled switch case: ${value}`);
}
