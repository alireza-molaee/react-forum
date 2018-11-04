import React from 'react';

import en from './locale/en.json';
import fa from './locale/fa.json';

export const langs = {
    fa,
    en
}

export const LangContext = React.createContext(langs.en);