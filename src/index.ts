import { Platform, AppRegistry, DeviceEventEmitter, NativeEventEmitter, NativeModules } from 'react-native'
// @ts-ignore
import * as resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import {
  MetadataOptions,
  PlayerOptions,
  Event,
  Track,
  State,
  TrackMetadataBase,
  NowPlayingMetadata,
  RepeatMode,
} from './interfaces'

// const { MusicPlayerModule: TrackPlayer } = NativeModules

const { TrackPlayerModule: MusicPlayer } = NativeModules

const emitter = Platform.OS !== 'android' ? new NativeEventEmitter(MusicPlayer) : DeviceEventEmitter

// MARK: - Helpers

function resolveImportedPath(path?: number | string) {
  if (!path) return undefined
  return resolveAssetSource(path) || path
}

// MARK: - General API

/** FOR SETUP PLAYER */
async function setupPlayer(options: PlayerOptions = {}): Promise<void> {
  return MusicPlayer.setupPlayer(options || {})
}

async function setupMusicPlayer(options: PlayerOptions = {}): Promise<void> {
  return MusicPlayer.setupPlayer(options || {})
}


function destroy() {
    MusicPlayer.destroy()
  return MusicPlayer.destroy()
}

type ServiceHandler = () => Promise<void>

function registerPlaybackService(factory: () => ServiceHandler) {
  if (Platform.OS === 'android') {
    // Registers the headless task
    AppRegistry.registerHeadlessTask('MusicPlayer',factory)
    // AppRegistry.registerHeadlessTask('TrackPlayer', factory)
  } else {
    // Initializes and runs the service in the next tick
    setImmediate(factory())
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addEventListener(event: Event, listener: (data: any) => void) {
  return emitter.addListener(event, listener)
}

// MARK: - Queue API

async function add(tracks: Track | Track[], insertBeforeIndex?: number): Promise<void> {
  // Clone the array before modifying it
  if (Array.isArray(tracks)) {
    tracks = [...tracks]
  } else {
    tracks = [tracks]
  }

  if (tracks.length < 1) return

  for (let i = 0; i < tracks.length; i++) {
    // Clone the object before modifying it
    tracks[i] = { ...tracks[i] }

    // Resolve the URLs
    tracks[i].url = resolveImportedPath(tracks[i].url)
    tracks[i].artwork = resolveImportedPath(tracks[i].artwork)
  }

  // Note: we must be careful about passing nulls to non nullable parameters on Android.
  return MusicPlayer.add(tracks, insertBeforeIndex === undefined ? -1 : insertBeforeIndex)
}

async function addMusic(tracks: Track | Track[], insertBeforeIndex?: number): Promise<void> {
  // Clone the array before modifying it
  if (Array.isArray(tracks)) {
    tracks = [...tracks]
  } else {
    tracks = [tracks]
  }

  if (tracks.length < 1) return

  for (let i = 0; i < tracks.length; i++) {
    // Clone the object before modifying it
    tracks[i] = { ...tracks[i] }

    // Resolve the URLs
    tracks[i].url = resolveImportedPath(tracks[i].url)
    tracks[i].artwork = resolveImportedPath(tracks[i].artwork)
  }

  // Note: we must be careful about passing nulls to non nullable parameters on Android.
  return MusicPlayer.add(tracks, insertBeforeIndex === undefined ? -1 : insertBeforeIndex)
}


async function remove(tracks: number | number[]): Promise<void> {
  if (!Array.isArray(tracks)) {
    tracks = [tracks]
  }

  return MusicPlayer.remove(tracks)
}


async function removeMusic(tracks: number | number[]): Promise<void> {
  if (!Array.isArray(tracks)) {
    tracks = [tracks]
  }

  return MusicPlayer.removeMusic(tracks)
}


async function removeUpcomingTracks(): Promise<void> {
  return MusicPlayer.removeUpcomingTracks()
}

async function skip(trackIndex: number): Promise<void> {
  return MusicPlayer.skip(trackIndex)
}

async function skipToNext(): Promise<void> {
  return MusicPlayer.skipToNext()
}

async function skipToPrevious(): Promise<void> {
  return MusicPlayer.skipToPrevious()
}

// MARK: - Control Center / Notifications API

async function updateOptions(options: MetadataOptions = {}): Promise<void> {
  options = { ...options }

  // Resolve the asset for each icon
  options.icon = resolveImportedPath(options.icon)
  options.playIcon = resolveImportedPath(options.playIcon)
  options.pauseIcon = resolveImportedPath(options.pauseIcon)
  options.stopIcon = resolveImportedPath(options.stopIcon)
  options.previousIcon = resolveImportedPath(options.previousIcon)
  options.nextIcon = resolveImportedPath(options.nextIcon)
  options.rewindIcon = resolveImportedPath(options.rewindIcon)
  options.forwardIcon = resolveImportedPath(options.forwardIcon)

  return MusicPlayer.updateOptions(options)
}

async function updateOptionsMusic(options: MetadataOptions = {}): Promise<void> {
  options = { ...options }

  // Resolve the asset for each icon
  options.icon = resolveImportedPath(options.icon)
  options.playIcon = resolveImportedPath(options.playIcon)
  options.pauseIcon = resolveImportedPath(options.pauseIcon)
  options.stopIcon = resolveImportedPath(options.stopIcon)
  options.previousIcon = resolveImportedPath(options.previousIcon)
  options.nextIcon = resolveImportedPath(options.nextIcon)
  options.rewindIcon = resolveImportedPath(options.rewindIcon)
  options.forwardIcon = resolveImportedPath(options.forwardIcon)

  return MusicPlayer.updateOptions(options)
}

async function updateMetadataForTrack(trackIndex: number, metadata: TrackMetadataBase): Promise<void> {
  // Clone the object before modifying it
  metadata = Object.assign({}, metadata)

  // Resolve the artwork URL
  metadata.artwork = resolveImportedPath(metadata.artwork)

  return MusicPlayer.updateMetadataForTrack(trackIndex, metadata)
}

function clearNowPlayingMetadata(): Promise<void> {
  return MusicPlayer.clearNowPlayingMetadata()
}
function clearNowPlayingMetadataMusic(): Promise<void> {
  return MusicPlayer.clearNowPlayingMetadata()
}
function updateNowPlayingMetadata(metadata: NowPlayingMetadata): Promise<void> {
  // Clone the object before modifying it
  metadata = Object.assign({}, metadata)

  // Resolve the artwork URL
  metadata.artwork = resolveImportedPath(metadata.artwork)

  return MusicPlayer.updateNowPlayingMetadata(metadata)
}

// MARK: - Player API

async function reset(): Promise<void> {
  return MusicPlayer.reset()
}

async function play(): Promise<void> {
  return MusicPlayer.play()
}

async function playMusic(): Promise<void> {
  return MusicPlayer.play()
}

async function pause(): Promise<void> {
  return MusicPlayer.pause()
}
async function pauseMusic(): Promise<void> {
  return MusicPlayer.pause()
}

async function stop(): Promise<void> {
  return MusicPlayer.stop()
}

async function seekTo(position: number): Promise<void> {
  return MusicPlayer.seekTo(position)
}

async function setVolume(level: number): Promise<void> {
  return MusicPlayer.setVolume(level)
}

async function setRate(rate: number): Promise<void> {
  return MusicPlayer.setRate(rate)
}

async function setRepeatMode(mode: RepeatMode): Promise<RepeatMode> {
  return MusicPlayer.setRepeatMode(mode)
}

// MARK: - Getters

async function getVolume(): Promise<number> {
  return MusicPlayer.getVolume()
}

async function getRate(): Promise<number> {
  return MusicPlayer.getRate()
}

async function getTrack(trackIndex: number): Promise<Track> {
  return MusicPlayer.getTrack(trackIndex)
}

async function getQueue(): Promise<Track[]> {
  return MusicPlayer.getQueue()
}

async function getCurrentTrack(): Promise<number> {
  return MusicPlayer.getCurrentTrack()
}

async function getDuration(): Promise<number> {
  return MusicPlayer.getDuration()
}

async function getBufferedPosition(): Promise<number> {
  return MusicPlayer.getBufferedPosition()
}

async function getPosition(): Promise<number> {
  return MusicPlayer.getPosition()
}

async function getState(): Promise<State> {
  return MusicPlayer.getState()
}

async function getRepeatMode(): Promise<RepeatMode> {
  return MusicPlayer.getRepeatMode()
}

export * from './hooks'
export * from './interfaces'

export default {
  // MARK: - General API
  setupPlayer,
  destroy,
  registerPlaybackService,
  addEventListener,

  // MARK: - Queue API
  add,
  remove,
  removeUpcomingTracks,
  skip,
  skipToNext,
  skipToPrevious,

  // MARK: - Control Center / Notifications API
  updateOptions,
  updateMetadataForTrack,
  clearNowPlayingMetadata,
  updateNowPlayingMetadata,

  // MARK: - Player API
  reset,
  play,
  pause,
  stop,
  seekTo,
  setVolume,
  setRate,
  setRepeatMode,

  // MARK: - Getters
  getVolume,
  getRate,
  getTrack,
  getQueue,
  getCurrentTrack,
  getDuration,
  getBufferedPosition,
  getPosition,
  getState,
  getRepeatMode,
}
