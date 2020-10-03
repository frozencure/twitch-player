/**
 * Enum that holds the differnt values for the Twitch.Embed layout property.
 */
export enum TwitchEmbedLayout {
  /**
   * Default if channel is provided, and only supported for live content.
   * Shows both video and chat side-by-side.
   * At narrow sizes, chat renders under the video player.
   */
  VIDEO_WITH_CHAT = 'video-with-chat',
  /**
   * Default if channel is not provided.
   * Shows only the video player (omits chat).
   */
  VIDEO = 'video'
}
