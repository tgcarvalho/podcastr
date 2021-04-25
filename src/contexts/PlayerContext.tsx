import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    hasNext: boolean,
    hasPrevious: boolean,
    play: (episode: Episode) => void;
    playNext: () => void;
    playPrevious: () => void;
    playList: (ist: Array<Episode>, index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffe: () => void;
    clearPlayerState: () => void;
}

type PlayerContextProviderProps = {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children } : PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
  
    function play(episode: Episode) {
      setEpisodeList([episode]);
      setcurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Array<Episode>, index: number) {
      setEpisodeList(list);
      setcurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
      setIsLooping(!isLooping);
    } 

    function toggleShuffe() {
      setIsShuffling(!isShuffling);
    }  

    function setPlayingState(state: boolean) {
      setIsPlaying(state);
    }

    function clearPlayerState(){
      setEpisodeList([]);
      setcurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
      if(isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
        setcurrentEpisodeIndex(nextRandomEpisodeIndex);
      } else if(hasNext) {
        setcurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }

    function playPrevious() {
      if(hasPrevious) {
        setcurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
    }
  
    return (
      <PlayerContext.Provider 
        value={{ 
            episodeList, 
            currentEpisodeIndex, 
            isPlaying,
            isLooping,
            isShuffling,
            hasNext,
            hasPrevious, 
            play, 
            playList,
            playNext,
            playPrevious,
            togglePlay, 
            setPlayingState,
            toggleLoop,
            toggleShuffe,
            clearPlayerState
        }}>
        {children}
      </PlayerContext.Provider>
    )
  
}

export const usePlayer = (): PlayerContextData => {
  return useContext(PlayerContext);
}