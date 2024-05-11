/**
 * Retrieves the name of a property from a given type.
 * This function enhances type safety by ensuring that the provided property name exists on the given type, preventing runtime errors due to incorrect property names.
 * @template T The type containing the property.
 * @param {keyof T} name The name of the property to retrieve.
 * @returns {string} The name of the property.
 * @example
 * // Example usage:
 * type FormValues = {
 *   firstName: string;
 *   lastName: string;
 * };
 * const propertyName = nameof<FormValues>('firstName');
 * console.log(propertyName); // Output: firstName
 */
export function nameof<T>(name: keyof T): string {
  return name as string;
}
