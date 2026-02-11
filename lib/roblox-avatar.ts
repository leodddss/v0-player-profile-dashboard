/**
 * Returns the Roblox headshot thumbnail URL for a given userId.
 * This is the single source of truth for all avatar URLs in the app.
 */
export function getRobloxAvatar(userId: string): string {
  return `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`
}
