import { Player } from './Player';
import { TwitchPlayerEvent } from './TwitchPlayerEvent';
import { TwitchPlayerOptions } from './TwitchPlayerOptions';

/**
 * A TS wrapper for the Twitch interactive media player.
 */
export class TwitchPlayer {
  /**
   * The div HTML element where the player will appear.
   */
  get divId(): string {
    return this._divId;
  }

  /**
   * The player optiosn that were provided when the instance was constructed.
   */
  get twitchPlayerOptions(): TwitchPlayerOptions {
    return this._twitchPlayerOptions;
  }

  private readonly _player: Player;

  private readonly _divId!: string;

  private readonly _twitchPlayerOptions!: TwitchPlayerOptions;

  /**
   * Creates a new TwitchPlayer instance.
   * @param divId The div HTML element where the player will appear.
   * @param options The player initialization options.
   */
  constructor(divId: string, options: TwitchPlayerOptions) {
    this._player = new Player(divId, options);
  }

  /**
   * Pauses the player.
   */
  public pause(): void {
    this._player.pause();
  }

  /**
   * Begins playing the specified video.
   */
  public play(): void {
    this._player.play();
  }

  /**
   * Seeks to the specified timestamp (in seconds) in the video and resumes playing if paused. Does not work for live streams.
   * @param timestamp The specified timestamp (in seconds).
   */
  public seek(timestamp: number): void {
    this._player.seek(timestamp);
  }

  /**
   * Sets the channel to be played.
   * @param channel The selected channel.
   */
  public setChannel(channel: string): void {
    this._player.setChannel(channel);
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
    this._player.setCollection(collectionId, videoId);
  }

  /**
   * Sets the quality of the video. quality should be a string value returned by getQualities.
   * @param quality The quality to be set.
   */
  public setQuality(quality: string): void {
    this._player.setQuality(quality);
  }

  /**
   * Sets the video to be played to be played and starts playback at timestamp (in seconds).
   * @param videoID The identifier of the video to be played.
   * @param timestamp The spot where the playback will be started (in seconds).
   */
  public setVideo(videoID: string, timestamp: number): void {
    this._player.setVideo(videoID, timestamp);
  }

  /**
   * Returns true if the player is muted; otherwise, false.
   */
  public getMuted(): boolean {
    return this._player.getMuted();
  }

  /**
   * If true, mutes the player; otherwise, unmutes it. This is independent of the volume setting.
   * @param muted If true, player will be muted. Otherwise, it will be unmuted.
   */
  public setMuted(muted: boolean): void {
    this._player.setMuted(muted);
  }

  /**
   * Returns the volume level, a value between 0.0 and 1.0.
   */
  public getVolume(): number {
    return this._player.getVolume();
  }

  /**
   * Sets the volume to the specified volume level, a value between 0.0 and 1.0.
   * @param volumeLevel A number between 0 and 1.
   */
  public setVolume(volumeLevel: number): void {
    this._player.setVolume(volumeLevel);
  }

  /**
   * Returns the channel’s name. Works only for live streams, not VODs.
   */
  public getChannel(): string {
    return this._player.getChannel();
  }

  /**
   * Returns the current video’s timestamp, in seconds. Works only for VODs, not live streams.
   */
  public getCurrentTime(): number {
    return this._player.getCurrentTime();
  }

  /**
   * Returns the duration of the video, in seconds. Works only for VODs,not live streams.
   */
  public getDuration(): number {
    return this._player.getDuration();
  }

  /**
   * Returns true if the live stream or VOD has ended; otherwise, false.
   */
  public getEnded(): boolean {
    return this._player.getEnded();
  }

  /**
   * Returns the available video qualities. For example, chunked (pass-through of the original source).
   */
  public getQualities(): string[] {
    return this._player.getQualities();
  }

  /**
   * Returns the current quality of video playback.
   */
  public getQuality(): string {
    return this._player.getQuality();
  }

  /**
   * Returns the video ID. Works only for VODs, not live streams.
   */
  public getVideo(): string {
    return this._player.getVideo();
  }

  /**
   * Returns true if the video is paused; otherwise, false. Buffering or seeking is considered playing.
   */
  public isPaused(): boolean {
    return this._player.isPaused();
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
    this._player.addEventListener(event.toString(), callback);
  }
}
