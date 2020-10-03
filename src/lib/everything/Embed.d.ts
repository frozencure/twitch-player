import { Player } from './video/Player';

import { TwitchEmbedOptions } from './TwitchEmbedOptions';

export class Embed {
  constructor(divId: string, options: TwitchEmbedOptions);


  /**
   * Returns the Twitch.Player object.
   * Can be used for more fine-grained control of the player.
   */
  getPlayer(): Player;

  /**
   * Adds an event listener for the given event.
   * @param event The event type to which the listener should react.
   * @param callback The logic that should happen when the listener fires.
   */
  addEventListener(event: string, callback: () => void): void;

}
