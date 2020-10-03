import { Embed } from './Embed';
import { TwitchEmbedEvent } from './TwitchEmbedEvent';
import { TwitchEmbedOptions } from './TwitchEmbedOptions';
import { TwitchPlayer } from './video/TwitchPlayer';

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
    event: TwitchEmbedEvent,
    callback: () => void
  ): void {
    this._embed?.addEventListener(event.toString(), callback);
  }


  /**
   * Returns the Twitch.Player object.
   * Can be used for more fine-grained control of the player.
   */
  public getPlayer(): TwitchPlayer {
    return this._player;
  }


}
