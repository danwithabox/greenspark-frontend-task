/**
 * Makes sure a switch case explicitly uses up all possible values.
 * 
 * Usage:
 * ```ts
 * let values: "foo" | "bar" = "foo" as any; // Using `any` to prevent TypeScript from being too smart about type narrowing for this example.
 * switch (values) {
 *     case "foo": return;
 *     case "bar": return; // Comment out to cause an error in the default branch.
 *     default: guardExhaustiveSwitchCase(values); return values; // Make sure to return the checked variable, to avoid adding `undefined` to the resulting type.
 * }
 * ```
 */
export function guardExhaustiveSwitchCase(value: never): value is never {
    return false;
}
