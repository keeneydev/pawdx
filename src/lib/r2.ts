/** Build an R2 object key for an uploaded image. */
export function imageKey(id: string, ext: string): string {
  return `dogs/${id}.${ext}`;
}
