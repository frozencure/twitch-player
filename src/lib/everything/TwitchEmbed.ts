import { Embed } from './Embed';
import { TwitchEmbedOptions } from './TwitchEmbedOptions';
import { PlaybackStatistics } from './video/PlaybackStatistics';
import { TwitchPlayer } from './video/TwitchPlayer';
import { TwitchPlayerEvent } from './video/TwitchPlayerEvent';

/**
 * A TS wrapper for the Twitch interactive media player, that can also include the chat.
 */
export class TwitchEmbed {

  /**
   * The div HTML element where the player will appear.
   */
  get divId(): string {
    return this._divId;
  }

  /**
   * The player options that were provided when the instance was constructed.
   */
  get twitchEmbedOptions(): TwitchEmbedOptions {
    return this._twitchEmbedOptions;
  }

  private readonly _embed: Embed;

  private readonly _divId!: string;

  private readonly _player: TwitchPlayer;

  private readonly _twitchEmbedOptions!: TwitchEmbedOptions;

  /**
   * Creates a new TwitchEmbed instance.
   * @param divId The div HTML element where the player will appear.
   * @param options The player initialization options.
   */
  constructor(divId: string, options: TwitchEmbedOptions) {
    this._divId = divId;
    this._twitchEmbedOptions = options;
    try {
      if ((<any>window).Twitch && (<any>window).Twitch.Embed) {
        this._embed = new (<any>window).Twitch.Embed(divId, options);
      } else {
        console.warn('Player was created using the static file from inside the package. ' +
          'Please add the Twitch.Embed script to *index.html*, if you want to download the script directly from Twitch');
        this._embed = new Embed(divId, options);
      }
      this._player = TwitchPlayer.FromPlayer(this._embed.getPlayer());
    } catch (e) {
      this._embed = new Embed(divId, options);
      this._player = TwitchPlayer.FromPlayer(this._embed.getPlayer());
      console.exception('Player was created using the static, packaged file. ' +
        'Please add the Twitch.Embed script to *index.html*, if you want to download the script directly from Twitch.', e);
    }
  }


  /**
   * Adds an event listener for the given event.
   * @param event The event type to which the listener should react.
   * @param callback The logic that should happen when the listener fires.
   */
  public addEventListener(
    event: TwitchPlayerEvent,
    callback: () => void
  ): void {
    this._embed?.addEventListener(event.toString(), callback);
  }


  /**
   * Disables the captions for the content that is currently playing.
   */
  public disableCaptions(): void {
    this._embed.disableCaptions();
  }

  /**
   * Enables the captions for the content that is currently playing.
   */
  public enableCaptions(): void {
    this._embed.enableCaptions();
  }

  /**
   * Retrieves the playback statistics for this player.
   * The statistics contain information such as video FPS, resolution, latency and dropped frames.
   */
  public getPlaybackStatistics(): PlaybackStatistics {
    return this._embed.getPlaybackStats();
  }

  /**
   * Returns the channel’s identifier. Works only for live streams, not VODs.
   */
  public getChannelId(): string | undefined {
    return this._embed.getChannelId();
  }

  /**
   * Returns the name of the collection currently being played.
   */
  public getCollection(): string | undefined {
    return this._embed.getCollection();
  }

  /**
   * Sets the channel to be played.
   * @param channelId The selected channel's identifier.
   */
  public setChannelId(channelId: string): void {
    this._embed.setChannelId(channelId);
  }

  /**
   * Returns the Twitch.Player object.
   * Can be used for more fine-grained control of the player.
   */
  public getPlayer(): TwitchPlayer {
    return this._player;
  }

  /**
   * Pauses the player.
   */
  public pause(): void {
    this._embed.pause();
  }

  /**
   * Begins playing the specified video.
   */
  public play(): void {
    this._embed.play();
  }

  /**
   * Seeks to the specified timestamp (in seconds) in the video and resumes playing if paused. Does not work for live streams.
   * @param timestamp The specified timestamp (in seconds).
   */
  public seek(timestamp: number): void {
    this._embed.seek(timestamp);
  }

  /**
   * Sets the channel to be played.
   * @param channel The selected channel.
   */
  public setChannel(channel: string): void {
    this._embed.setChannel(channel);
  }

  /**
   * Sets the collection to be played.
   * Optionally also specifies the video within the collection, from which to start playback.
   * If a video ID is not provided here or the specified video is not part of the collection,
   * playback starts with the first video in the collection.
   * @param collectionId The identifier for the collection.
   * @param videoId The identifier for the video.
   */
  setCollection(collectionId: string, videoId?: string): void {
    this._embed.setCollection(collectionId, videoId);
  }

  /**
   * Sets the quality of the video. quality should be a string value returned by getQualities.
   * @param quality The quality to be set.
   */
  public setQuality(quality: string): void {
    this._embed.setQuality(quality);
  }

  /**
   * Sets the video to be played to be played and starts playback at timestamp (in seconds).
   * @param videoID The identifier of the video to be played.
   * @param timestamp The spot where the playback will be started (in seconds).
   */
  public setVideo(videoID: string, timestamp: number): void {
    this._embed.setVideo(videoID, timestamp);
  }

  /**
   * Returns true if the player is muted; otherwise, false.
   */
  public getMuted(): boolean {
    return this._embed.getMuted();
  }

  /**
   * If true, mutes the player; otherwise, unmutes it. This is independent of the volume setting.
   * @param muted If true, player will be muted. Otherwise, it will be unmuted.
   */
  public setMuted(muted: boolean): void {
    this._embed.setMuted(muted);
  }

  /**
   * Returns the volume level, a value between 0.0 and 1.0.
   */
  public getVolume(): number {
    return this._embed.getVolume();
  }

  /**
   * Sets the volume to the specified volume level, a value between 0.0 and 1.0.
   * @param volumeLevel A number between 0 and 1.
   */
  public setVolume(volumeLevel: number): void {
    this._embed.setVolume(volumeLevel);
  }

  /**
   * Returns the channel’s name. Works only for live streams, not VODs.
   */
  public getChannel(): string | undefined {
    return this._embed.getChannel();
  }

  /**
   * Returns the current video’s timestamp, in seconds. Works only for VODs, not live streams.
   */
  public getCurrentTime(): number {
    return this._embed.getCurrentTime();
  }

  /**
   * Returns the duration of the video, in seconds. Works only for VODs,not live streams.
   */
  public getDuration(): number {
    return this._embed.getDuration();
  }

  /**
   * Returns true if the live stream or VOD has ended; otherwise, false.
   */
  public getEnded(): boolean {
    return this._embed.getEnded();
  }

  /**
   * Returns the available video qualities. For example, chunked (pass-through of the original source).
   */
  public getQualities(): string[] {
    return this._embed.getQualities();
  }

  /**
   * Returns the current quality of video playback.
   */
  public getQuality(): string {
    return this._embed.getQuality();
  }

  /**
   * Returns the video ID. Works only for VODs, not live streams.
   */
  public getVideo(): string | undefined {
    return this._embed.getVideo();
  }

  /**
   * Returns true if the video is paused; otherwise, false. Buffering or seeking is considered playing.
   */
  public isPaused(): boolean {
    return this._embed.isPaused();
  }


}
