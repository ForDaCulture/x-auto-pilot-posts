import React, { createContext, useState, useReducer, Dispatch } from 'react';

interface PostState {
  selectedNiche: string;
  scheduledPosts: {
    id: string;
    text: string;
    time: string;
    hasImage: boolean;
  }[];
  generatedContent: {
    originalText: string;
    text: string;
    imageUrl: string | null;
    sentiment: string | null;
  };
  isGenerating: boolean;
}

const initialState: PostState = {
  selectedNiche: 'history',
  scheduledPosts: [],
  generatedContent: { originalText: '', text: '', imageUrl: null, sentiment: null },
  isGenerating: false,
};

type PostAction =
  | { type: 'SET_NICHE'; payload: string }
  | { type: 'SET_CONTENT'; payload: { originalText: string; text: string; imageUrl: string | null; sentiment: string | null } }
  | { type: 'UPDATE_TEXT'; payload: string }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'ADD_SCHEDULED_POST'; payload: { id: string; text: string; time: string; hasImage: boolean } }
  | { type: 'REMOVE_SCHEDULED_POST'; payload: string };

interface SetContentPayload {
  originalText: string;
  text: string;
  imageUrl: string | null;
  sentiment: string | null;
}

const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case 'SET_NICHE':
      return { ...state, selectedNiche: action.payload };
    case 'SET_CONTENT':
      return { ...state, generatedContent: { ...state.generatedContent, ...action.payload } };
    case 'UPDATE_TEXT':
      return { ...state, generatedContent: { ...state.generatedContent, text: action.payload } };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };    
    case 'ADD_SCHEDULED_POST':
      return { ...state, scheduledPosts: [...state.scheduledPosts, action.payload] };
    case 'REMOVE_SCHEDULED_POST':
      return {
        ...state,
        scheduledPosts: state.scheduledPosts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

interface PostContextType {
  state: PostState;
  generatedContent: PostState['generatedContent'];
  dispatch: Dispatch<PostAction>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const PostContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<PostState, PostAction>>(postReducer, initialState);
  const { generatedContent } = state;

    
    return (
      <PostContext.Provider value={{ state, dispatch, scheduledPosts }}>
        {children}
      </PostContext.Provider>
    );
};

export { PostContext, PostContextProvider };